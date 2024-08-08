import { Key } from "react";

// интерфейс объекта репозитория
export interface Repository {
  id: Key;
  name: string;
  forkCount: number;
  stargazerCount: number;
  primaryLanguage: { language: string; color: string } | null;
  updatedAt: Date;
  languages: {
    nodes: [{ name: string; color: string }];
  };
  description: string | null;
  licenseInfo: { name: string } | null;
}

// интерфейс стора
export interface StoreStateReposType {
  repos: {
    selected: Repository;
    repositories: Repository[] | null;
    pending: boolean;
  };
}
