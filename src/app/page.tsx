// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Carousel, CarouselSlide } from '@yamada-ui/carousel';
// import { Box, Typography, Button, Container } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { useToken } from '@/utils/context/tokenContext';
// import { performSearch, trackDetails } from '@/app/api/spotify/search/search';
// import {
//   type SearchResult,
//   type TrackItem,
//   type AudioAnalysis,
// } from '@/interfaces/spotifyInterface';
// import { SearchForm } from './components/SearchForm';
// import { TrackCard } from './components/TrackCard';
// import cookie from 'js-cookie';

// export default function Home() {
//   // 修正: TokenContextから正しいプロパティを取得
//   const { accessToken, AccessToken } = useToken();
//   const [track, setTrack] = useState<SearchResult | undefined>(undefined);
//   const [data, setData] = useState<AudioAnalysis[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   console.log('Current accessToken in component:', accessToken);
//   const cookieToken = cookie.get('access_token');
//   if (cookieToken) {
//     AccessToken(cookieToken);
//   }
//   // トークン取得
//   useEffect(() => {
//     // アクセストークンがすでに存在する場合は何もしない
//     if (accessToken) {
//       console.log(
//         'Token already exists:',
//         accessToken.substring(0, 10) + '...',
//       );
//       return;
//     }

//     // ローカルストレージを確認
//     const storedToken = localStorage.getItem('access_token');
//     if (storedToken) {
//       console.log('Using token from localStorage');
//       AccessToken(storedToken);
//       return;
//     }

//     // APIからトークン取得
//     console.log('Fetching new token from API...');
//     setIsLoading(true);

//     fetch('/api/cookies', {
//       method: 'GET',
//       credentials: 'include',
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch token');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.access_token) {
//           console.log('Got token from API');
//           AccessToken(data.access_token);
//         } else {
//           console.warn('No token in API response', data.access_token);
//         }
//       })
//       .catch((error) => {
//         console.error('Token fetch error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [accessToken, AccessToken]); // accessToken が変わった時のみ実行

//   // accessTokenの変更を検出
//   useEffect(() => {
//     console.log('Token changed:', accessToken);

//     // ローカルストレージからも確認
//     if (typeof window !== 'undefined') {
//       const storedToken = localStorage.getItem('spotify_access_token');
//       console.log('Token in localStorage:', storedToken ? 'exists' : 'none');
//     }
//   }, [accessToken]);

//   // 検索処理
//   const handleSearch = async (search: string) => {
//     if (!accessToken) {
//       console.error('No access token available');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       console.log(
//         `Searching for "${search}" with token: ${accessToken.substring(0, 10)}...`,
//       );

//       const res = await performSearch(search, accessToken);
//       console.log('Search results:', res);
//       setTrack(res);

//       if (res?.tracks?.items?.length > 0) {
//         const datas = await Promise.all(
//           res.tracks.items.map(async (item: TrackItem) => {
//             return await trackDetails(item.id, accessToken);
//           }),
//         );
//         setData(datas);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ログインリダイレクト
//   const handleRedirect = () => {
//     router.push('/api/spotify/login');
//   };

//   // レンダリング部分
//   return (
//     <Container maxWidth='xl' sx={{ mt: 8, mb: 8 }}>
//       <Typography variant='h2' component='h1' align='center' gutterBottom>
//         Welcome to Nexfy!!
//       </Typography>

//       {!cookieToken ? (
//         <Box textAlign='center' mt={4}>
//           {isLoading ? (
//             <Typography variant='body1'>Loading...</Typography>
//           ) : (
//             <>
//               <Typography variant='body1' gutterBottom>
//                 Please click below to Start
//               </Typography>
//               <Button variant='contained' onClick={handleRedirect}>
//                 Start to Spotify System
//               </Button>
//             </>
//           )}
//         </Box>
//       ) : (
//         <>
//           <SearchForm onSearch={handleSearch} />
//           {isLoading ? (
//             <Box textAlign='center' mt={4}>
//               <Typography variant='body1'>Searching tracks...</Typography>
//             </Box>
//           ) : (
//             <Carousel
//               slideSize='33%'
//               withControls={false}
//               mt={8}
//               mb={4}
//               pb={4}
//               autoplay
//               delay={5000}
//               height={'auto'}
//               gap={5}
//               dragFree>
//               {track?.tracks?.items
//                 .slice(0, data.length)
//                 .map((item: TrackItem, index: number) => (
//                   <CarouselSlide
//                     key={index}
//                     as={Box}
//                     style={{ padding: '10px' }}>
//                     <TrackCard item={item} data={data[index]} />
//                   </CarouselSlide>
//                 ))}
//             </Carousel>
//           )}
//         </>
//       )}
//     </Container>
//   );
// }
