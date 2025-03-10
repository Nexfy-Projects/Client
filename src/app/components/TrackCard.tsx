// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Alert,
//   CircularProgress,
//   Grid,
//   Button,
// } from '@mui/material';
// import { Flex } from '@yamada-ui/react';
// import { TrackItem, AudioAnalysis } from '@/interfaces/spotifyInterface';
// import { pitchToNote } from '@/functions/spotify/pitchToNote';
// import { popularity } from '@/functions/spotify/popularity';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// import SearchIcon from '@mui/icons-material/Search';
// import { PlaylistDrawer } from './PlaylistDrawer';
// import performSearch from '@/app/api/spotify/search/search';

// interface TrackCardProps {
//   item: TrackItem;
//   data: AudioAnalysis;
// }

// interface SearchResult {
//   id: string;
//   name: string;
//   artist: string;
//   albumArt?: string;
// }

// export const TrackCard: React.FC<TrackCardProps> = ({ item, data }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [maxWidth, setMaxWidth] = useState(300);
//   const [minWidth, setMinWidth] = useState(300);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 430) {
//         setMinWidth(268);
//         setMaxWidth(268);
//       } else {
//         setMinWidth(300);
//         setMaxWidth(425);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [setMaxWidth]);

//   useEffect(() => {
//     // 保存された検索結果を読み込む
//     const savedResults = sessionStorage.getItem(`search_${item.id}`);
//     if (savedResults) {
//       try {
//         setSearchResults(JSON.parse(savedResults));
//       } catch (e) {
//         console.error('保存された検索結果を解析できませんでした:', e);
//       }
//     }
//   }, [item.id]);

//   const handlePlaylistAdd = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDrawerOpen(true);
//   };

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('spotify_access_token');
//       if (!token) {
//         throw new Error('認証が必要です');
//       }

//       const results = await performSearch(item.name, token);

//       if (Array.isArray(results)) {
//         setSearchResults(results);
//       } else {
//         throw new Error('検索結果の形式が不正です');
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setError(
//         error instanceof Error ? error.message : '検索中にエラーが発生しました',
//       );
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Card
//         style={{
//           width: '100%',
//           maxWidth: `${maxWidth}px`,
//           minWidth: `${minWidth}px`,
//           marginBottom: '20px',
//           backgroundColor: 'gray',
//           borderRadius: '1.5rem',
//         }}>
//         <CardContent>
//           <Box
//             sx={{
//               width: '100%',
//               maxHeight: '30rem',
//               overflow: 'hidden',
//               position: 'relative',
//             }}>
//             <a
//               href={item.album.uri}
//               style={{
//                 display: 'block',
//                 width: '100%',
//                 position: 'relative',
//                 aspectRatio: '1/1',
//               }}>
//               <Image
//                 src={item.album.images[0].url}
//                 alt={item.name}
//                 fill
//                 sizes='(max-width: 430px) 268px, 300px'
//                 style={{
//                   objectFit: 'cover',
//                   borderRadius: '10%',
//                   margin: '0 auto',
//                 }}
//               />
//             </a>
//             <IconButton
//               onClick={handlePlaylistAdd}
//               sx={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: 'rgba(0,0,0,0.5)',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: 'rgba(0,0,0,0.7)',
//                 },
//               }}>
//               <PlaylistAddIcon />
//             </IconButton>
//             <Typography
//               variant='h6'
//               sx={{
//                 maxWidth: '60%',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//                 fontWeight: 'bold',
//                 mt: 2,
//               }}>
//               <a href={item.album.uri}>{item.name}</a>
//             </Typography>
//             <Typography
//               variant='body2'
//               color='text.secondary'
//               sx={{
//                 maxWidth: '60%',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//               }}>
//               <a href={item.artists[0].external_urls.spotify}>
//                 {item.artists[0].name}
//               </a>
//             </Typography>
//           </Box>
//           <Box borderBottom={'1px solid black'} margin={'10px 0'} />
//           <Flex justifyContent={'space-between'} marginBottom={8}>
//             <Box>
//               <Typography variant='body2' color='black'>
//                 BPM
//               </Typography>
//               <Typography variant='body2' color='black'>
//                 {data?.track?.tempo?.toFixed(1) || 'N/A'}{' '}
//                 {data?.track?.time_signature
//                   ? 'T' + data.track.time_signature + '/4'
//                   : 'N/A'}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant='body2' color='black'>
//                 Key{' '}
//                 <Typography variant='body2' color='black' component={'span'}>
//                   {pitchToNote(data?.track?.key) || 'N/A'}
//                 </Typography>
//               </Typography>
//               <Typography
//                 variant='body2'
//                 color={
//                   data?.track?.key_confidence != null
//                     ? data.track.key_confidence * 100 >= 70
//                       ? 'green'
//                       : data.track.key_confidence * 100 >= 40
//                         ? 'blue'
//                         : 'black'
//                     : 'black'
//                 }>
//                 Valid:{' '}
//                 {data?.track?.key_confidence != null
//                   ? (data.track.key_confidence * 100).toFixed(0)
//                   : 'N/A'}
//                 %
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant='body2' color='black'>
//                 Popularity
//               </Typography>
//               <Typography
//                 variant='body2'
//                 color={
//                   item.popularity >= 70
//                     ? 'green'
//                     : item.popularity >= 40
//                       ? 'blue'
//                       : 'black'
//                 }>
//                 {popularity(item.popularity)}
//               </Typography>
//             </Box>
//           </Flex>
//           {item.preview_url && (
//             <audio controls src={item.preview_url} style={{ width: '100%' }} />
//           )}
//           {error && (
//             <Alert severity='error' sx={{ mt: 2 }}>
//               {error}
//             </Alert>
//           )}
//           <Box>
//             <Button
//               onClick={handleSearch}
//               variant='contained'
//               startIcon={<SearchIcon />}>
//               検索
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       <PlaylistDrawer
//         isOpen={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         selectedTracks={[item.id]}
//         trackInfo={{
//           name: item.name,
//           artist: item.artists[0].name,
//           image: item.album.images[0].url,
//         }}
//       />

//       {isLoading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity='error' sx={{ my: 2 }}>
//           {error}
//         </Alert>
//       ) : searchResults.length > 0 ? (
//         <Box
//           sx={{
//             mt: 3,
//             mb: 5,
//             p: 2,
//             bgcolor: 'rgba(255,255,255,0.1)',
//             borderRadius: 1,
//           }}>
//           <Typography variant='h6' sx={{ mb: 2 }}>
//             検索結果
//           </Typography>
//           <Grid container spacing={2}>
//             {searchResults.map((track) => (
//               <Grid item key={track.id} xs={12} sm={6} md={4}>
//                 <Card
//                   sx={{
//                     display: 'flex',
//                     m: 1,
//                     bgcolor: 'rgba(200,200,200,0.8)',
//                   }}>
//                   {track.albumArt && (
//                     <Box sx={{ width: 60, height: 60, position: 'relative' }}>
//                       <Image
//                         src={track.albumArt}
//                         alt={track.name}
//                         fill
//                         style={{ objectFit: 'cover' }}
//                       />
//                     </Box>
//                   )}
//                   <Box sx={{ p: 1, overflow: 'hidden' }}>
//                     <Typography noWrap variant='body1'>
//                       {track.name}
//                     </Typography>
//                     <Typography noWrap variant='body2' color='text.secondary'>
//                       {track.artist}
//                     </Typography>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       ) : null}
//     </>
//   );
// };

// export default TrackCard;
