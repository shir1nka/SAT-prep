import { getDomain, getDomains, SECTIONS, SECTION_ORDER } from "./domains";
import { ENGLISH_TOPICS } from "./english";
import { MATH_TOPICS } from "./math";
import type { LearnSectionId, Topic } from "./types";

export * from "./types";
export { DOMAINS, SECTIONS, SECTION_ORDER, getDomain, getDomains } from "./domains";

export const ALL_TOPICS: Topic[] = [...ENGLISH_TOPICS, ...MATH_TOPICS];

export function getSectionTopics(section: LearnSectionId) {
  return section === "math" ? MATH_TOPICS : ENGLISH_TOPICS;
}

export function getTopic(section: LearnSectionId, topicId: string) {
  return getSectionTopics(section).find((topic) => topic.id === topicId);
}

export function getSectionStats(section: LearnSectionId) {
  const topics = getSectionTopics(section);
  return {
    topics: topics.length,
    minutes: topics.reduce((total, topic) => total + topic.minutes, 0),
    questions: topics.reduce((total, topic) => total + topic.practice.length, 0),
  };
}

export function getDomainTopics(section: LearnSectionId, domainId: string) {
  return getSectionTopics(section)
    .filter((topic) => topic.domainId === domainId)
    .sort((a, b) => a.order - b.order);
}

export function getTopicNeighbours(section: LearnSectionId, topicId: string) {
  const topics = getSectionTopics(section);
  const index = topics.findIndex((topic) => topic.id === topicId);
  return {
    previous: index > 0 ? topics[index - 1] : null,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : null,
  };
}

export function getDomainName(domainId: string) {
  return getDomain(domainId)?.title.en ?? domainId;
}

export const TOTAL_STATS = {
  topics: ALL_TOPICS.length,
  mathTopics: MATH_TOPICS.length,
  englishTopics: ENGLISH_TOPICS.length,
  questions: ALL_TOPICS.reduce((total, topic) => total + topic.practice.length, 0),
  minutes: ALL_TOPICS.reduce((total, topic) => total + topic.minutes, 0),
};

export { SECTIONS as LEARN_SECTIONS };
