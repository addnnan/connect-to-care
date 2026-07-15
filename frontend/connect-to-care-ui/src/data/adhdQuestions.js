// ADHD Rating Scale IV — Preschool Version
// Adapted from DuPaul et al. / McGoey et al. (2007)
// Scale: 0 = Rarely/Never · 1 = Sometimes · 2 = Often · 3 = Very Often
//
// Odd items  (1,3,5,7,9,11,13,15,17)  → domain: "inattention"
// Even items (2,4,6,8,10,12,14,16,18) → domain: "hyperactivity"
//
// Parent 93rd percentile cutoffs (averaged across sexes):
//   Inattention:            ≥ 13
//   Hyperactivity/Impuls.:  ≥ 15.5 (use 16)
//   Total score:            ≥ 28

// const adhdQuestions = [
//   {
//     id: "adhd_1",
//     num: 1,
//     domain: "inattention",
//     text: "Fails to give close attention to details",
//     example: "e.g. rushes through activities, makes careless mistakes",
//   },
//   {
//     id: "adhd_2",
//     num: 2,
//     domain: "hyperactivity",
//     text: "Fidgets with hands or feet or squirms in seat",
//     example: "e.g. taps hands or feet",
//   },
//   {
//     id: "adhd_3",
//     num: 3,
//     domain: "inattention",
//     text: "Has difficulty sustaining attention in tasks or play activities",
//     example: "",
//   },
//   {
//     id: "adhd_4",
//     num: 4,
//     domain: "hyperactivity",
//     text: "Leaves seat in situations in which remaining seated is expected",
//     example: "e.g. classroom, during meals",
//   },
//   {
//     id: "adhd_5",
//     num: 5,
//     domain: "inattention",
//     text: "Does not seem to listen when spoken to directly",
//     example: "e.g. tunes you out",
//   },
//   {
//     id: "adhd_6",
//     num: 6,
//     domain: "hyperactivity",
//     text: "Runs about or climbs excessively in situations in which it is inappropriate",
//     example: "",
//   },
//   {
//     id: "adhd_7",
//     num: 7,
//     domain: "inattention",
//     text: "Does not follow through on instructions or fails to finish tasks",
//     example: "e.g. 'go upstairs, get your shoes and socks'; has difficulty with transitions",
//   },
//   {
//     id: "adhd_8",
//     num: 8,
//     domain: "hyperactivity",
//     text: "Has difficulty playing quietly",
//     example: "e.g. alone or in groups",
//   },
//   {
//     id: "adhd_9",
//     num: 9,
//     domain: "inattention",
//     text: "Has difficulty organizing tasks and activities",
//     example: "e.g. choosing an activity, getting materials, doing steps in order",
//   },
//   {
//     id: "adhd_10",
//     num: 10,
//     domain: "hyperactivity",
//     text: "Is 'on the go' or acts as if 'driven by a motor'",
//     example: "",
//   },
//   {
//     id: "adhd_11",
//     num: 11,
//     domain: "inattention",
//     text: "Avoids tasks that require sustained mental effort",
//     example: "e.g. puzzles, learning ABCs, writing name",
//   },
//   {
//     id: "adhd_12",
//     num: 12,
//     domain: "hyperactivity",
//     text: "Talks excessively",
//     example: "",
//   },
//   {
//     id: "adhd_13",
//     num: 13,
//     domain: "inattention",
//     text: "Loses things necessary for tasks or activities",
//     example: "e.g. mittens, shoes, backpack",
//   },
//   {
//     id: "adhd_14",
//     num: 14,
//     domain: "hyperactivity",
//     text: "Blurts out answers before questions have been completed",
//     example: "",
//   },
//   {
//     id: "adhd_15",
//     num: 15,
//     domain: "inattention",
//     text: "Is easily distracted",
//     example: "",
//   },
//   {
//     id: "adhd_16",
//     num: 16,
//     domain: "hyperactivity",
//     text: "Has difficulty awaiting turn",
//     example: "",
//   },
//   {
//     id: "adhd_17",
//     num: 17,
//     domain: "inattention",
//     text: "Is forgetful in daily activities",
//     example: "e.g. forgets papers, forgets directions",
//   },
//   {
//     id: "adhd_18",
//     num: 18,
//     domain: "hyperactivity",
//     text: "Interrupts or intrudes on others",
//     example: "",
//   },
// ];

// export default adhdQuestions;

const adhdQuestions = [
  {
    id: "adhd_1",
    num: 1,
    domain: "inattention",

    text: {
      en: "Fails to give close attention to details",
      ur: "کیا بچہ چھوٹی چھوٹی تفصیلات پر مناسب توجہ نہیں دیتا؟",
    },

    example: {
      en: "e.g. rushes through activities, makes careless mistakes",
      ur: "مثال کے طور پر، جلدی جلدی کام کرتا ہے یا لاپرواہی سے غلطیاں کرتا ہے۔",
    },
  },

  {
    id: "adhd_2",
    num: 2,
    domain: "hyperactivity",

    text: {
      en: "Fidgets with hands or feet or squirms in seat",
      ur: "کیا بچہ ہاتھ یا پاؤں بار بار ہلاتا رہتا ہے یا اپنی نشست پر بےچینی سے حرکت کرتا رہتا ہے؟",
    },

    example: {
      en: "e.g. taps hands or feet",
      ur: "مثال کے طور پر، ہاتھ یا پاؤں مسلسل ہلاتا یا ٹپ ٹپ کرتا ہے۔",
    },
  },

  {
    id: "adhd_3",
    num: 3,
    domain: "inattention",

    text: {
      en: "Has difficulty sustaining attention in tasks or play activities",
      ur: "کیا بچے کو کھیل یا کسی کام پر مسلسل توجہ برقرار رکھنے میں مشکل ہوتی ہے؟",
    },

    example: {
      en: "",
      ur: "",
    },
  },

  {
    id: "adhd_4",
    num: 4,
    domain: "hyperactivity",

    text: {
      en: "Leaves seat in situations in which remaining seated is expected",
      ur: "کیا بچہ ایسی صورتحال میں بھی اپنی نشست چھوڑ دیتا ہے جہاں بیٹھے رہنا ضروری ہو؟",
    },

    example: {
      en: "e.g. classroom, during meals",
      ur: "مثال کے طور پر، کلاس روم یا کھانے کے دوران۔",
    },
  },

  {
    id: "adhd_5",
    num: 5,
    domain: "inattention",

    text: {
      en: "Does not seem to listen when spoken to directly",
      ur: "کیا ایسا لگتا ہے کہ بچہ براہِ راست بات کرنے پر بھی توجہ سے نہیں سنتا؟",
    },

    example: {
      en: "e.g. tunes you out",
      ur: "مثال کے طور پر، ایسا محسوس ہوتا ہے جیسے وہ آپ کی بات نظر انداز کر رہا ہو۔",
    },
  },

  {
    id: "adhd_6",
    num: 6,
    domain: "hyperactivity",

    text: {
      en: "Runs about or climbs excessively in situations in which it is inappropriate",
      ur: "کیا بچہ ایسی جگہوں پر بھی غیر ضروری طور پر دوڑتا یا چڑھتا رہتا ہے جہاں ایسا کرنا مناسب نہیں ہوتا؟",
    },

    example: {
      en: "",
      ur: "",
    },
  },
  {
  id: "adhd_7",
  num: 7,
  domain: "inattention",

  text: {
    en: "Does not follow through on instructions or fails to finish tasks",
    ur: "کیا بچہ ہدایات پر مکمل عمل نہیں کرتا یا دیے گئے کام پورے نہیں کرتا؟",
  },

  example: {
    en: "e.g. 'go upstairs, get your shoes and socks'; has difficulty with transitions",
    ur: "مثال کے طور پر، 'اوپر جا کر اپنے جوتے اور موزے لے آؤ' جیسی ہدایات مکمل نہ کرنا یا ایک کام سے دوسرے کام میں جانے میں مشکل محسوس کرنا۔",
  },
},
{
  id: "adhd_8",
  num: 8,
  domain: "hyperactivity",

  text: {
    en: "Has difficulty playing quietly",
    ur: "کیا بچے کو خاموشی سے کھیلنے میں مشکل ہوتی ہے؟",
  },

  example: {
    en: "e.g. alone or in groups",
    ur: "مثال کے طور پر، اکیلے یا دوسرے بچوں کے ساتھ کھیلتے وقت۔",
  },
},
{
  id: "adhd_9",
  num: 9,
  domain: "inattention",

  text: {
    en: "Has difficulty organizing tasks and activities",
    ur: "کیا بچے کو اپنے کاموں اور سرگرمیوں کو منظم کرنے میں مشکل ہوتی ہے؟",
  },

  example: {
    en: "e.g. choosing an activity, getting materials, doing steps in order",
    ur: "مثال کے طور پر، کسی سرگرمی کا انتخاب کرنا، ضروری چیزیں اکٹھی کرنا یا کام کو ترتیب سے مکمل کرنا۔",
  },
},
{
  id: "adhd_10",
  num: 10,
  domain: "hyperactivity",

  text: {
    en: "Is 'on the go' or acts as if 'driven by a motor'",
    ur: "کیا بچہ ہر وقت متحرک رہتا ہے یا ایسا لگتا ہے جیسے اسے مسلسل حرکت کرنے کی ضرورت ہو؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
{
  id: "adhd_11",
  num: 11,
  domain: "inattention",

  text: {
    en: "Avoids tasks that require sustained mental effort",
    ur: "کیا بچہ ایسے کاموں سے بچنے کی کوشش کرتا ہے جن میں مسلسل ذہنی توجہ کی ضرورت ہو؟",
  },

  example: {
    en: "e.g. puzzles, learning ABCs, writing name",
    ur: "مثال کے طور پر، پہیلیاں حل کرنا، حروفِ تہجی سیکھنا یا اپنا نام لکھنا۔",
  },
},
{
  id: "adhd_12",
  num: 12,
  domain: "hyperactivity",

  text: {
    en: "Talks excessively",
    ur: "کیا بچہ ضرورت سے زیادہ باتیں کرتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
{
  id: "adhd_13",
  num: 13,
  domain: "inattention",

  text: {
    en: "Loses things necessary for tasks or activities",
    ur: "کیا بچہ اپنے کاموں یا سرگرمیوں کے لیے ضروری چیزیں اکثر گم کر دیتا ہے؟",
  },

  example: {
    en: "e.g. mittens, shoes, backpack",
    ur: "مثال کے طور پر، جوتے، اسکول بیگ، دستانے یا دیگر ضروری اشیاء۔",
  },
},
{
  id: "adhd_14",
  num: 14,
  domain: "hyperactivity",

  text: {
    en: "Blurts out answers before questions have been completed",
    ur: "کیا بچہ سوال مکمل ہونے سے پہلے ہی جواب دے دیتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
{
  id: "adhd_15",
  num: 15,
  domain: "inattention",

  text: {
    en: "Is easily distracted",
    ur: "کیا بچے کی توجہ آسانی سے دوسری چیزوں کی طرف ہٹ جاتی ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
{
  id: "adhd_16",
  num: 16,
  domain: "hyperactivity",

  text: {
    en: "Has difficulty awaiting turn",
    ur: "کیا بچے کو اپنی باری کا انتظار کرنے میں مشکل ہوتی ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
{
  id: "adhd_17",
  num: 17,
  domain: "inattention",

  text: {
    en: "Is forgetful in daily activities",
    ur: "کیا بچہ روزمرہ کے کاموں میں اکثر بھول جاتا ہے؟",
  },

  example: {
    en: "e.g. forgets papers, forgets directions",
    ur: "مثال کے طور پر، ہدایات، ضروری کاغذات یا روزمرہ کے کام بھول جانا۔",
  },
},
{
  id: "adhd_18",
  num: 18,
  domain: "hyperactivity",

  text: {
    en: "Interrupts or intrudes on others",
    ur: "کیا بچہ دوسروں کی بات یا کام میں بار بار مداخلت کرتا ہے؟",
  },

  example: {
    en: "",
    ur: "",
  },
},
];


export default adhdQuestions;