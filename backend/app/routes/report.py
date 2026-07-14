import io
import os
import stripe
from datetime import datetime
from bson import ObjectId
from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT

from app.database import assessment_collection

router = APIRouter()

# ── Colours ───────────────────────────────────────────────────────────────────
EMERALD   = colors.HexColor("#059669")
EMERALD_D = colors.HexColor("#0e7e5e")
EMERALD_L = colors.HexColor("#ecfdf5")
AMBER     = colors.HexColor("#374151")
AMBER_L   = colors.HexColor("#fffbeb")
ROSE      = colors.HexColor("#e11d48")
ROSE_L    = colors.HexColor("#fff1f2")
GRAY_900  = colors.HexColor("#111827")
GRAY_700  = colors.HexColor("#374151")
GRAY_500  = colors.HexColor("#6b7280")
GRAY_300  = colors.HexColor("#d1d5db")
GRAY_100  = colors.HexColor("#f3f4f6")
WHITE     = colors.white

# ── Maps & Utilities ──────────────────────────────────────────────────────────
ADHD_LABELS = {
    0: "Rarely or Never", 1: "Sometimes", 2: "Often", 3: "Very Often",
    "0": "Rarely or Never", "1": "Sometimes", "2": "Often", "3": "Very Often"
}

AUTISM_LABELS = {
    "yes": "Yes", "no": "No", True: "Yes", False: "No"
}

def humanise_answer(answer, assessment_type: str) -> str:
    if assessment_type == "adhd":
        return ADHD_LABELS.get(answer, str(answer))
    return AUTISM_LABELS.get(answer, str(answer))

def risk_palette(risk: str):
    if risk == "High":
        return ROSE, ROSE_L
    if risk == "Moderate":
        return AMBER, AMBER_L
    return EMERALD, EMERALD_L

def bar_color(value: int) -> colors.Color:
    if value >= 70: return ROSE
    if value >= 40: return AMBER
    return EMERALD

def type_label(t: str) -> str:
    return {
        "autism":          "M-CHAT-R™ — Autism Screening",
        "adhd":            "ADHD Rating Scale IV — Preschool",
        "autism-followup": "M-CHAT-R/F™ — Follow-Up Interview",
    }.get(t, str(t).upper())

# ── Dynamic Layout Templates ──────────────────────────────────────────────────
def section_header(text: str, usable_w: float) -> Table:
    style = ParagraphStyle(
        name="SectionHeaderStyle", fontSize=10, textColor=WHITE,
        fontName="Helvetica-Bold", leading=14,
    )
    t = Table([[Paragraph(text, style)]], colWidths=[usable_w])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), GRAY_700),
        ("LEFTPADDING",   (0, 0), (-1, -1), 10),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 10),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t

def domain_row(domain: str, value: int, usable_w: float) -> Table:
    bc      = bar_color(value)
    bar_w   = usable_w - (52 * mm) - (14 * mm)
    filled  = max(2, int(bar_w * value / 100))
    empty   = max(0, int(bar_w) - filled)

    bar = Table(
        [[Paragraph("", ParagraphStyle("b_f")), Paragraph("", ParagraphStyle("b_e"))]],
        colWidths=[filled, empty], rowHeights=[7],
    )
    bar.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (0, 0), bc),
        ("BACKGROUND",    (1, 0), (1, 0), GRAY_100),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    label_s = ParagraphStyle("DomainLabelStyle", fontSize=9, textColor=GRAY_700, leading=13)
    pct_s   = ParagraphStyle("DomainPctStyle", fontSize=9, textColor=bc, fontName="Helvetica-Bold", leading=13, alignment=TA_RIGHT)

    row = Table(
        [[Paragraph(domain.capitalize(), label_s), bar, Paragraph(f"{value}%", pct_s)]],
        colWidths=[52 * mm, bar_w, 14 * mm], rowHeights=[18],
    )
    row.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 2),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return row

# ── Styles Factory ────────────────────────────────────────────────────────────
def build_styles(accent):
    return {
        "sWhiteTitle": ParagraphStyle("sWhiteTitle", fontSize=20, textColor=WHITE, fontName="Helvetica-Bold", leading=26, alignment=TA_CENTER),
        "sWhiteSub": ParagraphStyle("sWhiteSub", fontSize=9, textColor=colors.HexColor("#a7f3d0"), leading=13, alignment=TA_CENTER),
        "sLabel": ParagraphStyle("sLabel", fontSize=8, textColor=GRAY_500, leading=11, fontName="Helvetica-Bold", spaceAfter=1),
        "sValue": ParagraphStyle("sValue", fontSize=11, textColor=GRAY_900, leading=15, fontName="Helvetica-Bold"),
        "sScoreNum": ParagraphStyle("sScoreNum", fontSize=30, textColor=GRAY_900, leading=36, fontName="Helvetica-Bold"),
        "sRiskBadge": ParagraphStyle("sRiskBadge", fontSize=13, textColor=accent, leading=18, fontName="Helvetica-Bold"),
        "sRiskDesc": ParagraphStyle("sRiskDesc", fontSize=8, textColor=GRAY_500, leading=12),
        "sBody": ParagraphStyle("sBody", fontSize=9, textColor=GRAY_700, leading=14),
        "sIdx": ParagraphStyle("sIdx", fontSize=9, textColor=GRAY_500, fontName="Helvetica-Bold", leading=14, alignment=TA_CENTER),
        "sQText": ParagraphStyle("sQText", fontSize=9, textColor=GRAY_900, leading=14, fontName="Helvetica-Bold"),
        "sAnsLabel": ParagraphStyle("sAnsLabel", fontSize=8, textColor=GRAY_500, leading=11, fontName="Helvetica-Bold"),
        "sAnsValue": ParagraphStyle("sAnsValue", fontSize=9, textColor=accent, leading=13, fontName="Helvetica-Bold"),
        "sDisclaimer": ParagraphStyle("sDisclaimer", fontSize=7.5, textColor=GRAY_500, leading=11, alignment=TA_CENTER, fontName="Helvetica-Oblique"),
        "sNoData": ParagraphStyle("sNoData", fontSize=9, textColor=GRAY_500, leading=14, fontName="Helvetica-Oblique")
    }

# ── Route ─────────────────────────────────────────────────────────────────────
from pydantic import BaseModel

class CheckoutSessionRequest(BaseModel):
    assessment_id: str

@router.post("/create-checkout-session")
def create_checkout_session(req: CheckoutSessionRequest):
    if not ObjectId.is_valid(req.assessment_id):
        raise HTTPException(status_code=400, detail="Invalid assessment ID")
        
    assessment = assessment_collection.find_one({"_id": ObjectId(req.assessment_id)})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
        
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": "ConnectToCare Clinical Report",
                            "description": f"Official screening assessment report for {assessment.get('type', 'screening').capitalize()}"
                        },
                        "unit_amount": 500, # $5.00 USD
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            metadata={
                "assessment_id": req.assessment_id
            },
            success_url=f"http://localhost:3000/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"http://localhost:3000/result/{req.assessment_id}",
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/reports/download/{session_id}")
async def generate_report(session_id: str):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid Stripe Session: {str(e)}")
        
    if session.payment_status != "paid":
        raise HTTPException(status_code=402, detail="Payment required to download this report.")
        
    assessment_id = getattr(session.metadata, "assessment_id", None)
    if not assessment_id or not ObjectId.is_valid(assessment_id):
        raise HTTPException(status_code=400, detail="No valid assessment linked to this payment session.")

    assessment = assessment_collection.find_one({"_id": ObjectId(assessment_id)})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    risk = assessment.get("result", "Low")
    a_type = assessment.get("type", "autism")
    accent, accent_l = risk_palette(risk)
    
    PAGE_W, _ = A4
    MARGIN = 18 * mm
    usable_w = PAGE_W - (2 * MARGIN)
    styles = build_styles(accent)

    # Clean date formatting handling safely
    raw_date = assessment.get("date")
    date_str = str(raw_date)[:10] if raw_date else datetime.utcnow().strftime('%Y-%m-%d')

    elements = []

    # ── Cover banner ──────────────────────────────────────────────────────────
    banner = Table(
        [[Paragraph("Connect to Care", styles["sWhiteTitle"])],
         [Paragraph("Screening Assessment Report", styles["sWhiteSub"])]],
        colWidths=[usable_w],
    )
    banner.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), EMERALD_D),
        ("LEFTPADDING",   (0, 0), (-1, -1), 20),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 20),
        ("TOPPADDING",    (0, 0), (0, 0),   20),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 20),
        ("TOPPADDING",    (0, 1), (-1, -1), 2),
    ]))
    elements.append(banner)
    elements.append(Spacer(1, 7 * mm))

    # ── Assessment info row ───────────────────────────────────────────────────
    info_data = [
        [Paragraph("ASSESSMENT TYPE", styles["sLabel"]), Paragraph("DATE", styles["sLabel"])],
        [Paragraph(type_label(a_type), styles["sValue"]), Paragraph(date_str, styles["sValue"])],
    ]
    info_table = Table(info_data, colWidths=[usable_w * 0.6, usable_w * 0.4])
    info_table.setStyle(TableStyle([
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("ALIGN",         (1, 0), (1, -1),  "RIGHT"),
    ]))
    elements.append(info_table)
    elements.append(HRFlowable(width=usable_w, color=GRAY_300, thickness=0.5, spaceBefore=5, spaceAfter=6 * mm))

    # ── Score + risk summary card ─────────────────────────────────────────────
    risk_desc = {
        "High":     "Several indicators suggest professional evaluation is needed.",
        "Moderate": "Some patterns warrant closer observation or follow-up.",
        "Low":      "Fewer indicators of concern. Continue routine monitoring.",
    }.get(risk, "")

    score_subtable = Table([
        [Paragraph("OVERALL SCORE", styles["sLabel"])],
        [Paragraph(str(assessment.get("score", 0)), styles["sScoreNum"])]
    ], colWidths=[usable_w * 0.28])
    score_subtable.setStyle(TableStyle([("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0)]))

    desc_subtable = Table([
        [Paragraph("RESULT", styles["sLabel"])],
        [Paragraph(f"{risk} Likelihood", styles["sRiskBadge"])],
        [Paragraph(risk_desc, styles["sRiskDesc"])]
    ], colWidths=[usable_w * 0.65])
    desc_subtable.setStyle(TableStyle([("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0)]))

    summary = Table([[score_subtable, desc_subtable]], colWidths=[usable_w * 0.32, usable_w * 0.68])
    summary.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), accent_l),
        ("LEFTPADDING",   (0, 0), (-1, -1), 14),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 14),
        ("TOPPADDING",    (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LINEBEFORE",    (1, 0), (1, -1),  1, accent),
    ]))
    elements.append(summary)
    elements.append(Spacer(1, 8 * mm))

    # ── Domain breakdown ───────────────────────────────────────────────────────
    domain_scores = assessment.get("details", {}).get("domainPercentages", {})
    if domain_scores:
        elements.append(section_header("Domain Breakdown", usable_w))
        elements.append(Spacer(1, 4 * mm))
        for domain, value in domain_scores.items():
            elements.append(domain_row(domain, int(value), usable_w))
        elements.append(PageBreak())

    # ── Critical Behavioral Indicators (ML Sorted) ────────────────────────────
    sorted_failed = assessment.get("details", {}).get("sortedFailedQuestions", [])
    if sorted_failed:
        elements.append(section_header("Critical Behavioral Indicators (ML Severity Sorted)", usable_w))
        elements.append(Spacer(1, 4 * mm))
        
        s_crit_idx = ParagraphStyle("sCritIdx", fontSize=9, textColor=GRAY_500, fontName="Helvetica-Bold", leading=14, alignment=TA_CENTER)
        s_crit_text = ParagraphStyle("sCritText", fontSize=9, textColor=GRAY_900, leading=14, fontName="Helvetica-Bold")
        s_crit_domain = ParagraphStyle("sCritDomain", fontSize=8, textColor=GRAY_500, leading=11, fontName="Helvetica")
        s_crit_weight_label = ParagraphStyle("sCritWLabel", fontSize=8, textColor=GRAY_500, leading=11, fontName="Helvetica-Bold")
        s_crit_weight_val_critical = ParagraphStyle("sCritWValCrit", fontSize=9, textColor=colors.HexColor("#b45309"), leading=13, fontName="Helvetica-Bold")
        s_crit_weight_val_normal = ParagraphStyle("sCritWValNorm", fontSize=9, textColor=GRAY_700, leading=13, fontName="Helvetica-Bold")
        
        for index, item in enumerate(sorted_failed, start=1):
            q_num = item.get("num")
            q_text = item.get("question", "")
            q_domain = item.get("domain", "").capitalize()
            q_weight = item.get("weight", 0.02)
            
            is_critical = q_weight >= 0.1
            row_bg = colors.HexColor("#fffbeb") if is_critical else colors.HexColor("#fafafa")
            val_style = s_crit_weight_val_critical if is_critical else s_crit_weight_val_normal
            
            q_table = Table(
                [[
                    Paragraph(f"{q_num}", s_crit_idx),
                    Table([
                        [Paragraph(q_text, s_crit_text)],
                        [Paragraph(f"Domain: {q_domain}", s_crit_domain)]
                    ], colWidths=[usable_w - 10 * mm - (usable_w * 0.28) - 12]),
                    Table([
                        [Paragraph("SEVERITY WEIGHT", s_crit_weight_label)],
                        [Paragraph(f"{q_weight}", val_style)]
                    ], colWidths=[usable_w * 0.28])
                ]],
                colWidths=[10 * mm, usable_w - 10 * mm - (usable_w * 0.28), usable_w * 0.28]
            )
            q_table.setStyle(TableStyle([
                ("BACKGROUND",    (0, 0), (-1, -1), row_bg),
                ("VALIGN",        (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING",   (0, 0), (-1, -1), 6),
                ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
                ("TOPPADDING",    (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW",     (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
            ]))
            elements.append(q_table)
            elements.append(Spacer(1, 2 * mm))
            
        elements.append(Spacer(1, 6 * mm))
        elements.append(PageBreak())

    # ── Questions & responses ─────────────────────────────────────────────────
    elements.append(section_header("Questions & Responses", usable_w))
    elements.append(Spacer(1, 4 * mm))

    answered = assessment.get("answeredQuestions", [])
    if answered:
        for index, item in enumerate(answered, start=1):
            human_answer = humanise_answer(item.get("answer"), a_type)
            row_bg = GRAY_100 if index % 2 == 0 else WHITE

            # Flat structured 3-column table approach avoids performance bottlenecks of nested frames
            q_table = Table(
                [[
                    Paragraph(f"{index}", styles["sIdx"]),
                    Paragraph(item.get("question", ""), styles["sQText"]),
                    Table([
                        [Paragraph("RESPONSE", styles["sAnsLabel"])],
                        [Paragraph(human_answer, styles["sAnsValue"])]
                    ], colWidths=[usable_w * 0.28])
                ]],
                colWidths=[10 * mm, usable_w - 10 * mm - (usable_w * 0.28), usable_w * 0.28]
            )
            q_table.setStyle(TableStyle([
                ("BACKGROUND",    (0, 0), (-1, -1), row_bg),
                ("VALIGN",        (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING",   (0, 0), (-1, -1), 6),
                ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
                ("TOPPADDING",    (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW",     (0, 0), (-1, -1), 0.5, GRAY_300),
            ]))
            elements.append(q_table)
    else:
        elements.append(Paragraph("No individual question responses recorded.", styles["sNoData"]))

    elements.append(Spacer(1, 4 * mm))

    # ── Recommendations ────────────────────────────────────────────────────────
    elements.append(section_header("Recommendations", usable_w))
    elements.append(Spacer(1, 4 * mm))

    recommendation = {
        "High": "Professional evaluation is strongly recommended. Consider consulting a developmental specialist.",
        "Moderate": "Further screening and observation may be beneficial.",
    }.get(risk, "Continue routine developmental monitoring.")

    rec = Table([[Paragraph(recommendation, styles["sBody"])]], colWidths=[usable_w])
    rec.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), accent_l),
        ("LEFTPADDING",   (0, 0), (-1, -1), 14),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 14),
        ("TOPPADDING",    (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LINEBEFORE",    (0, 0), (0, -1),  3, accent),
    ]))
    elements.append(rec)
    elements.append(Spacer(1, 8 * mm))

    # ── Footer ────────────────────────────────────────────────────────────────
    elements.append(HRFlowable(
        width=usable_w, color=GRAY_300, thickness=0.5,
        spaceBefore=2, spaceAfter=4 * mm,
    ))
    if a_type in ("autism", "autism-followup"):
        copyright_prefix = "M-CHAT-R™ © 2009 Robins, Fein &amp; Barton &nbsp;|&nbsp; "
    else:
        copyright_prefix = "ADHD Rating Scale IV adapted from McGoey et al. (2007) &nbsp;|&nbsp; "
 
    elements.append(Paragraph(
        copyright_prefix +
        "This report is a screening summary only and does not constitute a medical diagnosis. "
        "Always consult a qualified healthcare professional for clinical evaluation.",
        styles["sDisclaimer"]
    ))


    # Build the document in memory
    pdf_buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        pdf_buffer, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
    )
    doc.build(elements)
    pdf_buffer.seek(0)

    filename = f"report_{assessment_id}.pdf"
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )