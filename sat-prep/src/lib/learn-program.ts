import { LEARN_PROGRAM_RU } from "./learn-program-ru";

export type LearnQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LearnModule = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  theory: string;
  outcomes: string[];
  checkpoints: string[];
  quiz: LearnQuizQuestion[];
};

export type LearnGrade = {
  id: string;
  label: string;
  stage: string;
  summary: string;
  goal: string;
  subjects: LearnModule[];
};

export type LearnProgramLanguage = "en" | "ru";

export const LEARN_PROGRAM: LearnGrade[] = [
  {
    id: "grade-7",
    label: "Grade 7",
    stage: "Foundation Reset",
    summary:
      "Build confidence with numbers, proportions, grammar structure, and scientific observation.",
    goal: "Start from the essentials and remove fear around school basics.",
    subjects: [
      {
        id: "grade-7-math",
        title: "Math Foundations",
        tag: "Numbers and Ratios",
        summary:
          "Work with integers, fractions, decimals, percentages, and simple proportions.",
        theory:
          "Grade 7 math is where students stop memorizing isolated facts and begin connecting quantities. Fractions, percentages, and ratios all describe relationships. Once a learner sees that 25%, 1/4, and 0.25 mean the same amount, many later topics become easier.",
        outcomes: [
          "Convert between fractions, decimals, and percentages",
          "Solve ratio and proportion questions step by step",
          "Estimate answers before calculating"
        ],
        checkpoints: [
          "Can explain why 3/5 equals 0.6",
          "Can find a percentage of a number",
          "Can compare two ratios"
        ],
        quiz: [
          {
            id: "g7m-1",
            prompt: "What is 25% of 80?",
            options: ["10", "20", "25", "40"],
            correctIndex: 1,
            explanation:
              "25% means one fourth. One fourth of 80 is 20."
          },
          {
            id: "g7m-2",
            prompt: "Which value is equal to 3/4?",
            options: ["0.25", "0.5", "0.75", "1.25"],
            correctIndex: 2,
            explanation:
              "Divide 3 by 4 to convert the fraction into a decimal: 0.75."
          }
        ]
      },
      {
        id: "grade-7-science",
        title: "Science Thinking",
        tag: "Observation and Variables",
        summary:
          "Learn how to describe experiments, identify variables, and read simple data.",
        theory:
          "Science at this level is about asking clear questions. Students learn to separate what changes from what stays constant, and how observations become evidence. This habit becomes the backbone of biology, chemistry, and physics later.",
        outcomes: [
          "Recognize independent and dependent variables",
          "Read tables and simple graphs",
          "Write a basic evidence-based conclusion"
        ],
        checkpoints: [
          "Can identify what is being tested",
          "Can read a pattern from a data table",
          "Can explain results using evidence"
        ],
        quiz: [
          {
            id: "g7s-1",
            prompt: "In an experiment about plant growth, what is the dependent variable?",
            options: [
              "The amount of water",
              "The type of soil",
              "The height of the plant",
              "The size of the pot"
            ],
            correctIndex: 2,
            explanation:
              "The dependent variable is the result that changes and gets measured. Here it is plant height."
          },
          {
            id: "g7s-2",
            prompt: "Why do scientists repeat an experiment?",
            options: [
              "To make the report longer",
              "To check whether the result is reliable",
              "To change the question",
              "To avoid measuring data"
            ],
            correctIndex: 1,
            explanation:
              "Repeating an experiment helps confirm the result and improves reliability."
          }
        ]
      },
      {
        id: "grade-7-language",
        title: "Language Basics",
        tag: "Sentence Building",
        summary:
          "Practice sentence structure, punctuation, and clear expression.",
        theory:
          "Strong academic reading and writing start with clean sentences. Students learn to spot subjects, verbs, modifiers, and punctuation marks that organize meaning. This helps with both school essays and SAT writing later.",
        outcomes: [
          "Identify subject and verb pairs",
          "Use commas and periods correctly",
          "Rewrite unclear sentences into clear ones"
        ],
        checkpoints: [
          "Can spot a complete sentence",
          "Can fix a comma splice",
          "Can choose the clearest wording"
        ],
        quiz: [
          {
            id: "g7l-1",
            prompt: "Which is a complete sentence?",
            options: [
              "Because the weather was cold.",
              "Running through the park.",
              "The students finished the project.",
              "During the long weekend."
            ],
            correctIndex: 2,
            explanation:
              "A complete sentence needs a full idea with a subject and a verb."
          },
          {
            id: "g7l-2",
            prompt: "Choose the clearest revision: 'The dog barked it was excited.'",
            options: [
              "The dog barked, it was excited.",
              "The dog barked because it was excited.",
              "The dog barked and excited.",
              "The dog because it barked excited."
            ],
            correctIndex: 1,
            explanation:
              "Adding 'because' connects the ideas clearly and correctly."
          }
        ]
      }
    ]
  },
  {
    id: "grade-8",
    label: "Grade 8",
    stage: "Structure and Patterns",
    summary:
      "Move from arithmetic into algebraic thinking, graph reading, and multi-step explanation.",
    goal: "Learn how patterns become equations and evidence becomes explanation.",
    subjects: [
      {
        id: "grade-8-algebra",
        title: "Algebra Build-Up",
        tag: "Expressions and Equations",
        summary:
          "Translate words into expressions and solve one-step and two-step equations.",
        theory:
          "Algebra introduces letters as placeholders for quantities. Students learn that equations are balance statements, and solving them means preserving equality while isolating the unknown.",
        outcomes: [
          "Simplify expressions with like terms",
          "Solve one-step and two-step equations",
          "Translate verbal statements into algebra"
        ],
        checkpoints: [
          "Can solve x + 7 = 12",
          "Can simplify 3x + 2x",
          "Can build an equation from a word problem"
        ],
        quiz: [
          {
            id: "g8a-1",
            prompt: "Solve: x + 9 = 15",
            options: ["4", "5", "6", "7"],
            correctIndex: 2,
            explanation:
              "Subtract 9 from both sides. x = 15 - 9 = 6."
          },
          {
            id: "g8a-2",
            prompt: "Simplify: 4y + 3y",
            options: ["7", "7y", "12y", "43y"],
            correctIndex: 1,
            explanation:
              "Like terms can be combined: 4y + 3y = 7y."
          }
        ]
      },
      {
        id: "grade-8-geometry",
        title: "Geometry and Graphs",
        tag: "Space and Coordinates",
        summary:
          "Understand angles, area, and coordinate graphs.",
        theory:
          "Students begin connecting visual space with measurement. A graph becomes a map of pairs, and geometry becomes a language for describing space with precision.",
        outcomes: [
          "Classify angles and triangles",
          "Read ordered pairs on a coordinate plane",
          "Use formulas for area and perimeter"
        ],
        checkpoints: [
          "Can identify an obtuse angle",
          "Can plot a point like (3, 2)",
          "Can calculate rectangle area"
        ],
        quiz: [
          {
            id: "g8g-1",
            prompt: "What is the area of a rectangle with length 8 and width 5?",
            options: ["13", "20", "40", "80"],
            correctIndex: 2,
            explanation:
              "Area of a rectangle is length times width: 8 x 5 = 40."
          },
          {
            id: "g8g-2",
            prompt: "Which point has x = 4 and y = 1?",
            options: ["(1, 4)", "(4, 1)", "(4, 4)", "(1, 1)"],
            correctIndex: 1,
            explanation:
              "Ordered pairs are written as (x, y), so the point is (4, 1)."
          }
        ]
      },
      {
        id: "grade-8-analysis",
        title: "Analytical Reading",
        tag: "Main Idea and Support",
        summary:
          "Learn to find the main idea, supporting detail, and logical sequence.",
        theory:
          "Reading comprehension grows when students separate the author's main claim from examples and background information. This skill makes textbooks, articles, and SAT passages much easier to manage.",
        outcomes: [
          "Identify main idea and supporting detail",
          "Track sequence and cause-effect",
          "Distinguish fact from opinion"
        ],
        checkpoints: [
          "Can summarize a paragraph in one sentence",
          "Can identify evidence for a claim",
          "Can recognize the author's purpose"
        ],
        quiz: [
          {
            id: "g8r-1",
            prompt: "Which detail usually supports the main idea?",
            options: [
              "A fact or example from the text",
              "A random unrelated sentence",
              "Only the title",
              "A punctuation mark"
            ],
            correctIndex: 0,
            explanation:
              "Supporting details give evidence or explanation for the main idea."
          },
          {
            id: "g8r-2",
            prompt: "If a paragraph explains why a river flooded after days of rain, the structure is mainly:",
            options: [
              "Cause and effect",
              "Compare and contrast",
              "Problem without solution",
              "Alphabetical order"
            ],
            correctIndex: 0,
            explanation:
              "The rain is the cause, and the flood is the effect."
          }
        ]
      }
    ]
  },
  {
    id: "grade-9",
    label: "Grade 9",
    stage: "Core Academic Skills",
    summary:
      "Strengthen linear relationships, scientific reasoning, and text analysis.",
    goal: "Become comfortable with high-school level logic and evidence.",
    subjects: [
      {
        id: "grade-9-linear",
        title: "Linear Algebra",
        tag: "Slope and Graphs",
        summary:
          "Study slope, intercepts, linear equations, and proportional relationships.",
        theory:
          "Grade 9 algebra turns patterns into formal models. Students learn that slope describes rate of change, while intercepts show starting values. This is one of the most important bridges to SAT math.",
        outcomes: [
          "Interpret slope as rate of change",
          "Graph y = mx + b equations",
          "Compare linear models in tables and graphs"
        ],
        checkpoints: [
          "Can identify slope from two points",
          "Can explain what an intercept means",
          "Can match an equation to a graph"
        ],
        quiz: [
          {
            id: "g9l-1",
            prompt: "In y = 3x + 2, what is the slope?",
            options: ["2", "3", "5", "x"],
            correctIndex: 1,
            explanation:
              "In slope-intercept form y = mx + b, the slope is m. Here m = 3."
          },
          {
            id: "g9l-2",
            prompt: "A line with a positive slope goes:",
            options: [
              "Down from left to right",
              "Up from left to right",
              "Straight sideways",
              "In a circle"
            ],
            correctIndex: 1,
            explanation:
              "A positive slope rises as x increases."
          }
        ]
      },
      {
        id: "grade-9-science",
        title: "Biology and Chemistry Basics",
        tag: "Systems and Matter",
        summary:
          "Understand cells, atoms, simple reactions, and evidence from lab situations.",
        theory:
          "Science becomes more abstract in Grade 9. Students begin moving between tiny-scale models like atoms and large systems like ecosystems or body processes. The goal is not memorization alone but understanding how systems interact.",
        outcomes: [
          "Describe cell structure and function",
          "Understand atoms, elements, and compounds",
          "Read simple reaction or ecosystem diagrams"
        ],
        checkpoints: [
          "Can explain the role of the nucleus",
          "Can distinguish element vs compound",
          "Can identify a variable in a lab setup"
        ],
        quiz: [
          {
            id: "g9s-1",
            prompt: "Which organelle controls the activities of the cell?",
            options: ["Cell wall", "Nucleus", "Membrane", "Ribosome"],
            correctIndex: 1,
            explanation:
              "The nucleus stores genetic information and directs cell activity."
          },
          {
            id: "g9s-2",
            prompt: "Water (H2O) is best described as a:",
            options: ["Single atom", "Mixture only", "Compound", "Cell"],
            correctIndex: 2,
            explanation:
              "Water contains hydrogen and oxygen chemically bonded, so it is a compound."
          }
        ]
      },
      {
        id: "grade-9-reading",
        title: "Critical Reading",
        tag: "Claims and Evidence",
        summary:
          "Track arguments, author tone, and which evidence actually supports a claim.",
        theory:
          "At this stage, students read not just for information but for argument. They ask what the author believes, how the author proves it, and whether the evidence is strong or weak.",
        outcomes: [
          "Identify claim, evidence, and reasoning",
          "Notice tone and author attitude",
          "Choose the best textual support"
        ],
        checkpoints: [
          "Can spot the author's claim",
          "Can tell whether evidence is relevant",
          "Can compare two supporting details"
        ],
        quiz: [
          {
            id: "g9r-1",
            prompt: "Which sentence is most likely a claim?",
            options: [
              "The chart has three columns.",
              "School start times should be later for teenagers.",
              "The bus arrived at 8:10 a.m.",
              "The article has five paragraphs."
            ],
            correctIndex: 1,
            explanation:
              "A claim is an arguable statement or position."
          },
          {
            id: "g9r-2",
            prompt: "Evidence in an argument should be:",
            options: [
              "Unrelated to the topic",
              "Clear and relevant to the claim",
              "Only emotional",
              "Impossible to verify"
            ],
            correctIndex: 1,
            explanation:
              "Strong evidence directly supports the author's claim."
          }
        ]
      }
    ]
  },
  {
    id: "grade-10",
    label: "Grade 10",
    stage: "Acceleration Phase",
    summary:
      "Push into functions, physics thinking, and analytical writing.",
    goal: "Handle multi-step reasoning with more confidence and less confusion.",
    subjects: [
      {
        id: "grade-10-functions",
        title: "Functions and Modeling",
        tag: "Input and Output",
        summary:
          "Explore functions, systems, inequalities, and how equations model real situations.",
        theory:
          "A function is a rule that connects inputs to outputs. Students learn to compare representations, solve systems, and interpret what solutions mean in context.",
        outcomes: [
          "Read function notation and tables",
          "Solve systems of equations",
          "Interpret solutions in real-world situations"
        ],
        checkpoints: [
          "Can find f(2) from a rule",
          "Can solve a basic system",
          "Can explain what a solution means"
        ],
        quiz: [
          {
            id: "g10f-1",
            prompt: "If f(x) = 2x + 1, what is f(3)?",
            options: ["5", "6", "7", "8"],
            correctIndex: 2,
            explanation:
              "Substitute 3 for x: 2(3) + 1 = 7."
          },
          {
            id: "g10f-2",
            prompt: "The solution to a system of two lines is the point where the lines:",
            options: ["Start", "Intersect", "Disappear", "Become curved"],
            correctIndex: 1,
            explanation:
              "The shared point satisfies both equations, so it is where the lines intersect."
          }
        ]
      },
      {
        id: "grade-10-physics",
        title: "Physics Foundations",
        tag: "Motion and Forces",
        summary:
          "Understand speed, acceleration, force, and the language of physical models.",
        theory:
          "Grade 10 physics asks students to connect motion with measurable quantities. Graphs, formulas, and units all represent physical events in different ways. The core habit is to interpret what the quantities mean before calculating.",
        outcomes: [
          "Differentiate speed, velocity, and acceleration",
          "Use force = mass x acceleration",
          "Read motion from a graph or table"
        ],
        checkpoints: [
          "Can explain acceleration in words",
          "Can calculate force from a simple formula",
          "Can interpret units correctly"
        ],
        quiz: [
          {
            id: "g10p-1",
            prompt: "What happens when speed changes over time?",
            options: [
              "The object has acceleration",
              "The object has no motion",
              "The mass disappears",
              "The force becomes zero automatically"
            ],
            correctIndex: 0,
            explanation:
              "Acceleration describes any change in velocity over time."
          },
          {
            id: "g10p-2",
            prompt: "If mass = 2 kg and acceleration = 4 m/s^2, force is:",
            options: ["2 N", "4 N", "6 N", "8 N"],
            correctIndex: 3,
            explanation:
              "Use F = ma. So F = 2 x 4 = 8 newtons."
          }
        ]
      },
      {
        id: "grade-10-writing",
        title: "Analytical Writing",
        tag: "Structure and Revision",
        summary:
          "Learn how to organize paragraphs, transitions, and evidence-based explanation.",
        theory:
          "Good writing is structured thinking on the page. Students practice topic sentences, evidence integration, commentary, and transitions that help the reader follow the logic of an argument.",
        outcomes: [
          "Write stronger topic sentences",
          "Use transitions to connect ideas",
          "Explain evidence instead of just inserting it"
        ],
        checkpoints: [
          "Can build a paragraph with one focus",
          "Can revise vague wording",
          "Can connect evidence to a claim"
        ],
        quiz: [
          {
            id: "g10w-1",
            prompt: "What is the purpose of a topic sentence?",
            options: [
              "To repeat the title only",
              "To introduce the main idea of the paragraph",
              "To add a random detail",
              "To end the essay"
            ],
            correctIndex: 1,
            explanation:
              "A topic sentence states the main point that the paragraph will develop."
          },
          {
            id: "g10w-2",
            prompt: "Which transition best shows contrast?",
            options: ["Furthermore", "For example", "However", "Therefore"],
            correctIndex: 2,
            explanation:
              "'However' signals contrast between ideas."
          }
        ]
      }
    ]
  },
  {
    id: "grade-11",
    label: "Grade 11",
    stage: "SAT Bridge",
    summary:
      "Connect school fundamentals to the logic, pacing, and rigor of SAT-style work.",
    goal: "Turn school knowledge into test-ready confidence.",
    subjects: [
      {
        id: "grade-11-data",
        title: "Data and Probability",
        tag: "Inference and Patterns",
        summary:
          "Work with statistics, probability, and how data supports conclusions.",
        theory:
          "This is where students learn to read data critically. Mean, median, spread, probability, and trend interpretation all matter on standardized tests because they measure reasoning, not just arithmetic.",
        outcomes: [
          "Interpret averages and spread",
          "Solve simple probability questions",
          "Draw careful conclusions from charts"
        ],
        checkpoints: [
          "Can compute a mean",
          "Can compare median and mean",
          "Can reason about likelihood"
        ],
        quiz: [
          {
            id: "g11d-1",
            prompt: "What is the mean of 4, 6, and 8?",
            options: ["5", "6", "7", "8"],
            correctIndex: 1,
            explanation:
              "Add the numbers and divide by 3: (4 + 6 + 8) / 3 = 6."
          },
          {
            id: "g11d-2",
            prompt: "If a bag has 3 red and 2 blue marbles, the probability of red is:",
            options: ["2/5", "3/5", "1/2", "5/3"],
            correctIndex: 1,
            explanation:
              "Probability is favorable outcomes over total outcomes: 3 out of 5."
          }
        ]
      },
      {
        id: "grade-11-reading",
        title: "Evidence Reading",
        tag: "Inference and Tone",
        summary:
          "Practice inference, vocabulary in context, and passage-level reasoning.",
        theory:
          "Advanced reading is about what the text implies as much as what it states. Students learn to justify inferences with evidence and avoid choices that sound nice but are not text-based.",
        outcomes: [
          "Make evidence-based inferences",
          "Interpret words in context",
          "Track shifts in tone or purpose"
        ],
        checkpoints: [
          "Can justify an inference with a line from the text",
          "Can choose a context-based meaning",
          "Can identify a tone shift"
        ],
        quiz: [
          {
            id: "g11r-1",
            prompt: "A strong inference answer should be:",
            options: [
              "Based on evidence from the text",
              "Purely based on imagination",
              "The longest option",
              "Completely unrelated"
            ],
            correctIndex: 0,
            explanation:
              "An inference must be supported by textual evidence."
          },
          {
            id: "g11r-2",
            prompt: "Vocabulary in context means finding the meaning of a word by:",
            options: [
              "Looking only at its first letter",
              "Guessing randomly",
              "Using how the word is used in the sentence and passage",
              "Ignoring the passage"
            ],
            correctIndex: 2,
            explanation:
              "Context clues around the word help determine its meaning."
          }
        ]
      },
      {
        id: "grade-11-strategy",
        title: "SAT Readiness Habits",
        tag: "Pacing and Process",
        summary:
          "Learn how to break questions apart, avoid panic, and move efficiently.",
        theory:
          "Students who know the material still struggle if they rush, freeze, or misread the task. This module teaches tactical habits: annotate the ask, estimate before solving, eliminate weak options, and move on when a problem is draining time.",
        outcomes: [
          "Use elimination before guessing",
          "Estimate before calculating",
          "Build a calm timed-work routine"
        ],
        checkpoints: [
          "Can identify what a question is asking",
          "Can rule out clearly wrong options",
          "Can recover after a mistake without spiraling"
        ],
        quiz: [
          {
            id: "g11h-1",
            prompt: "What is usually the best first move on a difficult multiple-choice question?",
            options: [
              "Panic and skip the entire test",
              "Eliminate obviously wrong choices",
              "Choose the longest answer immediately",
              "Ignore the wording"
            ],
            correctIndex: 1,
            explanation:
              "Elimination narrows the field and increases the chance of a strong decision."
          },
          {
            id: "g11h-2",
            prompt: "Why is estimation useful in SAT math?",
            options: [
              "It replaces all exact calculation",
              "It helps check whether an answer is reasonable",
              "It makes every answer negative",
              "It only matters in geometry"
            ],
            correctIndex: 1,
            explanation:
              "Estimation helps you catch unrealistic answers quickly."
          }
        ]
      }
    ]
  }
];

export function getLearnProgram(language: LearnProgramLanguage): LearnGrade[] {
  return language === "ru" ? LEARN_PROGRAM_RU : LEARN_PROGRAM;
}
