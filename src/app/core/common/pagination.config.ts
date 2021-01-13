export class PageConfig {
  //The number of elements in the page
  pageSize: number = 50;
  //The total number of elements
  totalElements: number = 0;
  //The total number of pages
  totalPages: number = 0;
  //The current page number
  pageNumber: number = 1;

  sizeOptions: any[] = [10, 25, 50];
}

export function buildPageConfig(size: number): PageConfig {
  let page = new PageConfig();
  page.pageSize = size;

  return page;
}
