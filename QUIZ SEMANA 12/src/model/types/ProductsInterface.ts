export interface ProductsInterface {
  _id: number | IDInterface;
  title: string;
  isbn?: string;
  pageCount: number;
  publishedDate?: PublishedDateInterface;
  thumbnailUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  status?: string;
  authors: string[];
  categories: string[];
  dateString?: string;
}

export interface PublishedDateInterface {
  $date: string;
}

export interface IDInterface {
  $oid: string;
}

export interface ToSearchInterface{
  [key: string]: string | undefined;
  longDescription?: string;
  shortDescription?: string;
}
