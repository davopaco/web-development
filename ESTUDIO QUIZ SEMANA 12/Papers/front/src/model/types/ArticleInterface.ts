// Define la interfaz de los artículos
export interface Articles {
  papers: Papers[];
}

//Define la interfaz de los papers
export interface Papers {
  _pt: string;
  _abstract: string;
  _annote: string;
  _author: string;
  _doi?: string;
  _issn?: string;
  _journal?: string;
  _keywords: string | string[];
  _month?: string;
  _pages?: string;
  _publisher?: string;
  _title: string;
  _url?: string;
  _volume?: string;
  _year: string;
  _id: string;
  booktitle?: string;
  editor?: string;
  _number?: string;
  isbn?: string;
}

//Define la interfaz para las keywords y su cantidad.
export interface KeywordsQuantityInterface {
  keyword: string;
  quantity: number;
}
