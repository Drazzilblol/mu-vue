export type TUser = {
  user_id: number;
  username: string;
  url: string;
  email: string;
  roles: any[];
  avatar: {
    id: number;
    url: string;
    extension: string;
    height: number;
    width: number;
  };
  time_joined: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
  last_active_time: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
  gender: string;
  birthday: {
    month: any;
    day: any;
    year: any;
    as_string: string;
    zodiac: any;
  };
  age: any;
  timezone: number;
  signature: any;
  location: any;
  forum_title: string;
  folding_at_home: boolean;
  flair: any;
  profile: {
    per_page: number;
    invisible: boolean;
    hide_birthday: boolean;
    hide_categories: boolean;
    filter_types: any[];
    upgrade: {
      requested: boolean;
      reason: any;
    };
    age18_verified: boolean;
  };
  stats: {
    forum_posts: number;
    added_authors: number;
    added_groups: number;
    added_publishers: number;
    added_releases: number;
    added_series: number;
  };
};
