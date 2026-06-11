import type { TSeriesMeta } from "./General";
import type { TSeries } from "./Series";

export type TUserListRecord = {
  series: {
    id: number;
    url: string;
    title: string;
  };
  list_id: number;
  status: {
    volume: number;
    chapter: number;
  };
  priority: number;
  time_added: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
};
export type TUserListMetadata = {
  series: {
    bayesian_rating: number;
    latest_chapter: number;
    last_updated: {
      timestamp: number;
      as_rfc3339: string;
      as_string: string;
    };
  };
  user_rating: any;
};

export type TUserListResult = {
  record: TUserListRecord;
  metadata: TUserListMetadata;
  seriesMetadata: TSeriesMeta | TSeries;
};

export type TUserList = {
  list_id: number;
  title: string;
  description: string;
  type: string;
  icon: string;
  custom: boolean;
};

export type TUserListItems = {
  page: number;
  perpage: number;
  totalHits?: number;
  results?: TUserListResult[];
};

export type TUserListsItems = Record<string, TUserListItems>;
export type TUserLists = Record<string, TUserList>;
