import type { TTime } from "./General";

export type TReleaseByDayResponse = {
  total_hits: number;
  page: number;
  per_page: number;
  results: TReleaseByDayResult[];
};

export type TReleaseByDayResult = {
  record: TReleaseByDay;
  metadata?: any;
};

export type TReleaseByDay = {
  id: number;
  title: string;
  volume: string;
  chapter: string;
  groups: TReleaseByDayGroup[];
  release_date: string;
  time_added: TTime;
};

export type TReleaseByDayGroup = {
  name: string;
  group_id: number;
  url: string;
};
