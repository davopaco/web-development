import { Papers } from "./ArticleInterface";

//Define la interfaz de las funciones de búsqueda
export interface searchingFunctionalitiesInterface {
  searchBar(input: string, articles: Papers[]): Papers[];
  filterByKeyword(keywords: string[], articles: Papers[]): Papers[];
}

//Define la interfaz de los parámetros de búsqueda
export interface toSearchInterface {
  [key: string]: string;
  title: string;
  authors: string;
  abstract: string;
  year: string;
}
