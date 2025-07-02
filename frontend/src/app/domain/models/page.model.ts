export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      ascending: boolean;
      descending: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    ascending: boolean;
    descending: boolean;
  };
  empty: boolean;
}
