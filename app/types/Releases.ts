import type { TRequestMeta, TSeriesMeta, TTime } from "./General";
import type { TSeries } from "./Series";

export type TReleaseByDayResponse = {
  total_hits: number;
  page: number;
  per_page: number;
  results: TReleaseByDayResult[];
};

export type TReleaseByDayResult = {
  record: TRelease;
  metadata?: TRequestMeta;
};

export type TReleaseSearchResponse = {
  results: { record: TRelease; metadata?: TRequestMeta }[];
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
  metadata?: TSeriesMeta | TSeries;
};

export type TReleaseGroup = {
  name: string;
  group_id: number;
  url: string;
};
