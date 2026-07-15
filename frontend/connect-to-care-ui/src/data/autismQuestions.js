// // const autismQuestions = [
// //   {
// //     id: "eye_contact",
// //     text: "Avoids or struggles to maintain eye contact",
// //     domain: "social",
// //   },
// //   {
// //     id: "name_response",
// //     text: "Does not consistently respond when name is called",
// //     domain: "communication",
// //   },
// //   {
// //     id: "peer_play",
// //     text: "Has difficulty engaging in play with others",
// //     domain: "social",
// //   },
// //   {
// //     id: "gestures",
// //     text: "Rarely uses gestures such as pointing or waving",
// //     domain: "communication",
// //   },
// //   {
// //     id: "repetitive",
// //     text: "Repeats the same actions or behaviors frequently",
// //     domain: "repetitive",
// //   },
// //   {
// //     id: "routine_change",
// //     text: "Becomes distressed by changes in routine",
// //     domain: "sensory",
// //   },
// // ];
// // export default autismQuestions;

// // M-CHAT-R™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
// // For items 2, 5, and 12: "YES" = elevated likelihood (reversed scoring)
// // For all other items:    "NO"  = elevated likelihood

// // M-CHAT-R™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
// // Scoring: items 2, 5, 12 → YES = elevated; all others → NO = elevated
// // 0–2  = Low likelihood
// // 3–7  = Moderate likelihood (follow-up recommended)
// // 8–20 = High likelihood (refer directly)
// //
// // Domain groupings (Social / Communication / Sensory / Motor):
// //   Social        → 8, 11, 14, 17, 19
// //   Communication → 1, 6, 7, 9, 10, 15, 16, 18
// //   Sensory       → 2, 5, 12
// //   Motor         → 3, 4, 13, 20

// const autismQuestions = [
//   {
//     id: "mchat_1",
//     num: 1,
//     domain: "communication",
//     text: "If you point at something across the room, does your child look at it?",
//     example:
//       "For example, if you point at a toy or an animal, does your child look at the toy or animal?",
//     reversed: false,
//   },
//   {
//     id: "mchat_2",
//     num: 2,
//     domain: "sensory",
//     text: "Have you ever wondered if your child might be deaf?",
//     example: "",
//     reversed: true,
//   },
//   {
//     id: "mchat_3",
//     num: 3,
//     domain: "motor",
//     text: "Does your child play pretend or make-believe?",
//     example:
//       "For example, pretend to drink from an empty cup, pretend to talk on a phone, or pretend to feed a doll or stuffed animal?",
//     reversed: false,
//   },
//   {
//     id: "mchat_4",
//     num: 4,
//     domain: "motor",
//     text: "Does your child like climbing on things?",
//     example: "For example, furniture, playground equipment, or stairs?",
//     reversed: false,
//   },
//   {
//     id: "mchat_5",
//     num: 5,
//     domain: "sensory",
//     text: "Does your child make unusual finger movements near his or her eyes?",
//     example:
//       "For example, does your child wiggle his or her fingers close to his or her eyes?",
//     reversed: true,
//   },
//   {
//     id: "mchat_6",
//     num: 6,
//     domain: "communication",
//     text: "Does your child point with one finger to ask for something or to get help?",
//     example: "For example, pointing to a snack or toy that is out of reach?",
//     reversed: false,
//   },
//   {
//     id: "mchat_7",
//     num: 7,
//     domain: "communication",
//     text: "Does your child point with one finger to show you something interesting?",
//     example:
//       "For example, pointing to an airplane in the sky or a big truck in the road?",
//     reversed: false,
//   },
//   {
//     id: "mchat_8",
//     num: 8,
//     domain: "social",
//     text: "Is your child interested in other children?",
//     example:
//       "For example, does your child watch other children, smile at them, or go to them?",
//     reversed: false,
//   },
//   {
//     id: "mchat_9",
//     num: 9,
//     domain: "communication",
//     text: "Does your child show you things by bringing them to you or holding them up for you to see — not to get help, but just to share?",
//     example:
//       "For example, showing you a flower, a stuffed animal, or a toy truck?",
//     reversed: false,
//   },
//   {
//     id: "mchat_10",
//     num: 10,
//     domain: "communication",
//     text: "Does your child respond when you call his or her name?",
//     example:
//       "For example, does he or she look up, talk or babble, or stop what he or she is doing when you call his or her name?",
//     reversed: false,
//   },
//   {
//     id: "mchat_11",
//     num: 11,
//     domain: "social",
//     text: "When you smile at your child, does he or she smile back at you?",
//     example: "",
//     reversed: false,
//   },
//   {
//     id: "mchat_12",
//     num: 12,
//     domain: "sensory",
//     text: "Does your child get upset by everyday noises?",
//     example:
//       "For example, does your child scream or cry to noise such as a vacuum cleaner or loud music?",
//     reversed: true,
//   },
//   {
//     id: "mchat_13",
//     num: 13,
//     domain: "motor",
//     text: "Does your child walk?",
//     example: "",
//     reversed: false,
//   },
//   {
//     id: "mchat_14",
//     num: 14,
//     domain: "social",
//     text: "Does your child look you in the eye when you are talking to him or her, playing with him or her, or dressing him or her?",
//     example: "",
//     reversed: false,
//   },
//   {
//     id: "mchat_15",
//     num: 15,
//     domain: "communication",
//     text: "Does your child try to copy what you do?",
//     example:
//       "For example, wave bye-bye, clap, or make a funny noise when you do?",
//     reversed: false,
//   },
//   {
//     id: "mchat_16",
//     num: 16,
//     domain: "communication",
//     text: "If you turn your head to look at something, does your child look around to see what you are looking at?",
//     example: "",
//     reversed: false,
//   },
//   {
//     id: "mchat_17",
//     num: 17,
//     domain: "social",
//     text: "Does your child try to get you to watch him or her?",
//     example:
//       "For example, does your child look at you for praise, or say 'look' or 'watch me'?",
//     reversed: false,
//   },
//   {
//     id: "mchat_18",
//     num: 18,
//     domain: "communication",
//     text: "Does your child understand when you tell him or her to do something?",
//     example:
//       "For example, if you don't point, can your child understand 'put the book on the chair' or 'bring me the blanket'?",
//     reversed: false,
//   },
//   {
//     id: "mchat_19",
//     num: 19,
//     domain: "social",
//     text: "If something new happens, does your child look at your face to see how you feel about it?",
//     example:
//       "For example, if he or she hears a strange or funny noise, or sees a new toy, will he or she look at your face?",
//     reversed: false,
//   },
//   {
//     id: "mchat_20",
//     num: 20,
//     domain: "motor",
//     text: "Does your child like movement activities?",
//     example: "For example, being swung or bounced on your knee?",
//     reversed: false,
//   },
// ];

// export default autismQuestions;




const autismQuestions = [
  {
    id: "mchat_1",
    num: 1,
    domain: "communication",

    text: {
      en: "If you point at something across the room, does your child look at it?",
      ur: "اگر آپ کمرے کے دوسری طرف کسی چیز کی طرف اشارہ کریں تو کیا آپ کا بچہ اس طرف دیکھتا ہے؟",
    },

    example: {
      en: "For example, if you point at a toy or an animal, does your child look at the toy or animal?",
      ur: "مثال کے طور پر، اگر آپ کسی کھلونے یا جانور کی طرف اشارہ کریں تو کیا آپ کا بچہ اس کھلونے یا جانور کو دیکھتا ہے؟",
    },

    reversed: false,
  },

  {
    id: "mchat_2",
    num: 2,
    domain: "sensory",

    text: {
      en: "Have you ever wondered if your child might be deaf?",
      ur: "کیا آپ نے کبھی سوچا ہے کہ شاید آپ کا بچہ بہرا ہو سکتا ہے؟",
    },

    example: {
      en: "",
      ur: "",
    },

    reversed: true,
  },

  {
    id: "mchat_3",
    num: 3,
    domain: "motor",

    text: {
      en: "Does your child play pretend or make-believe?",
      ur: "کیا آپ کا بچہ فرضی یا خیالی کھیل کھیلتا ہے؟",
    },

    example: {
      en: "For example, pretend to drink from an empty cup, pretend to talk on a phone, or pretend to feed a doll or stuffed animal?",
      ur: "مثال کے طور پر، خالی کپ سے پینے کا ڈرامہ کرنا، فون پر بات کرنے کا ڈرامہ کرنا، یا گڑیا یا کھلونا جانور کو کھانا کھلانے کا ڈرامہ کرنا۔",
    },

    reversed: false,
  },
  {
  id: "mchat_4",
  num: 4,
  domain: "motor",

  text: {
    en: "Does your child like climbing on things?",
    ur: "کیا آپ کے بچے کو چیزوں پر چڑھنا پسند ہے؟",
  },

  example: {
    en: "For example, furniture, playground equipment, or stairs?",
    ur: "مثال کے طور پر، فرنیچر، کھیل کے میدان کا سامان، یا سیڑھیاں؟",
  },

  reversed: false,
},
{
  id: "mchat_5",
  num: 5,
  domain: "sensory",

  text: {
    en: "Does your child make unusual finger movements near his or her eyes?",
    ur: "کیا آپ کا بچہ اپنی آنکھوں کے قریب انگلیوں کو غیر معمولی انداز میں حرکت دیتا ہے؟",
  },

  example: {
    en: "For example, does your child wiggle his or her fingers close to his or her eyes?",
    ur: "مثال کے طور پر، کیا آپ کا بچہ اپنی آنکھوں کے قریب انگلیاں ہلاتا ہے؟",
  },

  reversed: true,
},
{
  id: "mchat_6",
  num: 6,
  domain: "communication",

  text: {
    en: "Does your child point with one finger to ask for something or to get help?",
    ur: "کیا آپ کا بچہ کسی چیز کی درخواست کرنے یا مدد حاصل کرنے کے لیے ایک انگلی سے اشارہ کرتا ہے؟",
  },

  example: {
    en: "For example, pointing to a snack or toy that is out of reach?",
    ur: "مثال کے طور پر، دور رکھی ہوئی چیز، جیسے کھلونا یا کھانے کی چیز، کی طرف اشارہ کرنا؟",
  },

  reversed: false,
},
{
  id: "mchat_7",
  num: 7,
  domain: "communication",

  text: {
    en: "Does your child point with one finger to show you something interesting?",
    ur: "کیا آپ کا بچہ آپ کو کوئی دلچسپ چیز دکھانے کے لیے ایک انگلی سے اشارہ کرتا ہے؟",
  },

  example: {
    en: "For example, pointing to an airplane in the sky or a big truck in the road?",
    ur: "مثال کے طور پر، آسمان میں ہوائی جہاز یا سڑک پر بڑے ٹرک کی طرف اشارہ کرنا؟",
  },

  reversed: false,
},
{
  id: "mchat_8",
  num: 8,
  domain: "social",

  text: {
    en: "Is your child interested in other children?",
    ur: "کیا آپ کا بچہ دوسرے بچوں میں دلچسپی لیتا ہے؟",
  },

  example: {
    en: "For example, does your child watch other children, smile at them, or go to them?",
    ur: "مثال کے طور پر، کیا آپ کا بچہ دوسرے بچوں کو دیکھتا ہے، ان کی طرف مسکراتا ہے، یا ان کے پاس جاتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_9",
  num: 9,
  domain: "communication",

  text: {
    en: "Does your child show you things by bringing them to you or holding them up for you to see — not to get help, but just to share?",
    ur: "کیا آپ کا بچہ چیزیں آپ کے پاس لا کر یا آپ کو دکھا کر صرف آپ کے ساتھ خوشی بانٹنے کی کوشش کرتا ہے، نہ کہ مدد لینے کے لیے؟",
  },

  example: {
    en: "For example, showing you a flower, a stuffed animal, or a toy truck?",
    ur: "مثال کے طور پر، آپ کو پھول، کھلونا جانور، یا کھلونا ٹرک دکھانا؟",
  },

  reversed: false,
},
{
  id: "mchat_10",
  num: 10,
  domain: "communication",

  text: {
    en: "Does your child respond when you call his or her name?",
    ur: "کیا آپ کا بچہ اپنا نام پکارنے پر جواب دیتا ہے؟",
  },

  example: {
    en: "For example, does he or she look up, talk or babble, or stop what he or she is doing when you call his or her name?",
    ur: "مثال کے طور پر، کیا نام پکارنے پر وہ آپ کی طرف دیکھتا ہے، آواز نکالتا ہے یا اپنی موجودہ سرگرمی روک دیتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_11",
  num: 11,
  domain: "social",

  text: {
    en: "When you smile at your child, does he or she smile back at you?",
    ur: "جب آپ اپنے بچے کی طرف مسکراتے ہیں تو کیا وہ بھی آپ کو دیکھ کر مسکراتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },

  reversed: false,
},
{
  id: "mchat_12",
  num: 12,
  domain: "sensory",

  text: {
    en: "Does your child get upset by everyday noises?",
    ur: "کیا آپ کا بچہ روزمرہ کی آوازوں سے پریشان یا بے چین ہو جاتا ہے؟",
  },

  example: {
    en: "For example, does your child scream or cry to noise such as a vacuum cleaner or loud music?",
    ur: "مثال کے طور پر، کیا ویکیوم کلینر یا اونچی آواز میں موسیقی سن کر آپ کا بچہ چیختا یا روتا ہے؟",
  },

  reversed: true,
},
{
  id: "mchat_13",
  num: 13,
  domain: "motor",

  text: {
    en: "Does your child walk?",
    ur: "کیا آپ کا بچہ چلتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },

  reversed: false,
},
{
  id: "mchat_14",
  num: 14,
  domain: "social",

  text: {
    en: "Does your child look you in the eye when you are talking to him or her, playing with him or her, or dressing him or her?",
    ur: "جب آپ اپنے بچے سے بات کرتے ہیں، اس کے ساتھ کھیلتے ہیں یا اسے کپڑے پہناتے ہیں، تو کیا وہ آپ کی آنکھوں میں دیکھتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },

  reversed: false,
},
{
  id: "mchat_15",
  num: 15,
  domain: "communication",

  text: {
    en: "Does your child try to copy what you do?",
    ur: "کیا آپ کا بچہ آپ کے کاموں کی نقل کرنے کی کوشش کرتا ہے؟",
  },

  example: {
    en: "For example, wave bye-bye, clap, or make a funny noise when you do?",
    ur: "مثال کے طور پر، کیا آپ کے الوداع کہنے پر ہاتھ ہلاتا ہے، تالیاں بجاتا ہے یا آپ کی طرح کوئی دلچسپ آواز نکالتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_16",
  num: 16,
  domain: "communication",

  text: {
    en: "If you turn your head to look at something, does your child look around to see what you are looking at?",
    ur: "اگر آپ کسی چیز کو دیکھنے کے لیے اپنا سر موڑیں، تو کیا آپ کا بچہ بھی یہ دیکھنے کی کوشش کرتا ہے کہ آپ کس چیز کو دیکھ رہے ہیں؟",
  },

  example: {
    en: "",
    ur: "",
  },

  reversed: false,
},
{
  id: "mchat_17",
  num: 17,
  domain: "social",

  text: {
    en: "Does your child try to get you to watch him or her?",
    ur: "کیا آپ کا بچہ آپ کی توجہ حاصل کرنے یا آپ کو اپنی طرف دیکھنے کی کوشش کرتا ہے؟",
  },

  example: {
    en: "For example, does your child look at you for praise, or say 'look' or 'watch me'?",
    ur: "مثال کے طور پر، کیا آپ کا بچہ تعریف کی امید میں آپ کی طرف دیکھتا ہے یا 'دیکھیں' یا 'مجھے دیکھیں' کہتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_18",
  num: 18,
  domain: "communication",

  text: {
    en: "Does your child understand when you tell him or her to do something?",
    ur: "کیا آپ کا بچہ آپ کی بات سمجھتا ہے جب آپ اسے کوئی کام کرنے کے لیے کہتے ہیں؟",
  },

  example: {
    en: "For example, if you don't point, can your child understand 'put the book on the chair' or 'bring me the blanket'?",
    ur: "مثال کے طور پر، اگر آپ اشارہ نہ کریں تو کیا آپ کا بچہ 'کتاب کرسی پر رکھ دو' یا 'میرے لیے کمبل لے آؤ' جیسی ہدایات سمجھ لیتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_19",
  num: 19,
  domain: "social",

  text: {
    en: "If something new happens, does your child look at your face to see how you feel about it?",
    ur: "اگر کوئی نئی چیز یا واقعہ پیش آئے، تو کیا آپ کا بچہ آپ کے چہرے کی طرف دیکھتا ہے تاکہ یہ سمجھے کہ آپ اس کے بارے میں کیا محسوس کرتے ہیں؟",
  },

  example: {
    en: "For example, if he or she hears a strange or funny noise, or sees a new toy, will he or she look at your face?",
    ur: "مثال کے طور پر، اگر وہ کوئی عجیب آواز سنے یا نیا کھلونا دیکھے، تو کیا وہ آپ کے چہرے کی طرف دیکھتا ہے؟",
  },

  reversed: false,
},
{
  id: "mchat_20",
  num: 20,
  domain: "motor",

  text: {
    en: "Does your child like movement activities?",
    ur: "کیا آپ کے بچے کو حرکت والی سرگرمیاں پسند ہیں؟",
  },

  example: {
    en: "For example, being swung or bounced on your knee?",
    ur: "مثال کے طور پر، جھولا جھولنا یا گھٹنے پر اچھالا جانا؟",
  },

  reversed: false,
},
];

export default autismQuestions;