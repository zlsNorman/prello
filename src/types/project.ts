export interface Project {
  id?: number;
  title: string;
  language?: Language[];
  description: string;
  dateFrom?: Date;
  dateTo?: Date;
  author?: string;
  url?: string;
}

export interface Language {
  id?: number;
  title: string;
}

export interface Board {
  board: [];
}
