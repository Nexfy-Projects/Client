"use client";

import { useState } from "react";
import { Heart, MoreVertical, Edit, Trash2, Music } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CreatePlaylistDialog } from "@/components/CreatePlaylistDialog"; // 新しいコンポーネントをインポート

// プレイリストの型定義
type Playlist = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  coverImage: string;
  songs: Song[];
};

// 曲の型定義
type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  added: string;
  image: string;
  duration: number;
};

export default function PlaylistPage() {
  // 状態管理
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);
  const [editPlaylistId, setEditPlaylistId] = useState<number | null>(null);
  const [editPlaylistName, setEditPlaylistName] = useState("");
  const [editPlaylistDescription, setEditPlaylistDescription] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]); // 選択されたトラックIDを保持
  const [userId] = useState<number>(1); // デモ用。実際はログインユーザーIDを取得

  // サンプルプレイリスト
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: 0,
      name: "お気に入り",
      description: "よく聴く曲のコレクション",
      createdAt: "2024-01-15",
      coverImage: "/placeholder.svg",
      songs: [
        {
          id: 1,
          title: "Intro",
          artist: "999dobby",
          album: "Depression",
          added: "2024-03-01",
          image: "/placeholder.svg",
          duration: 180,
        },
        {
          id: 2,
          title: "FREE MY BROTHER",
          artist: "999dobby",
          album: "Singles",
          added: "2024-02-15",
          image: "/placeholder.svg",
          duration: 210,
        },
        {
          id: 3,
          title: "Cannabis",
          artist: "999dobby",
          album: "Depression",
          added: "2024-01-20",
          image: "/placeholder.svg",
          duration: 195,
        },
      ],
    },
    {
      id: 1,
      name: "ドライブ",
      description: "ドライブに最適な曲",
      createdAt: "2024-02-20",
      coverImage: "/placeholder.svg",
      songs: [
        {
          id: 4,
          title: "Nexfy Exclusive",
          artist: "999dobby",
          album: "Nexfy Sessions",
          added: "2023-12-25",
          image: "/placeholder.svg",
          duration: 240,
        },
        {
          id: 5,
          title: "Late Night",
          artist: "999dobby",
          album: "Depression",
          added: "2023-11-10",
          image: "/placeholder.svg",
          duration: 185,
        },
      ],
    },
  ]);

  // お気に入り機能
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // 時間フォーマット
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // This function was replaced by CreatePlaylistDialog component

  // プレイリストを編集
  const startEditPlaylist = (playlist: Playlist) => {
    setEditPlaylistId(playlist.id);
    setEditPlaylistName(playlist.name);
    setEditPlaylistDescription(playlist.description);
  };

  // プレイリスト編集を保存
  const savePlaylistEdit = () => {
    if (editPlaylistId === null || editPlaylistName.trim() === "") return;

    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === editPlaylistId) {
        return {
          ...playlist,
          name: editPlaylistName,
          description: editPlaylistDescription,
        };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
    setEditPlaylistId(null);
    setEditPlaylistName("");
    setEditPlaylistDescription("");
  };

  // プレイリストを削除
  const deletePlaylist = (id: number) => {
    if (id === 0) return; // お気に入りは削除不可

    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    setPlaylists(updatedPlaylists);

    if (selectedPlaylist === id) {
      setSelectedPlaylist(0);
    }
  };

  // プレイリスト作成成功時のハンドラ
  const handlePlaylistSuccess = (playlistId: string) => {
    console.log(`プレイリスト作成成功: ${playlistId}`);
    // ここに成功時の処理を追加（例：通知表示、リストの更新など）
  };

  // トラック選択の切り替え
  const toggleTrackSelection = (trackId: string) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId],
    );
  };

  // 現在選択されているプレイリスト
  const currentPlaylist =
    playlists.find((p) => p.id === selectedPlaylist) || playlists[0];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* メインコンテンツ */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* プレイリスト一覧セクション */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">マイプレイリスト</h2>

            {/* 新しいCreatePlaylistDialogコンポーネントを使用 */}
            <CreatePlaylistDialog
              selectedTracks={selectedTracks}
              userId={userId}
              onSuccess={handlePlaylistSuccess}
            />

            {/* 既存のダイアログ
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='bg-green-700 hover:bg-green-600 text-white border-none'>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  新規プレイリスト
                </Button>
              </DialogTrigger>
              ... 以下省略 ...
            </Dialog>
            */}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`bg-zinc-900 rounded-lg p-2 cursor-pointer transition hover:bg-zinc-800 ${selectedPlaylist === playlist.id ? "ring-2 ring-green-500" : ""}`}
                onClick={() => setSelectedPlaylist(playlist.id)}
              >
                <div className="relative aspect-square mb-2">
                  <Image
                    src={playlist.coverImage || "/placeholder.svg"}
                    alt={playlist.name}
                    fill
                    className="rounded-md object-cover"
                  />
                  {playlist.songs.length > 0 && (
                    <div className="absolute bottom-2 right-2 p-2 bg-black/70 rounded-full">
                      <Music size={14} />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium truncate">{playlist.name}</h3>
                    <p className="text-xs text-gray-400 truncate">
                      {playlist.songs.length} 曲
                    </p>
                  </div>
                  {playlist.id !== 0 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
                        <DialogHeader>
                          <DialogTitle>プレイリスト管理</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Button
                            variant="outline"
                            className="justify-start border-zinc-700 hover:bg-zinc-800"
                            onClick={() => startEditPlaylist(playlist)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </Button>
                          <Button
                            variant="outline"
                            className="justify-start border-zinc-700 text-red-500 hover:bg-zinc-800 hover:text-red-400"
                            onClick={() => deletePlaylist(playlist.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 編集ダイアログ */}
        {editPlaylistId !== null && (
          <Dialog
            open={editPlaylistId !== null}
            onOpenChange={(open) => !open && setEditPlaylistId(null)}
          >
            <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
              <DialogHeader>
                <DialogTitle>プレイリストを編集</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-name">プレイリスト名</label>
                  <Input
                    id="edit-name"
                    value={editPlaylistName}
                    onChange={(e) => setEditPlaylistName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="edit-description">説明</label>
                  <Input
                    id="edit-description"
                    value={editPlaylistDescription}
                    onChange={(e) => setEditPlaylistDescription(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={savePlaylistEdit}
                    className="bg-green-700 hover:bg-green-600 text-white"
                  >
                    保存
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* 選択されたプレイリストのコンテンツ */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {currentPlaylist.name}
              </h1>
              <p className="text-gray-400 mt-1">
                {currentPlaylist.description}
              </p>
            </div>
            <div className="text-sm text-gray-400">
              {currentPlaylist.songs.length} 曲 • 作成日:{" "}
              {new Date(currentPlaylist.createdAt).toLocaleDateString("ja-JP")}
            </div>
          </div>

          {currentPlaylist.songs.length === 0 ? (
            <div className="bg-zinc-900/50 rounded-lg p-10 text-center">
              <p className="text-gray-400">
                このプレイリストには曲がありません
              </p>
            </div>
          ) : (
            <>
              {/* モバイル表示 - カード形式 */}
              <div className="md:hidden grid grid-cols-1 gap-6">
                {currentPlaylist.songs.map((song) => (
                  <div
                    key={song.id}
                    className="bg-zinc-900 rounded-xl overflow-hidden"
                  >
                    <div className="relative">
                      <Image
                        src={song.image || "/placeholder.svg"}
                        alt={`${song.title} by ${song.artist}`}
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-bold truncate">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-300 truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>アルバム: {song.album}</span>
                        <span>
                          追加日:{" "}
                          {new Date(song.added).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm text-gray-400">
                          {formatTime(song.duration)}
                        </div>
                        <button
                          onClick={() => toggleFavorite(song.id)}
                          className={`p-2 rounded-full hover:bg-zinc-800 transition ${favorites.includes(song.id) ? "text-green-500" : "text-gray-400"}`}
                        >
                          <Heart
                            size={18}
                            fill={
                              favorites.includes(song.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* デスクトップ表示 - テーブル形式 */}
              <div className="hidden md:block">
                <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800 text-left text-gray-400">
                        <th className="p-4 w-10">
                          {/* 全選択チェックボックス（省略可） */}
                        </th>
                        <th className="p-4">曲名</th>
                        <th className="p-4">アーティスト</th>
                        <th className="p-4">アルバム</th>
                        <th className="p-4">追加日</th>
                        <th className="p-4 w-24 text-center">お気に入り</th>
                        <th className="p-4 w-24 text-center">再生時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPlaylist.songs.map((song) => (
                        <tr
                          key={song.id}
                          className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                        >
                          <td className="p-4 w-10">
                            <input
                              type="checkbox"
                              checked={selectedTracks.includes(
                                song.id.toString(),
                              )}
                              onChange={() =>
                                toggleTrackSelection(song.id.toString())
                              }
                              className="rounded bg-zinc-800 border-zinc-700"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={song.image || "/placeholder.svg"}
                                alt={song.title}
                                width={40}
                                height={40}
                                className="rounded"
                              />
                              <span className="font-medium">{song.title}</span>
                            </div>
                          </td>
                          <td className="p-4">{song.artist}</td>
                          <td className="p-4">{song.album}</td>
                          <td className="p-4">
                            {new Date(song.added).toLocaleDateString("ja-JP")}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => toggleFavorite(song.id)}
                              className={`p-2 rounded-full hover:bg-zinc-700 transition ${favorites.includes(song.id) ? "text-green-500" : "text-gray-400"}`}
                            >
                              <Heart
                                size={18}
                                fill={
                                  favorites.includes(song.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          </td>
                          <td className="p-4 text-center text-gray-400">
                            {formatTime(song.duration)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
