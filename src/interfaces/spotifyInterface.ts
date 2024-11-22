// 曲検索情報
////////////////////////////////////////////////////////////////////////////////////////////////////
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

// 曲詳細情報
////////////////////////////////////////////////////////////////////////////////////////////////////
interface Meta {
  analyzer_version: string;
  platform: string;
  detailed_status: string;
  status_code: number;
  timestamp: number;
  analysis_time: number;
  input_process: string;
}

interface Track {
  num_samples: number;
  duration: number;
  sample_md5: string;
  offset_seconds: number;
  window_seconds: number;
  analysis_sample_rate: number;
  analysis_channels: number;
  end_of_fade_in: number;
  start_of_fade_out: number;
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
  key: number;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  codestring: string;
  code_version: number;
  echoprintstring: string;
  echoprint_version: number;
  synchstring: string;
  synch_version: number;
  rhythmstring: string;
  rhythm_version: number;
}

interface Timing {
  start: number;
  duration: number;
  confidence: number;
}

interface Section extends Timing {
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  key: number;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
}

interface Segment extends Timing {
  loudness_start: number;
  loudness_max: number;
  loudness_max_time: number;
  loudness_end: number;
  pitches: number[];
  timbre: number[];
}

export interface AudioAnalysis {
  meta: Meta;
  track: Track;
  bars: Timing[];
  beats: Timing[];
  sections: Section[];
  segments: Segment[];
  tatums: Timing[];
}
