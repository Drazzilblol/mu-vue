import type { TTime } from "./General";

export type TCommentsResponse = {
  total_hits: number;
  page: number;
  per_page: number;
  results: TCommentsResult[];
};

export type TCommentsResult = {
  record: TComment;
  metadata: {
    author_series_rating: number;
    current_user_useful_rating: boolean;
  };
};

export type TComment = {
  id: number;
  series_id: number;
  subject: string;
  content: string;
  author: TCommentAuthor;
  useful: number;
  time_added: TTime;
  time_updated: TTime;
  admin: any; // TODO: Define proper type
};

export type TCommentAuthor = {
  user_info: TCommentUserInfo;
  name: string;
};

export type TCommentUserInfo = {
  user_id: number;
  username: string;
  url: string;
  avatar: {
    id: number;
    url: string;
    height: number;
    width: number;
  };
  time_joined: TTime;
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
