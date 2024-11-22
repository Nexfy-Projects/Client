"use client";

import React, { useState, useEffect } from "react";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";

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
import { performSearch, trackDetails } from "@/app/api/spotify/search/search";
import {
  type SearchResult,
  type TrackItem,
  type AudioAnalysis,
} from "@/interfaces/spotifyInterface";
import { Flex } from "@yamada-ui/react";
import { pitchToNote } from "@/functions/spotify/pitchToNote";
import { popularity } from "@/functions/spotify/popularity";

export default function Home() {
  const { redirected, setRedirected } = useRedirect();
  const [search, setSearch] = useState<string>("");
  const { accessToken, setAccessToken } = useTokenContext();
  const [track, setTrack] = useState<SearchResult | undefined>(undefined);
  const [data, setData] = useState<AudioAnalysis[]>([]);

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

    const res: SearchResult = await performSearch(search, accessToken);
    setTrack(res);

    const datas: AudioAnalysis[] = await Promise.all(
      res.tracks.items.map(async (item: TrackItem) => {
        return await trackDetails(item.id, accessToken);
      }),
    );
    setData(datas);

    console.log(datas);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
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
            slideSize="25%"
            // スライドサイズを調整
            // スライドの配置を調整
            mt={8}
            mb={32}
            pb={4}
            // autoplay
            delay={5000}
            height={"auto"}
            gap={5}
          >
            {track?.tracks?.items.map((item: TrackItem, index: number) => (
              <CarouselSlide key={index} as={Box} style={{ padding: "10px" }}>
                <Card
                  style={{
                    width: "300px",
                    height: "auto",
                    marginBottom: "40px",
                    backgroundColor: "gray",
                    borderRadius: "1.5rem",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        width: "100%",
                        maxHeight: "30rem",
                        overflow: "hidden",
                      }}
                    >
                      <a href={item.album.uri} style={{ objectFit: "cover" }}>
                        <img
                          src={item.album.images[0].url}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "10%",
                            margin: "0 auto 20px auto",
                          }}
                        />
                      </a>

                      <Typography
                        variant="h6"
                        sx={{
                          maxWidth: "60%",
                          fontSize: {
                            xs: "4vw",
                            sm: "3vw",
                            md: "2vw",
                            lg: "1.5vw",
                          }, // 画面サイズに応じたフォントサイズ
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <a href={item.album.uri}>{item.name}</a>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: "60%",
                          fontSize: {
                            xs: "4vw",
                            sm: "3vw",
                            md: "2vw",
                            lg: "1.5vw",
                          }, // 画面サイズに応じたフォントサイズ
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <a href={item.album.artists[0].uri}>
                          {item.artists[0].name}{" "}
                        </a>
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {/* {Math.floor(item.duration_ms / 1000 / 60)}min/
                      {String(
                        Math.floor((item.duration_ms / 1000) % 60)
                      ).padStart(2, "")}
                      sec */}
                      </Typography>
                    </Box>

                    <Box borderBottom={"1px solid black"} margin={"10px 0"} />
                    {/* 曲情報 */}
                    <Flex justifyContent={"space-between"} marginBottom={8}>
                      {/* BPM */}
                      <Box>
                        <Typography variant="body2" color="black">
                          BPM
                        </Typography>
                        <Typography variant="body2" color="black">
                          {data[index]?.track?.tempo?.toFixed(1) || "N/A"}{" "}
                          {"T" + data[index]?.track?.time_signature + "/4" ||
                            "N/A"}
                        </Typography>
                      </Box>
                      {/* Key */}
                      <Box>
                        <Typography variant="body2" color="black">
                          Key{" "}
                          <Typography
                            variant="body2"
                            color="black"
                            component={"span"}
                          >
                            {" "}
                            {pitchToNote(data[index]?.track?.key) || "N/A"}{" "}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          color={
                            typeof data[index]?.track?.key_confidence ===
                            "number"
                              ? data[index]?.track?.key_confidence * 100 >= 70
                                ? "green"
                                : data[index]?.track?.key_confidence * 100 >= 40
                                  ? "blue"
                                  : "black"
                              : "black"
                          }
                        >
                          Valid:{" "}
                          {typeof data[index]?.track?.key_confidence ===
                          "number"
                            ? (
                                data[index]?.track?.key_confidence * 100
                              ).toFixed(0)
                            : "N/A"}
                          %
                        </Typography>
                      </Box>
                      {/* Popularity */}
                      <Box>
                        <Typography variant="body2" color="black">
                          Popularity
                        </Typography>
                        <Typography
                          variant="body2"
                          color={
                            item.popularity >= 70
                              ? "green"
                              : item.popularity >= 40
                                ? "blue"
                                : "black"
                          }
                        >
                          {popularity(item.popularity)}
                        </Typography>
                      </Box>
                    </Flex>
                  </CardContent>
                  <audio
                    controls
                    src={item.preview_url || ""}
                    style={{ width: "100%" }}
                  />
                </Card>
              </CarouselSlide>
            ))}

            {/* ))} */}
          </Carousel>
        </>
      )}
    </Container>
  );
}
