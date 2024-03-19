export default interface searchingFunctionalitiesInterface {
  searchBar(
    parameter: string,
    input: HTMLInputElement,
    articles: string[]
  ): string[];

  filterByKeyword(
    articles: string[],
    parameter: string,
    filter: HTMLInputElement,
    radio: NodeListOf<HTMLInputElement>
  ): string[];
}
