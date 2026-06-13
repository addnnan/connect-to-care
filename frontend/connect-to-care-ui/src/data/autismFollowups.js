// M-CHAT-R/F Follow-Up™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
//
// Structure per item:
//   id          → matches autismQuestions id (mchat_1 … mchat_20)
//   num         → item number
//   context     → reminder of what the parent originally answered
//   steps       → ordered array of interview steps (flowchart nodes)
//
// Each step:
//   id          → unique step id within this item
//   type        → "question" | "branch"
//   text        → question text shown to interviewer/parent
//   subtext     → optional clarifying prompt
//   options     → array of { label, value, next } — next is step id or "SCORE_0" / "SCORE_1"
//   examples    → optional array of example strings to read aloud
//
// Scoring:  0 = not elevated (screen negative for this item)
//           1 = elevated     (screen positive for this item)
// If 2+ items score 1 on follow-up → overall screen POSITIVE → refer

const mchatFollowUpItems = [
  // ─── Item 1 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_1",
    num: 1,
    context: "You answered NO: your child does not look when you point at something across the room.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Please give me an example of how your child responds when you point at something.",
        subtext: "Does your child do any of the following?",
        examples: [
          "Looks at the object",
          "Points to the object",
          "Looks at the object and comments on it",
          "Looks if you point and say 'look!'",
        ],
        options: [
          { label: "Yes to any of these", value: "zero_example", next: "s2" },
          { label: "No to all of these", value: "one_only", next: "s3" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does your child also do any of the following?",
        examples: [
          "Ignore you",
          "Look around the room randomly",
          "Look at your finger instead of the object",
        ],
        options: [
          { label: "Yes to any — both 0 and 1 examples apply", value: "both", next: "s_both1" },
          { label: "No — only does the first set", value: "zero_only", next: "SCORE_0" },
        ],
      },
      {
        id: "s_both1",
        type: "question",
        text: "Which does your child do most often — look at the object, or ignore / look at your finger?",
        options: [
          { label: "Most often looks at the object", value: "most_zero", next: "SCORE_0" },
          { label: "Most often ignores or looks at finger", value: "most_one", next: "SCORE_1" },
        ],
      },
      {
        id: "s3",
        type: "branch",
        text: "Your child does not respond to pointing at all.",
        options: [{ label: "Continue", value: "continue", next: "SCORE_1" }],
      },
    ],
  },

  // ─── Item 2 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_2",
    num: 2,
    context: "You answered YES: you have wondered if your child might be deaf.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "What led you to wonder that? Does your child…",
        examples: ["Often ignore sounds", "Often ignore people"],
        options: [
          { label: "Yes to either", value: "yes_either", next: "s2" },
          { label: "No to both", value: "no_both", next: "SCORE_0" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Has your child's hearing been tested?",
        options: [
          { label: "Yes — hearing in normal range", value: "normal", next: "SCORE_1" },
          { label: "Yes — hearing below normal or inconclusive", value: "below", next: "SCORE_1" },
          { label: "No hearing test yet", value: "no_test", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 3 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_3",
    num: 3,
    context: "You answered NO: your child does not play pretend or make-believe.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Please give me an example of pretend play your child might do. Does your child usually…",
        examples: [
          "Pretend to drink from a toy cup",
          "Pretend to eat from a toy spoon or fork",
          "Pretend to talk on the telephone",
          "Pretend to feed a doll or stuffed animal",
          "Push a car along a pretend road",
          "Pretend to be a robot, airplane, or favorite character",
          "Put a toy pot on a pretend stove",
          "Stir imaginary food",
          "Put an action figure into a car as if it is the driver",
          "Pretend to vacuum, sweep, or mow the lawn",
        ],
        options: [
          { label: "Yes to any of these", value: "yes", next: "SCORE_0" },
          { label: "No to all of these", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 4 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_4",
    num: 4,
    context: "You answered NO: your child does not like climbing on things.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child enjoy climbing on any of these?",
        examples: ["Stairs", "Chairs", "Furniture", "Playground equipment"],
        options: [
          { label: "Yes to any", value: "yes", next: "SCORE_0" },
          { label: "No to all", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 5 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_5",
    num: 5,
    context: "You answered YES: your child makes unusual finger movements near their eyes.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Please describe these movements. Does your child do any of the following?",
        examples: [
          "Wiggle fingers near eyes",
          "Hold hands up close to eyes",
          "Hold hands off to the side of eyes",
          "Flap hands near face",
        ],
        options: [
          { label: "Yes to any of these (potential 1 examples)", value: "potential_one", next: "s2" },
          { label: "No — only looks at hands or plays peek-a-boo", value: "zero_only", next: "SCORE_0" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does this happen more than twice a week?",
        options: [
          { label: "Yes — more than twice a week", value: "yes", next: "SCORE_1" },
          { label: "No — less frequent", value: "no", next: "SCORE_0" },
        ],
      },
    ],
  },

  // ─── Item 6 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_6",
    num: 6,
    context: "You answered NO: your child does not point with one finger to ask for something.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "If there is something your child wants that is out of reach, how does your child get it? Does your child…",
        examples: [
          "Reach for the object with a whole hand",
          "Lead you to the object",
          "Try to get the object themselves",
          "Ask for it using words or sounds",
        ],
        options: [
          { label: "Yes to any of these", value: "yes_any", next: "SCORE_0" },
          { label: "No to all of these", value: "no_all", next: "s2" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "If you said 'show me,' would your child point at it?",
        options: [
          { label: "Yes — would point if prompted", value: "yes", next: "SCORE_0" },
          { label: "No — would not point even if prompted", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 7 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_7",
    num: 7,
    context: "You answered NO: your child does not point to show you something interesting.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child sometimes want you to see something interesting, such as…",
        examples: [
          "An airplane in the sky",
          "A truck on the road",
          "A bug on the ground",
          "An animal in the yard",
        ],
        options: [
          { label: "Yes to any — tries to draw attention", value: "yes", next: "s2" },
          { label: "No — never draws attention to interesting things", value: "no", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "How does your child draw your attention to it — would your child point with one finger?",
        options: [
          { label: "Yes — points with one finger", value: "yes_point", next: "s3" },
          { label: "No — does not point", value: "no_point", next: "SCORE_1" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Is this to show their interest — not just to get help with something?",
        options: [
          { label: "Yes — to share interest (or both sharing and getting help)", value: "yes_share", next: "SCORE_0" },
          { label: "No — only to get help, not to share interest", value: "no_share", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 8 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_8",
    num: 8,
    context: "You answered NO: your child does not seem interested in other children.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child do any of the following with other children?",
        examples: [
          "Play with another child",
          "Talk or babble to another child",
          "Watch another child",
          "Smile at another child",
          "Act shy at first but then smile",
          "Get excited about another child",
        ],
        options: [
          { label: "Yes to any", value: "yes_any", next: "s2" },
          { label: "No to all", value: "no_all", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Is your child interested in children who are not their brother or sister?",
        options: [
          { label: "Yes", value: "yes", next: "s3" },
          { label: "No", value: "no", next: "SCORE_1" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "When you are at the playground or supermarket, does your child usually respond to other children?",
        options: [
          { label: "Yes", value: "yes", next: "s4" },
          { label: "No", value: "no", next: "SCORE_1" },
        ],
      },
      {
        id: "s4",
        type: "question",
        text: "Does your child respond to other children more than half of the time?",
        options: [
          { label: "Yes — more than half the time", value: "yes", next: "SCORE_0" },
          { label: "No — less than half the time", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 9 ────────────────────────────────────────────────────────────────
  {
    id: "mchat_9",
    num: 9,
    context: "You answered NO: your child does not show you things just to share.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child sometimes bring you or hold up any of the following — just to show you, not to get help?",
        examples: [
          "A picture or toy just to show you",
          "A drawing they have done",
          "A flower they have picked",
          "A bug they found in the grass",
          "A few blocks they have put together",
        ],
        options: [
          { label: "Yes to any — and sometimes just to share", value: "yes_share", next: "SCORE_0" },
          { label: "Yes but only to get help, never just to share", value: "yes_help_only", next: "SCORE_1" },
          { label: "No to all", value: "no_all", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 10 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_10",
    num: 10,
    context: "You answered NO: your child does not respond when their name is called.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "If your child is not doing something fun or interesting, what happens when you call their name? Does your child…",
        examples: ["Look up", "Talk or babble", "Stop what they are doing"],
        options: [
          { label: "Yes to any of these (0 responses)", value: "zero_resp", next: "s2" },
          { label: "No to all — no response at all", value: "no_all", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does your child also do any of the following?",
        examples: [
          "Make no response",
          "Seem to hear but ignore you",
          "Respond only if you are right in front of their face",
          "Respond only if touched",
        ],
        options: [
          { label: "Yes — both types apply", value: "both", next: "s3" },
          { label: "No — only responds appropriately", value: "zero_only", next: "SCORE_0" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Which does your child do most often?",
        options: [
          { label: "Most often responds (looks up, babbles, stops)", value: "most_zero", next: "SCORE_0" },
          { label: "Most often ignores or needs face-to-face", value: "most_one", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 11 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_11",
    num: 11,
    context: "You answered NO: your child does not smile back when you smile at them.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "What makes your child smile? Does your child smile when…",
        examples: [
          "You smile at them",
          "You enter the room",
          "You return from being away",
        ],
        options: [
          { label: "Yes to any of these (social smiling)", value: "social_smile", next: "s2" },
          { label: "No to all of these", value: "no_social", next: "s2b" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does your child also smile for non-social reasons?",
        examples: [
          "Always smiling",
          "Smiling at a favourite toy or activity",
          "Smiling randomly or at nothing in particular",
        ],
        options: [
          { label: "Yes — both social and non-social smiling", value: "both", next: "s3" },
          { label: "No — only smiles socially", value: "social_only", next: "SCORE_0" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Which does your child do most often?",
        options: [
          { label: "Most often smiles socially (at people)", value: "most_social", next: "SCORE_0" },
          { label: "Most often smiles at toys/randomly", value: "most_nonsocial", next: "SCORE_1" },
        ],
      },
      {
        id: "s2b",
        type: "question",
        text: "Does your child smile at all — at toys, activities, or randomly?",
        options: [
          { label: "Yes — smiles but not at people", value: "yes_nonsocial", next: "SCORE_1" },
          { label: "No — rarely or never smiles", value: "no_smile", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 12 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_12",
    num: 12,
    context: "You answered YES: your child gets upset by everyday noises.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child have a negative reaction to two or more of the following sounds?",
        examples: [
          "Washing machine",
          "Babies crying",
          "Vacuum cleaner",
          "Hairdryer",
          "Traffic",
          "Loud music",
          "Telephone or doorbell ringing",
          "Noisy places like a supermarket",
        ],
        options: [
          { label: "Yes — reacts to two or more", value: "yes_two", next: "s2" },
          { label: "Yes — only reacts to one", value: "yes_one", next: "SCORE_0" },
          { label: "No — doesn't really react", value: "no", next: "SCORE_0" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "How does your child react to those noises? Does your child…",
        examples: ["Calmly cover ears", "Tell you they don't like the noise"],
        options: [
          { label: "Yes — calm reaction only", value: "calm_only", next: "SCORE_0" },
          { label: "No calm reaction — also screams, cries, or covers ears while upset", value: "distressed", next: "s3" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Does your child scream, cry, or cover ears while distressed?",
        options: [
          { label: "Yes — screams, cries, or covers ears while upset", value: "yes", next: "s4" },
          { label: "Both calm and distressed reactions", value: "both", next: "s4" },
        ],
      },
      {
        id: "s4",
        type: "question",
        text: "Which reaction is most common?",
        options: [
          { label: "Most often stays calm", value: "calm", next: "SCORE_0" },
          { label: "Most often screams or cries", value: "distressed", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 13 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_13",
    num: 13,
    context: "You answered NO: your child does not walk.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child walk without holding on to anything?",
        options: [
          { label: "Yes — walks independently", value: "yes", next: "SCORE_0" },
          { label: "No — cannot walk independently", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 14 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_14",
    num: 14,
    context: "You answered NO: your child does not look you in the eye.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child look you in the eye every day?",
        options: [
          { label: "Yes — every day", value: "yes_daily", next: "s2" },
          { label: "No — not every day", value: "no_daily", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "On a day when you are together all day, does your child look you in the eye at least 5 times?",
        options: [
          { label: "Yes — at least 5 times", value: "yes_five", next: "s3" },
          { label: "No — fewer than 5 times", value: "no_five", next: "SCORE_1" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Does your child look you in the eye in two or more of these situations?",
        examples: [
          "When they need something",
          "When you are playing together",
          "During feeding",
          "During diaper changes",
          "When you are reading a story",
          "When you are talking to them",
        ],
        options: [
          { label: "Yes — two or more situations", value: "yes_two", next: "SCORE_0" },
          { label: "Only one situation", value: "one", next: "SCORE_1" },
          { label: "None of these", value: "none", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 15 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_15",
    num: 15,
    context: "You answered NO: your child does not try to copy what you do.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child try to copy you if you do two or more of the following?",
        examples: [
          "Stick out your tongue",
          "Make a funny sound",
          "Wave goodbye",
          "Clap your hands",
          "Put finger to lips to say 'shhh'",
          "Blow a kiss",
        ],
        options: [
          { label: "Yes — copies two or more", value: "yes_two", next: "SCORE_0" },
          { label: "Copies only one", value: "one_only", next: "SCORE_1" },
          { label: "No — copies none", value: "none", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 16 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_16",
    num: 16,
    context: "You answered NO: your child does not look around when you turn your head.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "What does your child do when you turn to look at something? Does your child…",
        examples: [
          "Look toward the thing you are looking at",
          "Point toward the thing you are looking at",
          "Look around to see what you are looking at",
        ],
        options: [
          { label: "Yes to any of these (follows gaze)", value: "follows_gaze", next: "s2" },
          { label: "No — ignores you or looks at your face only", value: "no_follow", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does your child also ignore you or just look at your face instead of following your gaze?",
        options: [
          { label: "Yes — both following gaze and ignoring", value: "both", next: "s3" },
          { label: "No — only follows gaze", value: "gaze_only", next: "SCORE_0" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Which does your child do most often?",
        options: [
          { label: "Most often follows your gaze", value: "most_gaze", next: "SCORE_0" },
          { label: "Most often ignores or looks at your face", value: "most_ignore", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 17 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_17",
    num: 17,
    context: "You answered NO: your child does not try to get you to watch them.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "Does your child do any of the following to get you to watch them?",
        examples: [
          "Say 'Look!' or 'Watch me!'",
          "Babble or make a noise to get you to watch",
          "Look at you to get praise or a comment",
          "Keep looking to see if you are watching",
        ],
        options: [
          { label: "Yes to any", value: "yes_any", next: "SCORE_0" },
          { label: "No to all", value: "no_all", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 18 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_18",
    num: 18,
    context: "You answered NO: your child does not understand when told to do something.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "When the situation gives a clue (e.g. it's dinnertime and food is on the table and you say 'sit down'), does your child understand?",
        options: [
          { label: "Yes — understands with context clues", value: "yes_context", next: "s2" },
          { label: "No — does not understand even with context", value: "no_context", next: "SCORE_1" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Without pointing or gestures, can your child follow any of these commands?",
        examples: [
          "'Show me your shoe' (not while getting dressed)",
          "'Bring me the blanket'",
          "'Put the book on the chair'",
        ],
        options: [
          { label: "Yes to any — follows without gestures", value: "yes_any", next: "SCORE_0" },
          { label: "No to all — needs gestures or pointing", value: "no_all", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 19 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_19",
    num: 19,
    context: "You answered NO: your child does not look at your face when something new happens.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "If your child hears a strange or scary noise, will they look at you before responding?",
        options: [
          { label: "Yes — looks at parent first", value: "yes", next: "SCORE_0" },
          { label: "No", value: "no", next: "s2" },
        ],
      },
      {
        id: "s2",
        type: "question",
        text: "Does your child look at you when someone new approaches?",
        options: [
          { label: "Yes", value: "yes", next: "SCORE_0" },
          { label: "No", value: "no", next: "s3" },
        ],
      },
      {
        id: "s3",
        type: "question",
        text: "Does your child look at you when faced with something unfamiliar or a little scary?",
        options: [
          { label: "Yes", value: "yes", next: "SCORE_0" },
          { label: "No — never looks at parent for reassurance", value: "no", next: "SCORE_1" },
        ],
      },
    ],
  },

  // ─── Item 20 ───────────────────────────────────────────────────────────────
  {
    id: "mchat_20",
    num: 20,
    context: "You answered NO: your child does not seem to like movement activities.",
    steps: [
      {
        id: "s1",
        type: "question",
        text: "When you swing or bounce your child, how do they react? Do they…",
        examples: [
          "Laugh or smile",
          "Talk or babble",
          "Hold out arms to request more",
        ],
        options: [
          { label: "Yes to any positive reaction", value: "yes_positive", next: "SCORE_0" },
          { label: "No — neutral or negative reaction", value: "no_positive", next: "SCORE_1" },
        ],
      },
    ],
  },
];

export default mchatFollowUpItems;