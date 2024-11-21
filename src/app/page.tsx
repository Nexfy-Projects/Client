"use client";

import React, { useState, useEffect } from "react";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";
import Image from "next/image";

import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useRedirect } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useTokenContext } from "@/utils/context/tokenContext";
import { performSearch } from "@/functions/spotify/search";
import { type SearchResult, type TrackItem } from "@/interfaces/interface";

export default function Home() {
  const { redirected, setRedirected } = useRedirect();
  const [search, setSearch] = useState<string>("");
  const { accessToken, setAccessToken } = useTokenContext();
  const [track, setTrack] = useState<SearchResult | undefined>(undefined);

  const router = useRouter();
  useEffect(() => {
    if (redirected) {
      const fetchAccessToken = async () => {
        try {
          const response = await fetch("/api/cookies", {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setAccessToken(data.access_token);
        } catch (error) {
          console.error("Failed to fetch access token:", error);
        }
      };
      fetchAccessToken();
    }
  }, [redirected, setAccessToken]);

  const handleRedirect = async () => {
    if (!redirected) {
      document.cookie = "redirected=true; path=/";
      setRedirected(true);
      router.push("/api/spotify/login");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = {
      q: search,
      offset: 10,
      limit: 20,
      type: "track",
    };

    const res: SearchResult = await performSearch(query, accessToken);
    setTrack(res);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to NexFy!!
      </Typography>

      {!redirected ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" gutterBottom>
            Please click below to Start
          </Typography>
          <Button variant="contained" onClick={handleRedirect}>
            Start to Spotify System
          </Button>
        </Box>
      ) : (
        <>
          <Box mt={4} textAlign="center">
            <form onSubmit={handleSearch}>
              <TextField
                label="曲名・アーティスト名"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  color: "white",
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // アウトラインの色を白に
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // ホバー時のアウトラインの色を白に
                    },
                    "& input": {
                      color: "white", // 入力された文字の色を白に
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // フォーカス時のアウトラインの色を白に
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // ラベルの色を白に
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // フォーカス時のラベルの色を白に
                  },
                }}
              />
              <Button type="submit" variant="contained">
                検索
              </Button>
            </form>
          </Box>

          <Carousel
            slideSize="70%" // スライドサイズを調整
            // align="start" // スライドの配置を調整
            mt={4}
            mb={4}
            autoplay
            delay={5000}
            sx={{ height: "auto" }}
          >
            {track?.tracks?.items.map((item: TrackItem, index: number) => (
              <CarouselSlide key={index} as={Box} style={{ padding: "10px" }}>
                <Card style={{ height: "auto", marginBottom: "40px" }}>
                  <a href={item.album.uri}>
                    <Box>
                      <Image
                        src={item.album.images[0].url}
                        alt={item.name}
                        width={150}
                        height={150}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Box>
                  </a>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.artists[0].name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {(item.duration_ms / 1000 / 60).toFixed(2)} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Popularity: {item.popularity}
                    </Typography>
                  </CardContent>
                  <audio
                    controls
                    src={item.preview_url || ""}
                    style={{ width: "100%" }}
                  />
                </Card>
              </CarouselSlide>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
}
