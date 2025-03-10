// 'use strict';

// import { AudioAnalysis } from '@/interfaces/spotifyInterface';
// import { performSpotifySearch } from '@/utils/spotifyApi';

// /**
//  * Spotifyで曲を検索する関数
//  * @param query 検索クエリ（曲名）
//  * @param token Spotifyアクセストークン
//  * @returns 検索結果のオブジェクト
//  */
// interface SpotifySearchResponse {
//   tracks: {
//     items: Array;
//     href: string;
//     limit: number;
//     next: string | null;
//     offset: number;
//     previous: string | null;
//     total: number;
//   };
// }

// export const performSearch = async (
//   query: string,
//   offset: number = 0,
//   limit: number = 20,
//   token: string,
// ) => {
//   if (!query || !token) {
//     throw new Error('検索クエリまたはトークンが不足しています');
//   }

//   try {
//     console.log('検索開始:', { query, token: token.slice(0, 10) + '...' });

//     const data: SpotifySearchResponse = await performSpotifySearch(
//       query,
//       offset,
//       limit,
//       token,
//     );

//     if (!data?.tracks?.items) {
//       console.error('無効な検索結果:', data);
//       return [];
//     }

//     return data.tracks.items;
//   } catch (error) {
//     console.error('検索エラー:', error);
//     throw error;
//   }
// };

// export default performSearch;

// // トラック詳細取得関数
// export async function trackDetails(
//   id: string,
//   token?: string | null,
// ): Promise<AudioAnalysis> {
//   if (!token) {
//     throw new Error('アクセストークンがありません');
//   }

//   try {
//     const response = await fetch(
//       `https://api.spotify.com/v1/audio-analysis/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('トラック詳細取得エラー:', error);
//     return {} as AudioAnalysis;
//   }
// }
