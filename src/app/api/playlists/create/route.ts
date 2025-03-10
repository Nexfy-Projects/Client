import { NextResponse } from "next/server";
import { db } from "@/db";
import { playlistsTable } from "@/db/schema";
import { createSpotifyPlaylist } from "@/utils/spotifyApi";

export async function POST(req: Request) {
  try {
    // リクエストボディからデータを取得
    const { name, description, tracks, isPublic, userId } = await req.json();

    // 認証ヘッダーからアクセストークンを取得
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Spotifyアクセストークンがありません" },
        { status: 401 },
      );
    }

    const accessToken = authHeader.substring(7); // "Bearer "の後の部分を取得

    // 必須パラメータのバリデーション
    if (
      !name ||
      !tracks ||
      !Array.isArray(tracks) ||
      tracks.length === 0 ||
      !userId
    ) {
      return NextResponse.json(
        { error: "必須パラメータが不足しています" },
        { status: 400 },
      );
    }

    // Spotify APIを使用してプレイリストを作成
    const spotifyPlaylist = await createSpotifyPlaylist(
      name,
      description || "",
      tracks,
      isPublic || false,
      accessToken,
    );

    // DBに保存
    // 各トラックに対して1レコード追加
    for (const trackId of tracks) {
      await db.insert(playlistsTable).values({
        user_id: userId,
        spotify_playlist_id: spotifyPlaylist.id,
        playlist_name: name,
        description: description || "",
        songId: trackId,
        liked: false,
      });
    }

    return NextResponse.json({
      success: true,
      playlist: spotifyPlaylist,
    });
  } catch (error) {
    console.error("プレイリスト作成エラー:", error);
    return NextResponse.json(
      {
        error: "プレイリスト作成中にエラーが発生しました",
        details: error,
      },
      { status: 500 },
    );
  }
}
