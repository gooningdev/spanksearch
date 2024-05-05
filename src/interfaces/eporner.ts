interface EpornerVideoThumbnail {
  height: number;
  width: number;
  src: string;
}

interface EpornerVideo {
  default_thumb: EpornerVideoThumbnail;
  id: string;
  thumbs: EpornerVideoThumbnail[];
  title: string;
  url: string;
}

export interface EpornerVideoSearchResponse {
  count: number;
  page: number;
  per_page: number;
  start: number;
  total_count: number;
  total_pages: number;
  videos: EpornerVideo[];
}
