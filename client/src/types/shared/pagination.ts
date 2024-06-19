export type Paginated<T> = {
  _embedded: {
    [key: string]: T[];
  };
  _links: Links;
  page: Page;
};

type Links = {
  self: Self;
  profile: Profile;
};

type Self = {
  href: string;
};

type Profile = {
  href: string;
};

type Page = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};
