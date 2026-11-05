import type { Topic } from "../types";
import { ADVANCED_TOPICS } from "./advanced";
import { ALGEBRA_TOPICS } from "./algebra";
import { DATA_TOPICS } from "./data";
import { GEOMETRY_TOPICS } from "./geometry";

export const MATH_TOPICS: Topic[] = [
  ...ALGEBRA_TOPICS,
  ...ADVANCED_TOPICS,
  ...DATA_TOPICS,
  ...GEOMETRY_TOPICS,
].sort((a, b) => a.order - b.order);
