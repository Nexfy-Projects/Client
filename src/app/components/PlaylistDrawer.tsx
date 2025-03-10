// import React, { useState, useEffect } from 'react';
// import {
//   Drawer,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   FormControlLabel,
//   Switch,
//   IconButton,
//   Alert,
//   Snackbar,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Image from 'next/image';
// import { createSpotifyPlaylist } from '@/utils/spotifyApi';
// import { useToken } from '@/utils/context/tokenContext';

// interface TrackInfo {
//   name: string;
//   artist: string;
//   image: string;
// }

// interface PlaylistDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedTracks: string[];
//   trackInfo: TrackInfo;
// }

// export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({
//   isOpen,
//   onClose,
//   selectedTracks,
//   trackInfo,
// }) => {
//   // Material UIのテーマとメディアクエリを使用
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // フォームの状態
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [isPublic, setIsPublic] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   // フォームのリセット
//   useEffect(() => {
//     if (isOpen) {
//       // ドロワーが開いたときにデフォルトのプレイリスト名を設定
//       setName(`${trackInfo.artist} Mix`);
//       setDescription('');
//       setIsPublic(false);
//       setError(null);
//       setSuccess(null);
//     }
//   }, [isOpen, trackInfo]);
//   const { token } = useToken();
//   // プレイリスト作成の処理
//   const handleCreatePlaylist = async () => {
//     if (!name.trim()) {
//       setError('プレイリスト名を入力してください');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // ローカルストレージからアクセストークンを取得

//       if (!token) {
//         setError('Spotifyにログインしてください');
//         setLoading(false);
//         return;
//       }

//       // プレイリスト作成APIを呼び出し
//       await createSpotifyPlaylist(
//         name,
//         description,
//         selectedTracks,
//         isPublic,
//         token,
//       );

//       setSuccess(`プレイリスト「${name}」を作成しました`);
//       setTimeout(() => {
//         onClose(); // 成功したらドロワーを閉じる
//       }, 1500);
//     } catch (error) {
//       setError('プレイリスト作成中にエラーが発生しました');
//       console.error('Create playlist error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Drawer
//       anchor={isMobile ? 'bottom' : 'right'}
//       open={isOpen}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           bgcolor: 'black',
//           color: 'white',
//           borderTopLeftRadius: isMobile ? '16px' : '0',
//           borderTopRightRadius: isMobile ? '16px' : '0',
//           maxHeight: isMobile ? '90vh' : '100vh',
//           width: isMobile ? '100%' : '400px',
//           maxWidth: '100%',
//         },
//       }}>
//       <Box p={3} sx={{ width: '100%' }}>
//         <Box
//           display='flex'
//           justifyContent='space-between'
//           alignItems='center'
//           mb={2}>
//           <Typography variant='h6'>プレイリストを作成</Typography>
//           <IconButton onClick={onClose} sx={{ color: 'white' }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box display='flex' gap={2} mb={3}>
//           <Image
//             src={trackInfo.image}
//             alt={trackInfo.name}
//             width={100}
//             height={100}
//             style={{ borderRadius: '8px', objectFit: 'cover' }}
//           />
//           <Box>
//             <Typography variant='subtitle1'>{trackInfo.name}</Typography>
//             <Typography variant='body2' color='grey.500'>
//               {trackInfo.artist}
//             </Typography>
//             <Typography variant='caption' sx={{ mt: 1, display: 'block' }}>
//               {selectedTracks.length}曲を選択中
//             </Typography>
//           </Box>
//         </Box>

//         {error && (
//           <Alert
//             severity='error'
//             sx={{ mb: 2, bgcolor: 'rgba(211, 47, 47, 0.1)' }}>
//             {error}
//           </Alert>
//         )}

//         <TextField
//           label='プレイリスト名'
//           fullWidth
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           margin='normal'
//           required
//           variant='outlined'
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': { borderColor: 'gray' },
//               '&:hover fieldset': { borderColor: 'white' },
//               '& input': { color: 'white' },
//             },
//             '& .MuiInputLabel-root': { color: 'gray' },
//             '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
//           }}
//         />

//         <TextField
//           label='説明（任意）'
//           fullWidth
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           margin='normal'
//           multiline
//           rows={3}
//           variant='outlined'
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': { borderColor: 'gray' },
//               '&:hover fieldset': { borderColor: 'white' },
//               '& textarea': { color: 'white' },
//             },
//             '& .MuiInputLabel-root': { color: 'gray' },
//             '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
//           }}
//         />

//         <FormControlLabel
//           control={
//             <Switch
//               checked={isPublic}
//               onChange={(e) => setIsPublic(e.target.checked)}
//               color='primary'
//             />
//           }
//           label='公開する'
//           sx={{ my: 2, '& .MuiTypography-root': { color: 'white' } }}
//         />

//         <Typography variant='caption' color='grey.500' display='block' mb={3}>
//           公開すると、他のユーザーがこのプレイリストを見つけることができます
//         </Typography>

//         <Button
//           variant='contained'
//           fullWidth
//           onClick={handleCreatePlaylist}
//           disabled={loading}
//           sx={{
//             mt: 2,
//             py: 1.5,
//             bgcolor: 'green',
//             '&:hover': {
//               bgcolor: 'darkgreen',
//             },
//           }}>
//           {loading ? '作成中...' : 'プレイリストを作成'}
//         </Button>
//       </Box>

//       <Snackbar
//         open={!!success}
//         autoHideDuration={3000}
//         onClose={() => setSuccess(null)}
//         message={success}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Drawer>
//   );
// };

// export default PlaylistDrawer;
