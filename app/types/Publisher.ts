export type TPublisher = {
  publisher_id: number;
  name: string;
  url: string;
  associated: TPublisherAssociated[];
  type: EPublisherType;
  info: string;
  site: string;
  stats: {
    total_series: number;
    total_publications: number;
  };
  added_by: any; // TODO: Define proper type
  last_updated: any; // TODO: Define proper type
  admin: {
    approved: boolean;
  };
};

export type TPublisherAssociated = {
  name: string;
};

export type TPublisherPublicationsResponse = {
  series_list: TPublisherSeries[];
  publication_list: TPublisherPublication[];
};

export type TPublisherPublication = {
  publication_name: string;
  count: number;
};

export type TPublisherSeries = {
  title: string;
  series_id: number;
  url: string;
  year: string;
  last_updated: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
};

export enum EPublisherType {
  "N/A" = "N/A",
  "Japanese" = "Japanese",
  "English" = "English",
  "Korean" = "Korean",
  "Taiwanese" = "Taiwanese",
  "Chinese" = "Chinese",
  "Thai" = "Thai",
  "Indonesian" = "Indonesian",
  "Filipino" = "Filipino",
  "Vietnamese" = "Vietnamese",
  "Malaysian" = "Malaysian",
  "Nordic" = "Nordic",
  "French" = "French",
  "Spanish" = "Spanish",
  "Russian" = "Russian",
  "Polish" = "Polish",
  "Portuguese" = "Portuguese",
  "German" = "German",
  "Hindi" = "Hindi",
  "Arabic" = "Arabic",
}

export type TPublicationResponse = {
  publisher: TPublicationPublisher;
  series_list: TPublicationSeries[];
};

export type TPublicationSeries = {
  title: string;
  series_id: number;
  url: string;
  genres: string[];
  last_updated: {
    timestamp: number;
    as_rfc3339: string;
    as_string: string;
  };
};

export type TPublicationPublisher = {
  publisher_name: string;
  publisher_id: number;
  url: string;
};
