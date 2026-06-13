// const autismQuestions = [
//   {
//     id: "eye_contact",
//     text: "Avoids or struggles to maintain eye contact",
//     domain: "social",
//   },
//   {
//     id: "name_response",
//     text: "Does not consistently respond when name is called",
//     domain: "communication",
//   },
//   {
//     id: "peer_play",
//     text: "Has difficulty engaging in play with others",
//     domain: "social",
//   },
//   {
//     id: "gestures",
//     text: "Rarely uses gestures such as pointing or waving",
//     domain: "communication",
//   },
//   {
//     id: "repetitive",
//     text: "Repeats the same actions or behaviors frequently",
//     domain: "repetitive",
//   },
//   {
//     id: "routine_change",
//     text: "Becomes distressed by changes in routine",
//     domain: "sensory",
//   },
// ];
// export default autismQuestions;

// M-CHAT-R™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
// For items 2, 5, and 12: "YES" = elevated likelihood (reversed scoring)
// For all other items:    "NO"  = elevated likelihood

// M-CHAT-R™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
// Scoring: items 2, 5, 12 → YES = elevated; all others → NO = elevated
// 0–2  = Low likelihood
// 3–7  = Moderate likelihood (follow-up recommended)
// 8–20 = High likelihood (refer directly)
//
// Domain groupings (Social / Communication / Sensory / Motor):
//   Social        → 8, 11, 14, 17, 19
//   Communication → 1, 6, 7, 9, 10, 15, 16, 18
//   Sensory       → 2, 5, 12
//   Motor         → 3, 4, 13, 20

const autismQuestions = [
  {
    id: "mchat_1",
    num: 1,
    domain: "communication",
    text: "If you point at something across the room, does your child look at it?",
    example:
      "For example, if you point at a toy or an animal, does your child look at the toy or animal?",
    reversed: false,
  },
  {
    id: "mchat_2",
    num: 2,
    domain: "sensory",
    text: "Have you ever wondered if your child might be deaf?",
    example: "",
    reversed: true,
  },
  {
    id: "mchat_3",
    num: 3,
    domain: "motor",
    text: "Does your child play pretend or make-believe?",
    example:
      "For example, pretend to drink from an empty cup, pretend to talk on a phone, or pretend to feed a doll or stuffed animal?",
    reversed: false,
  },
  {
    id: "mchat_4",
    num: 4,
    domain: "motor",
    text: "Does your child like climbing on things?",
    example: "For example, furniture, playground equipment, or stairs?",
    reversed: false,
  },
  {
    id: "mchat_5",
    num: 5,
    domain: "sensory",
    text: "Does your child make unusual finger movements near his or her eyes?",
    example:
      "For example, does your child wiggle his or her fingers close to his or her eyes?",
    reversed: true,
  },
  {
    id: "mchat_6",
    num: 6,
    domain: "communication",
    text: "Does your child point with one finger to ask for something or to get help?",
    example: "For example, pointing to a snack or toy that is out of reach?",
    reversed: false,
  },
  {
    id: "mchat_7",
    num: 7,
    domain: "communication",
    text: "Does your child point with one finger to show you something interesting?",
    example:
      "For example, pointing to an airplane in the sky or a big truck in the road?",
    reversed: false,
  },
  {
    id: "mchat_8",
    num: 8,
    domain: "social",
    text: "Is your child interested in other children?",
    example:
      "For example, does your child watch other children, smile at them, or go to them?",
    reversed: false,
  },
  {
    id: "mchat_9",
    num: 9,
    domain: "communication",
    text: "Does your child show you things by bringing them to you or holding them up for you to see — not to get help, but just to share?",
    example:
      "For example, showing you a flower, a stuffed animal, or a toy truck?",
    reversed: false,
  },
  {
    id: "mchat_10",
    num: 10,
    domain: "communication",
    text: "Does your child respond when you call his or her name?",
    example:
      "For example, does he or she look up, talk or babble, or stop what he or she is doing when you call his or her name?",
    reversed: false,
  },
  {
    id: "mchat_11",
    num: 11,
    domain: "social",
    text: "When you smile at your child, does he or she smile back at you?",
    example: "",
    reversed: false,
  },
  {
    id: "mchat_12",
    num: 12,
    domain: "sensory",
    text: "Does your child get upset by everyday noises?",
    example:
      "For example, does your child scream or cry to noise such as a vacuum cleaner or loud music?",
    reversed: true,
  },
  {
    id: "mchat_13",
    num: 13,
    domain: "motor",
    text: "Does your child walk?",
    example: "",
    reversed: false,
  },
  {
    id: "mchat_14",
    num: 14,
    domain: "social",
    text: "Does your child look you in the eye when you are talking to him or her, playing with him or her, or dressing him or her?",
    example: "",
    reversed: false,
  },
  {
    id: "mchat_15",
    num: 15,
    domain: "communication",
    text: "Does your child try to copy what you do?",
    example:
      "For example, wave bye-bye, clap, or make a funny noise when you do?",
    reversed: false,
  },
  {
    id: "mchat_16",
    num: 16,
    domain: "communication",
    text: "If you turn your head to look at something, does your child look around to see what you are looking at?",
    example: "",
    reversed: false,
  },
  {
    id: "mchat_17",
    num: 17,
    domain: "social",
    text: "Does your child try to get you to watch him or her?",
    example:
      "For example, does your child look at you for praise, or say 'look' or 'watch me'?",
    reversed: false,
  },
  {
    id: "mchat_18",
    num: 18,
    domain: "communication",
    text: "Does your child understand when you tell him or her to do something?",
    example:
      "For example, if you don't point, can your child understand 'put the book on the chair' or 'bring me the blanket'?",
    reversed: false,
  },
  {
    id: "mchat_19",
    num: 19,
    domain: "social",
    text: "If something new happens, does your child look at your face to see how you feel about it?",
    example:
      "For example, if he or she hears a strange or funny noise, or sees a new toy, will he or she look at your face?",
    reversed: false,
  },
  {
    id: "mchat_20",
    num: 20,
    domain: "motor",
    text: "Does your child like movement activities?",
    example: "For example, being swung or bounced on your knee?",
    reversed: false,
  },
];

export default autismQuestions;