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

const adhdQuestions = [
  {
    id: "adhd_1",
    num: 1,
    domain: "inattention",
    text: "Fails to give close attention to details",
    example: "e.g. rushes through activities, makes careless mistakes",
  },
  {
    id: "adhd_2",
    num: 2,
    domain: "hyperactivity",
    text: "Fidgets with hands or feet or squirms in seat",
    example: "e.g. taps hands or feet",
  },
  {
    id: "adhd_3",
    num: 3,
    domain: "inattention",
    text: "Has difficulty sustaining attention in tasks or play activities",
    example: "",
  },
  {
    id: "adhd_4",
    num: 4,
    domain: "hyperactivity",
    text: "Leaves seat in situations in which remaining seated is expected",
    example: "e.g. classroom, during meals",
  },
  {
    id: "adhd_5",
    num: 5,
    domain: "inattention",
    text: "Does not seem to listen when spoken to directly",
    example: "e.g. tunes you out",
  },
  {
    id: "adhd_6",
    num: 6,
    domain: "hyperactivity",
    text: "Runs about or climbs excessively in situations in which it is inappropriate",
    example: "",
  },
  {
    id: "adhd_7",
    num: 7,
    domain: "inattention",
    text: "Does not follow through on instructions or fails to finish tasks",
    example: "e.g. 'go upstairs, get your shoes and socks'; has difficulty with transitions",
  },
  {
    id: "adhd_8",
    num: 8,
    domain: "hyperactivity",
    text: "Has difficulty playing quietly",
    example: "e.g. alone or in groups",
  },
  {
    id: "adhd_9",
    num: 9,
    domain: "inattention",
    text: "Has difficulty organizing tasks and activities",
    example: "e.g. choosing an activity, getting materials, doing steps in order",
  },
  {
    id: "adhd_10",
    num: 10,
    domain: "hyperactivity",
    text: "Is 'on the go' or acts as if 'driven by a motor'",
    example: "",
  },
  {
    id: "adhd_11",
    num: 11,
    domain: "inattention",
    text: "Avoids tasks that require sustained mental effort",
    example: "e.g. puzzles, learning ABCs, writing name",
  },
  {
    id: "adhd_12",
    num: 12,
    domain: "hyperactivity",
    text: "Talks excessively",
    example: "",
  },
  {
    id: "adhd_13",
    num: 13,
    domain: "inattention",
    text: "Loses things necessary for tasks or activities",
    example: "e.g. mittens, shoes, backpack",
  },
  {
    id: "adhd_14",
    num: 14,
    domain: "hyperactivity",
    text: "Blurts out answers before questions have been completed",
    example: "",
  },
  {
    id: "adhd_15",
    num: 15,
    domain: "inattention",
    text: "Is easily distracted",
    example: "",
  },
  {
    id: "adhd_16",
    num: 16,
    domain: "hyperactivity",
    text: "Has difficulty awaiting turn",
    example: "",
  },
  {
    id: "adhd_17",
    num: 17,
    domain: "inattention",
    text: "Is forgetful in daily activities",
    example: "e.g. forgets papers, forgets directions",
  },
  {
    id: "adhd_18",
    num: 18,
    domain: "hyperactivity",
    text: "Interrupts or intrudes on others",
    example: "",
  },
];

export default adhdQuestions;