export type Island = {
  id: string;
  name: string;
  policy: string;
  qa: string;
  exams: string;
  lang: string;
};

export const ISLANDS: Island[] = [
  { id: "jm", name: "Jamaica", policy: "Ministry of Education", qa: "UCJ", exams: "CSEC · CAPE · PEP", lang: "Jamaican Creole" },
  { id: "tt", name: "Trinidad and Tobago", policy: "Ministry of Education", qa: "ACTT", exams: "CSEC · CAPE · SEA", lang: "Trinidadian Creole" },
  { id: "bb", name: "Barbados", policy: "Ministry of Educational Transformation", qa: "BAC", exams: "CSEC · CAPE", lang: "Bajan" },
  { id: "gy", name: "Guyana", policy: "Ministry of Education", qa: "NAC", exams: "CSEC · CAPE · NGSA", lang: "Guyanese Creole" },
  { id: "bs", name: "The Bahamas", policy: "Ministry of Education", qa: "NAECOB", exams: "BGCSE · BJC", lang: "Bahamian Creole" },
  { id: "bz", name: "Belize", policy: "Ministry of Education", qa: "National accreditation", exams: "CSEC · CAPE · PSE", lang: "Belizean Kriol" },
  { id: "oecs", name: "OECS states", policy: "OECS Education Strategy", qa: "National bodies", exams: "CSEC · CAPE", lang: "Kwéyòl" },
  { id: "ht", name: "Haiti", policy: "MENFP", qa: "National bodies", exams: "Bac haïtien", lang: "Kreyòl ayisyen" },
];

export const DEFAULT_ISLAND = ISLANDS[0];

export function findIsland(id: string | null | undefined): Island {
  return ISLANDS.find((i) => i.id === id) ?? DEFAULT_ISLAND;
}

// One sentence the AI routes can prepend so feedback follows the chosen country.
export function islandPromptContext(island: Island): string {
  return `The educator teaches in ${island.name}. Ground examples in that country: its ${island.policy}, quality assurance body (${island.qa}), examinations (${island.exams}), and home language (${island.lang}). Treat Caribbean English and ${island.lang} as legitimate languages of learning.`;
}
