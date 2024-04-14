// Define la interfaz de la película
export interface MovieInterface {
  rank: number;
  title: string;
  description: string;
  image: string;
  genre: string[];
  rating: string;
  id: string;
  year: number;
}

export interface ToSearchInterface {
  [key: string]: string | string[];
  title: string;
  description: string;
  genre: string[];
  year: string;
}
