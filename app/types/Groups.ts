import type { TCategory, TGenre, TSeriesMeta, TTime } from "./General";
import type { TSeries } from "./Series";

export type TGroup = {
  group_id: number;
  name: string;
  url: string;
  associated: [
    {
      name: string;
    }
  ];
  social: TGroupSocial;
  active: true;
  notes: string;
  added_by: any; // TODO: Define proper type
  admin: any; // TODO: Define proper type
};

export type TGroupSocial = {
  site: string;
  facebook: string;
  twitter: string;
  irc: {
    channel: string;
    server: string;
  };
  forum: string;
  discord: string;
};

export type TGroupSeriesResponse = {
  release_frequency: string;
  series_titles: TGroupSeriesTitle[];
  series_genres: TGenre[];
  series_categories: TCategory[];
};

export type TGroupSeriesTitle = {
  title: string;
  series_id: number;
  url: string;
  last_updated: TTime;
  metadata: TSeriesMeta | TSeries;
};
