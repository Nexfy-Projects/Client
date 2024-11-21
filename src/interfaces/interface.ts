export interface ExternalUrl {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Array<{
    height: number;
    width: number;
    url: string;
  }>;
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface TrackItem {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

export interface Tracks {
  map(
    arg0: (item: TrackItem, index: number) => import("react").JSX.Element,
  ): import("react").ReactNode;
  href: string;
  items: TrackItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SearchResult {
  tracks: Tracks; // 修正: tracksの型をTracksに変更
}
