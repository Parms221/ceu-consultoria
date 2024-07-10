export interface PageParams {
  page: number;
  size: number;
  meta?: any;
}

export interface Paginate<T> {
  statusCode: number | undefined;
  message: string;
  content: T[];
  page: Meta;
}

export interface Meta {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export function GetPageQueries(params: PageParams): string {
  let query = `?pageNo=${params.page}&pageSize=${params.size}`;

  if (params.meta) {
    const metaKey = Object.keys(params.meta);
    metaKey.forEach(
      (key) => {
        query += `&${key}=${params.meta[key]}`;
      }
    );
  }

  return query;

}