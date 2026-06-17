"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// 1. Hardcoded Reading/Writing Questions
var readingQuestions = [
    {
        questionText: "While the ancient library of Alexandria is renowned for its vast collection, its destruction was ________, likely occurring over centuries rather than in a single catastrophic fire.",
        options: JSON.stringify(["clandestine", "gradual", "fortuitous", "immediate"]),
        correctAnswer: "gradual",
        explanation: "The phrase 'occurring over centuries rather than in a single catastrophic fire' indicates a slow process, making 'gradual' the correct word."
    },
    {
        questionText: "Despite his reputation for being ________, the CEO occasionally surprised his employees with grand gestures of generosity.",
        options: JSON.stringify(["magnanimous", "frugal", "gregarious", "innovative"]),
        correctAnswer: "frugal",
        explanation: "The word 'Despite' introduces a contrast to 'generosity.' 'Frugal' (sparing or economical) provides the necessary contrast."
    },
    {
        questionText: "In the 1920s, the Harlem Renaissance produced a remarkable outpouring of African American literature and art. ________, it fostered intellectual discussions about civil rights.",
        options: JSON.stringify(["However", "For example", "Furthermore", "Instead"]),
        correctAnswer: "Furthermore",
        explanation: "The second sentence adds another positive outcome of the Harlem Renaissance (fostering discussions), so 'Furthermore' logically connects the ideas."
    },
    {
        questionText: "The function of the heart is to pump blood throughout the body. The blood ________ oxygen to the body's cells.",
        options: JSON.stringify(["carry", "carries", "carrying", "have carried"]),
        correctAnswer: "carries",
        explanation: "The subject 'blood' is singular, so the singular verb 'carries' is required."
    },
    {
        questionText: "Walking through the dense forest, the ancient ruins were finally discovered by the archaeologists.",
        options: JSON.stringify([
            "NO CHANGE",
            "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.",
            "The ancient ruins were finally discovered by the archaeologists walking through the dense forest.",
            "The archaeologists finally discovered the ancient ruins walking through the dense forest."
        ]),
        correctAnswer: "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.",
        explanation: "The introductory modifier 'Walking through the dense forest' must be followed immediately by the noun performing the action (the archaeologists)."
    },
    {
        questionText: "Dr. Smith, ________ discovered the new species of beetle, is speaking at the conference tomorrow.",
        options: JSON.stringify(["who", "whom", "which", "that"]),
        correctAnswer: "who",
        explanation: "'Who' is the correct relative pronoun for a person acting as the subject of the dependent clause."
    },
    {
        questionText: "If the project is not completed by Friday, the client ________ the contract.",
        options: JSON.stringify(["cancel", "cancelled", "will cancel", "canceling"]),
        correctAnswer: "will cancel",
        explanation: "This is a first conditional sentence. The 'if' clause is present tense, so the main clause needs the future tense 'will cancel'."
    },
    {
        questionText: "Neither the manager nor the employees ________ aware of the updated security protocols.",
        options: JSON.stringify(["was", "were", "is", "has been"]),
        correctAnswer: "were",
        explanation: "In a 'neither/nor' construction, the verb agrees with the closer noun. 'Employees' is plural, so 'were' is correct."
    },
    {
        questionText: "The new software is ________ than the previous version, allowing users to complete tasks in half the time.",
        options: JSON.stringify(["more efficient", "most efficient", "efficienter", "efficiently"]),
        correctAnswer: "more efficient",
        explanation: "When comparing two things (new version vs. previous version), the comparative form 'more efficient' is used for adjectives with three or more syllables."
    },
    {
        questionText: "She has been studying Spanish ________ three years.",
        options: JSON.stringify(["since", "for", "during", "in"]),
        correctAnswer: "for",
        explanation: "'For' is used with a duration of time ('three years'). 'Since' would be used with a specific starting point (e.g., 'since 2020')."
    }
];
// 2. Programmatic Math Question Generators
// Generate ax + b = c
function generateLinearEquation() {
    var a = Math.floor(Math.random() * 8) + 2; // 2 to 9
    var x = Math.floor(Math.random() * 20) - 10; // -10 to 9
    var b = Math.floor(Math.random() * 20) - 10; // -10 to 9
    var c = a * x + b;
    var sign = b >= 0 ? '+' : '-';
    var displayB = Math.abs(b);
    var ans = x.toString();
    // Generate distractors
    var options = new Set();
    options.add(ans);
    while (options.size < 4) {
        var offset = Math.floor(Math.random() * 5) + 1;
        if (Math.random() > 0.5)
            offset *= -1;
        options.add((x + offset).toString());
    }
    var shuffledOptions = Array.from(options).sort(function () { return Math.random() - 0.5; });
    return {
        questionText: "If ".concat(a, "x ").concat(sign, " ").concat(displayB, " = ").concat(c, ", what is the value of x?"),
        options: JSON.stringify(shuffledOptions),
        correctAnswer: ans,
        explanation: "Subtract ".concat(b, " from both sides to get ").concat(a, "x = ").concat(c - b, ". Then divide by ").concat(a, " to get x = ").concat(x, ".")
    };
}
// Generate systems of equations: x + y = a, x - y = b -> what is x or y
function generateSystemOfEquations() {
    var x = Math.floor(Math.random() * 10) + 1;
    var y = Math.floor(Math.random() * 10) + 1;
    var a = x + y;
    var b = x - y;
    var askForX = Math.random() > 0.5;
    var ans = askForX ? x : y;
    var targetVar = askForX ? 'x' : 'y';
    var options = new Set();
    options.add(ans.toString());
    while (options.size < 4) {
        var offset = Math.floor(Math.random() * 6) + 1;
        options.add((ans + offset).toString());
        options.add((Math.abs(ans - offset)).toString());
    }
    // limit to 4
    var finalOpts = Array.from(options).slice(0, 4).sort(function () { return Math.random() - 0.5; });
    return {
        questionText: "Given the system of equations:\nx + y = ".concat(a, "\nx - y = ").concat(b, "\nWhat is the value of ").concat(targetVar, "?"),
        options: JSON.stringify(finalOpts),
        correctAnswer: ans.toString(),
        explanation: "Adding the two equations gives 2x = ".concat(a + b, ", so x = ").concat((a + b) / 2, ". Subtracting the second from the first gives 2y = ").concat(a - b, ", so y = ").concat((a - b) / 2, ". The value of ").concat(targetVar, " is ").concat(ans, ".")
    };
}
// Generate quadratic equations: (x - r1)(x - r2) = x^2 - (r1+r2)x + r1r2 = 0
function generateQuadraticEquation() {
    var r1 = Math.floor(Math.random() * 10) - 5; // -5 to 4
    var r2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    var b = -(r1 + r2);
    var c = r1 * r2;
    var bStr = b === 1 ? '+' : (b === -1 ? '-' : (b > 0 ? "+ ".concat(b) : "- ".concat(Math.abs(b))));
    var cStr = c > 0 ? "+ ".concat(c) : "- ".concat(Math.abs(c));
    var ans = "".concat(Math.min(r1, r2), " and ").concat(Math.max(r1, r2));
    var options = new Set();
    options.add(ans);
    while (options.size < 4) {
        var w1 = r1 + Math.floor(Math.random() * 4) + 1;
        var w2 = r2 - Math.floor(Math.random() * 4) - 1;
        options.add("".concat(Math.min(w1, w2), " and ").concat(Math.max(w1, w2)));
    }
    var finalOpts = Array.from(options).slice(0, 4).sort(function () { return Math.random() - 0.5; });
    return {
        questionText: "What are the solutions to the equation x\u00B2 ".concat(bStr, "x ").concat(cStr, " = 0?"),
        options: JSON.stringify(finalOpts),
        correctAnswer: ans,
        explanation: "Factor the quadratic to (x - ".concat(r1, ")(x - ").concat(r2, ") = 0. Setting each factor to 0 gives x = ").concat(r1, " and x = ").concat(r2, ".")
    };
}
// Generate percentages: a% of b is c
function generatePercentage() {
    var isFindingPercent = Math.random() > 0.5;
    if (isFindingPercent) {
        var percent = (Math.floor(Math.random() * 10) + 1) * 5; // 5 to 50%
        var whole = (Math.floor(Math.random() * 20) + 2) * 10; // 20 to 210
        var part = (percent / 100) * whole;
        var ans = percent.toString() + "%";
        var options = new Set();
        options.add(ans);
        options.add((percent + 5) + "%");
        options.add((percent - 5) + "%");
        options.add((percent * 2) + "%");
        options.add((percent / 2) + "%");
        var finalOpts = Array.from(options).slice(0, 4).sort(function () { return Math.random() - 0.5; });
        return {
            questionText: "If ".concat(part, " is what percent of ").concat(whole, "?"),
            options: JSON.stringify(finalOpts),
            correctAnswer: ans,
            explanation: "Divide the part by the whole: ".concat(part, " / ").concat(whole, " = ").concat(percent / 100, ". Multiply by 100 to get ").concat(percent, "%.")
        };
    }
    else {
        var percent = (Math.floor(Math.random() * 15) + 1) * 10; // 10 to 150%
        var whole = (Math.floor(Math.random() * 10) + 2) * 50; // 100 to 550
        var part = (percent / 100) * whole;
        var ans = part.toString();
        var options = new Set();
        options.add(ans);
        options.add((part * 1.1).toFixed(0).toString());
        options.add((part * 0.9).toFixed(0).toString());
        options.add((part + 10).toString());
        options.add((part - 10).toString());
        var finalOpts = Array.from(options).slice(0, 4).sort(function () { return Math.random() - 0.5; });
        return {
            questionText: "What is ".concat(percent, "% of ").concat(whole, "?"),
            options: JSON.stringify(finalOpts),
            correctAnswer: ans,
            explanation: "Convert the percentage to a decimal (".concat(percent / 100, ") and multiply by ").concat(whole, ": ").concat(percent / 100, " * ").concat(whole, " = ").concat(part, ".")
        };
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var allQuestions, i, i, i, i, inserted, _i, allQuestions_1, q;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Generating 100+ SAT questions...');
                    return [4 /*yield*/, prisma.question.deleteMany()];
                case 1:
                    _a.sent();
                    allQuestions = __spreadArray([], readingQuestions, true);
                    // Add 40 linear equations
                    for (i = 0; i < 40; i++) {
                        allQuestions.push(generateLinearEquation());
                    }
                    // Add 20 systems of equations
                    for (i = 0; i < 20; i++) {
                        allQuestions.push(generateSystemOfEquations());
                    }
                    // Add 20 quadratic equations
                    for (i = 0; i < 20; i++) {
                        allQuestions.push(generateQuadraticEquation());
                    }
                    // Add 15 percentage questions
                    for (i = 0; i < 15; i++) {
                        allQuestions.push(generatePercentage());
                    }
                    console.log("Prepared ".concat(allQuestions.length, " unique questions. Seeding to Database..."));
                    inserted = 0;
                    _i = 0, allQuestions_1 = allQuestions;
                    _a.label = 2;
                case 2:
                    if (!(_i < allQuestions_1.length)) return [3 /*break*/, 5];
                    q = allQuestions_1[_i];
                    return [4 /*yield*/, prisma.question.create({
                            data: q
                        })];
                case 3:
                    _a.sent();
                    inserted++;
                    if (inserted % 20 === 0) {
                        console.log("Inserted ".concat(inserted, "/").concat(allQuestions.length));
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("\u2705 Successfully seeded ".concat(inserted, " practice questions!"));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
