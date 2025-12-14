import type { TGenre, TImage } from "./General";

export type TAuthor = {
  id: number;
  name: string;
  url: string;
  associated: [{ name: string }];
  image: TImage;
  actualname: string;
  birthday: {
    month: number;
    day: number;
    year: number;
    as_string: string;
    zodiac: string;
  };
  birthplace: string;
  bloodtype: EAuthorBloodType;
  gender: EAuthorGender;
  status: EAuthorStatus;
  status_date: {
    month: number;
    day: number;
    year: number;
    as_string: string;
  };
  genres: string[];
  stats: {
    total_series: number;
  };
  social: TSocial;
  comments: string;
  last_updated: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
  added_by: any; // TODO: Define proper type
  admin: {
    approved: true;
  };
};

export type TSocial = {
  officialsite: string;
  facebook: string;
  twitter: string;
};

export type TAuthorSeriesResponse = {
  total_series: 0;
  series_list: TAuthorSeries[];

  genre_list: TGenre[];
};

export type TAuthorSeries = {
  title: string;
  series_id: number;
  url: string;
  year: string;
  last_updated: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
  genres: string[];
  metadata: any;
};

export enum EAuthorBloodType {
  "N/A" = "N/A",
  "A" = "A",
  "B" = "B",
  "AB" = "AB",
  "O" = "O",
}

export enum EAuthorGender {
  "N/A" = "N/A",
  "Male" = "Male",
  "Female" = "Female",
  "Other" = "Other",
}
export enum EAuthorStatus {
  "N/A" = "N/A",
  "Active" = "Active",
  "Temporarily Inactive" = "Temporarily Inactive",
  "Retired" = "Retired",
  "Deceased" = "Deceased",
}
