/* eslint-disable indent */
import { type } from "os";

export interface Project {
  id?: number;
  title: string;
  language?: Language[];
  description: string;
  "range-date-picker"?: Date[];
  author?: string;
  url?: string;
  status: StatusType;
}
export interface formProject {
  id?: number;
  title: string;
  language?: string[];
  description: string;
  "range-date-picker"?: Date[];
  author?: string;
  url?: string;
  status: StatusType;
}

export interface Language {
  id?: number;
  title: string;
  backgroundColor?: string;
}

export interface Status {
  id?: number;
  status: StatusType;
  backgroundColor?: string;
}

export interface Board {
  board: [];
}

export type StatusType = "onhold" | "ongoing" | "finished" | "";

export const createProjectObject = (
  inputvalues: formProject,
  supportedLanguages: Language[]
): Project => {
  const { language, ...rest } = inputvalues;
  return language
    ? {
        ...rest,
        language: language
          .map((lang) =>
            supportedLanguages.find((supLang) => supLang.title === lang)
          )
          .filter((el) => el) as Language[],
      }
    : rest;
};
