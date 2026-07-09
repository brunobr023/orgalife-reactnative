export interface Meta {
  id: string; // TEXT/UUID
  title: string;
  sincronizado: number; // 0 para falso, 1 para verdadeiro no SQLite
}