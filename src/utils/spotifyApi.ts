/**
 * Spotify API用のヘルパー関数
 */

// ブラウザ側でローカルストレージからトークンを取得する関数
export const getSpotifyToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("spotify_access_token");
    return token;
  }
  return null;
};

// ユーザー情報を取得する関数
export const getSpotifyUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Spotify user profile:", error);
    throw error;
  }
};

export const createSpotifyPlaylist = async (
  name: string,
  description: string,
  tracks: string[],
  isPublic: boolean,
  token: string,
) => {
  try {
    // ユーザー情報の取得
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("ユーザー情報の取得に失敗しました。再認証が必要です。");
    }

    const userData = await userResponse.json();

    // プレイリスト作成
    const createResponse = await fetch(
      `https://api.spotify.com/v1/users/${userData.id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
        }),
      },
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("プレイリスト作成エラー詳細:", errorData);

      if (errorData.error.status === 403) {
        throw new Error(
          "プレイリスト作成の権限がありません。アプリの再認証が必要です。",
        );
      }
      throw new Error(`プレイリスト作成エラー: ${errorData.error.message}`);
    }

    const playlist = await createResponse.json();

    // トラックの追加
    if (tracks.length > 0) {
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: tracks.map((trackId) => `spotify:track:${trackId}`),
          }),
        },
      );

      if (!addTracksResponse.ok) {
        throw new Error("トラックの追加に失敗しました");
      }
    }

    return playlist;
  } catch (error) {
    console.error("Spotifyプレイリスト作成エラー:", error);
    throw error;
  }
};

export const performSpotifySearch = async (
  query: string,
  offset: number = 0,
  limit: number = 20,
  token: string,
) => {
  if (!query.trim()) {
    throw new Error("検索クエリを入力してください");
  }

  if (!token) {
    throw new Error("認証トークンが必要です");
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "認証の有効期限が切れています。再度ログインしてください。",
        );
      }
      throw new Error(
        `Spotify APIエラー: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Spotify API エラー:", error);
    throw error;
  }
};
