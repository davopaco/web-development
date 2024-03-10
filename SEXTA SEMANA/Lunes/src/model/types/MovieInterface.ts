export interface MovieStarwars {
  titleResults: TitleResults;
}

export interface RImageModel {
  url: string;
}

export interface TitleResults {
  results: TitleResultsResult[];
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
