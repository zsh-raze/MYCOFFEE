import { en, type Content } from "./en";

// Languages offered by the toggle. With a single entry the toggle is hidden automatically.
// To add a second language: create e.g. ko.ts (`export const ko: Content = { … }`, translating every
// key — flag it for client sign-off if machine-translated), then add it to both maps below.
export const DICTS = { en } satisfies Record<string, Content>;

export type Lang = keyof typeof DICTS;

export const LANG_LABELS: Record<Lang, string> = { en: "EN" };

export const DEFAULT_LANG: Lang = "en";
