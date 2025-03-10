"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface CreatePlaylistDialogProps {
  selectedTracks: string[];
  userId: number;
  onSuccess?: (playlistId: string) => void;
  buttonLabel?: string;
  disabled?: boolean;
}

export function CreatePlaylistDialog({
  selectedTracks,
  userId,
  onSuccess,
  buttonLabel = "新規プレイリスト",
  disabled = false,
}: CreatePlaylistDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    // バリデーション
    if (!name.trim()) {
      setError("プレイリスト名を入力してください");
      return;
    }

    if (!selectedTracks.length) {
      setError("少なくとも1曲を選択してください");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // アクセストークンの取得 (ローカルストレージから)
      const accessToken = localStorage.getItem("spotify_access_token");

      if (!accessToken) {
        setError("Spotifyにログインしてください");
        setIsLoading(false);
        return;
      }

      // APIリクエスト
      const response = await fetch("/api/playlists/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
          tracks: selectedTracks,
          isPublic,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details || "予期せぬエラーが発生しました",
        );
      }

      // 成功時の処理
      if (onSuccess && data.playlist && data.playlist.id) {
        onSuccess(data.playlist.id);
      }

      // ダイアログを閉じる
      setOpen(false);

      // フォームリセット
      setName("");
      setDescription("");
      setIsPublic(false);
    } catch (error) {
      setError(error as string);
      console.error("プレイリスト作成エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || selectedTracks.length === 0}
          className="bg-green-700 hover:bg-green-600 text-white border-none"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>新規プレイリスト</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="bg-red-900/30 border border-red-700 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="text-sm text-gray-400">
            {selectedTracks.length}曲を選択中
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">プレイリスト名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="新しいプレイリスト"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="プレイリストの説明を入力（任意）"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              disabled={isLoading}
            />
            <Label htmlFor="public">公開する</Label>
          </div>
          <div className="text-xs text-gray-400">
            公開すると、他のユーザーがこのプレイリストを見つけることができます
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "作成中..." : "プレイリストを作成"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
