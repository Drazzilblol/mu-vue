import type { TTime } from "./General";

export type TReleaseByDayResponse = {
  total_hits: number;
  page: number;
  per_page: number;
  results: TReleaseByDayResult[];
};

export type TReleaseByDayResult = {
  record: TRelease;
  metadata?: any;
};

export type TReleaseSearchResponse = {
  results: { record: TRelease; metadata?: any }[];
  total_hits: number;
  page: number;
  per_page: number;
};

export type TRelease = {
  id: number;
  title: string;
  volume: string;
  chapter: string;
  groups: TReleaseGroup[];
  release_date: string;
  time_added: TTime;
  meta?: any;
};

export type TReleaseGroup = {
  name: string;
  group_id: number;
  url: string;
};
