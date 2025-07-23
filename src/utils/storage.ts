import type { FichaGoblin } from "../types/FichaGoblin";

const STORAGE_KEY = "fichas_goblins";

export function salvarFichas(fichas: FichaGoblin[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fichas));
}

export function carregarFichas(): FichaGoblin[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
