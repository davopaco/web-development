export interface MovieStarwars {
  titleResults: TitleResults;
}

export interface RImageModel {
  url: string;
  maxHeight: number;
  maxWidth: number;
  caption: string;
}

export interface TitleResults {
  results: TitleResultsResult[];
  nextCursor: string;
  hasExactMatches: boolean;
}

export interface TitleResultsResult {
  id: string;
  titleNameText: string;
  titleReleaseText: string;
  titleTypeText: string;
  titlePosterImageModel: RImageModel;
  topCredits: string[];
  imageType: string;
}
