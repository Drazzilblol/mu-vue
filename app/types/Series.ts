import type { TGenre, TImage } from "./General";

export type TSeries = {
  series_id: number;
  title: string;
  url: string;
  associated: TAssociated[];
  description: string;
  image: TImage;
  type: ESeriesType;
  year: string;
  bayesian_rating: number;
  rating_votes: number;
  genres: TGenre[];
  categories: TCategory[];
  latest_chapter: number;
  forum_id: number;
  status: string;
  licensed: boolean;
  completed: boolean;
  anime: TAnime;
  related_series: TRelatedSeries[];
  authors: TAuthor[];
  publishers: TPublisher[];
  publications: TPublication[];
  recommendations: TRecommendation[];
  category_recommendations: TRecommendation[];
  rank: TRank;
  last_updated: TLastUpdated;
  admin: {
    added_by: {
      user_id: number;
      username: string;
      url: string;
      avatar: {
        id: number;
        url: string;
        height: number;
        width: number;
      };
      time_joined: {
        timestamp: number;
        as_rfc3339: string;
        as_string: string;
      };
      signature: string;
      forum_title: string;
      folding_at_home: boolean;
      profile: {
        upgrade: {
          requested: boolean;
          reason: string;
        };
      };
      stats: {
        forum_posts: number;
        added_authors: number;
        added_groups: number;
        added_publishers: number;
        added_releases: number;
        added_series: number;
      };
      user_group: string;
      user_group_name: string;
    };
    approved: boolean;
  };
};

export type TLastUpdated = {
  timestamp: number;
  as_rfc3339: string;
  as_string: string;
};

export type TRank = {
  position: TPosition;
  old_position: TPosition;
  lists: {
    reading: number;
    wish: number;
    complete: number;
    unfinished: number;
    custom: number;
  };
};

export type TPosition = {
  week: number;
  month: number;
  three_months: number;
  six_months: number;
  year: number;
};

export type TRecommendation = {
  series_name: string;
  series_url: string;
  series_id: number;
  series_image: TImage;
  weight: number;
};

export type TCategory = {
  series_id: number;
  category: string;
  votes: number;
  votes_plus: number;
  votes_minus: number;
  added_by: number;
};

export type TAuthor = {
  name: string;
  author_id: number;
  url: string;
  type: EAuthorType;
};

export type TPublisher = {
  publisher_name: string;
  publisher_id: string;
  url: string;
  type: EPublisherType;
  notes: string;
};

export type TPublication = {
  publication_name: string;
  publisher_name: string;
  publisher_id: string;
};

export type TRelatedSeries = {
  relation_id: number;
  relation_type: ERelationType;
  related_series_id: number;
  related_series_name: string;
  related_series_url: string;
  triggered_by_relation_id: number;
};

export type TAnime = {
  start: string;
  end: string;
};

export type TAssociated = {
  title: string;
};

export type TGroups = {
  group_list: TGroup[];
  release_list: TRelease[];
};

export type TGroup = {
  group_id: number;
  name: string;
  url: string;
  active: boolean;
  notes: string;
  social: {
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
  added_by: any; // add type later if needed
};

export type TRelease = {
  id: number;
  title: string;
  volume: string;
  chapter: string;
  groups: [
    {
      name: string;
      group_id: number;
      url: string;
    }
  ];
  release_date: string;
  time_added: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
};

export type TUserRating = {
  average_rating: number;
  rainbow: TRatingRainbow[];
};

export type TRatingRainbow = {
  rating: number;
  count: number;
};

export enum ESeriesType {
  Artbook = "Artbook",
  Doujinshi = "Doujinshi",
  DramaCD = "Drama CD",
  Filipino = "Filipino",
  Indonesian = "Indonesian",
  Manga = "Manga",
  Manhwa = "Manhwa",
  Manhua = "Manhua",
  Novel = "Novel",
  OEL = "OEL",
  Thai = "Thai",
  Vietnamese = "Vietnamese",
  Malaysian = "Malaysian",
  Nordic = "Nordic",
  French = "French",
  Spanish = "Spanish",
  German = "German",
}

export enum EPublisherType {
  Original = "Original",
  English = "English",
}

export enum ERelationType {
  Prequel = "Prequel",
  Sequel = "Sequel",
  SpinOff = "Spin-Off",
  AdaptedFrom = "Adapted From",
  AlternateVersion = "Alternate Version",
  PartOfAnthology = "Part of Anthology",
  MainStory = "Main Story",
  SideStory = "Side Story",
  FullAnthology = "Full Anthology",
  Other = "Other",
}

export enum EAuthorType {
  Author = "Author",
  Artist = "Artist",
}
