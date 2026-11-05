import type { Topic } from "../types";
import { CONVENTIONS_TOPICS } from "./conventions";
import { CRAFT_TOPICS } from "./craft";
import { EXPRESSION_TOPICS } from "./expression";
import { INFORMATION_TOPICS } from "./information";

export const ENGLISH_TOPICS: Topic[] = [
  ...INFORMATION_TOPICS,
  ...CRAFT_TOPICS,
  ...EXPRESSION_TOPICS,
  ...CONVENTIONS_TOPICS,
].sort((a, b) => a.order - b.order);
