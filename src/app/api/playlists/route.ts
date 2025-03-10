// app/api/playlists/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSpotifyPlaylist } from "@/utils/spotifyApi";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Spotifyの認証が必要です。再度ログインしてください。" },
        { status: 401 },
      );
    }

    // トークンの検証
    const spotifyUserResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!spotifyUserResponse.ok) {
      return NextResponse.json(
        { error: "Spotifyの認証が無効です。再度ログインしてください。" },
        { status: 401 },
      );
    }

    const {
      user_id,
      playlist_name,
      description = "",
      tracks = [],
      isPublic = false,
    } = await req.json();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    );

    const { data: existingPlaylists } = await supabase
      .from("playlists")
      .select()
      .eq("user_id", user_id)
      .eq("playlist_name", playlist_name);

    // 配列が空でないかをチェック
    if (existingPlaylists && existingPlaylists.length > 0) {
      return NextResponse.json(
        { error: "プレイリストは既に存在します" },
        { status: 409 },
      );
    }

    // Spotify APIでプレイリスト作成

    const spotifyPlaylist = await createSpotifyPlaylist(
      playlist_name,
      description,
      tracks,
      isPublic,
      token,
    );

    // スプレッド演算子を使用する前に、オブジェクトであることを確認
    if (!spotifyPlaylist || typeof spotifyPlaylist !== "object") {
      return NextResponse.json(
        { error: "プレイリストの作成に失敗しました" },
        { status: 500 },
      );
    }

    // スプレッド演算子を使わずに、直接オブジェクトとして追加
    await supabase.from("playlists").insert({
      user_id,
      playlist_name,
      spotify_id: spotifyPlaylist.id,
      // 必要なその他のフィールド
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("プレイリスト作成エラー:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "プレイリストの作成中にエラーが発生しました。",
      },
      { status: 500 },
    );
  }
}
