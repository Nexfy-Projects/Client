// import { NextResponse } from 'next/server';
// import { performSearch } from './search';

// export async function POST(request: Request) {
//   try {
//     const token = request.headers.get('Authorization')?.replace('Bearer ', '');
//     const { query } = await request.json();

//     if (!token) {
//       return NextResponse.json(
//         { error: 'トークンが見つかりません' },
//         { status: 401 },
//       );
//     }

//     if (!query) {
//       return NextResponse.json(
//         { error: '検索クエリが必要です' },
//         { status: 400 },
//       );
//     }

//     const results = await performSearch(query, 0, 20, token);
//     return NextResponse.json(results);
//   } catch (error) {
//     console.error('Search error:', error);
//     return NextResponse.json(
//       { error: '検索中にエラーが発生しました' },
//       { status: 500 },
//     );
//   }
// }
