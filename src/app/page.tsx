"use client";

import React, { useState, useEffect } from "react";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";
import { Box, Typography, Button, Container } from "@mui/material";
// import { useRedirect } from '@/utils/context/spotifyLoginContext';
import { useRouter } from "next/navigation";
import { useSetToken } from "@/utils/context/tokenContext";
import { performSearch, trackDetails } from "@/app/api/spotify/search/search";
import {
  type SearchResult,
  type TrackItem,
  type AudioAnalysis,
} from "@/interfaces/spotifyInterface";
import { SearchForm } from "./components/SearchForm";
import { TrackCard } from "./components/TrackCard";

export default function Home() {
  // const { redirected, setRedirected } = useRedirect();
  const { accessToken, AccessToken } = useSetToken();
  const [track, setTrack] = useState<SearchResult | undefined>(undefined);
  const [data, setData] = useState<AudioAnalysis[]>([]);

  const router = useRouter();

  useEffect(() => {
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

        AccessToken(data.access_token);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    fetchAccessToken();
  }, [AccessToken]);

  const handleRedirect = async () => {
    if (!accessToken) {
      router.push("/api/spotify/login");
    }
  };

  const handleSearch = async (search: string) => {
    const res: SearchResult = await performSearch(search, accessToken);
    setTrack(res);

    const datas: AudioAnalysis[] = await Promise.all(
      res.tracks.items.map(async (item: TrackItem) => {
        const detail = trackDetails(item.id, accessToken);
        const res = await detail;
        return res;
      }),
    );
    setData(datas);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to Nexfy!!
      </Typography>

      {!accessToken ? (
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
          <SearchForm onSearch={handleSearch} />

          <Carousel
            slideSize="33%"
            withControls={false}
            mt={8}
            mb={4}
            pb={4}
            autoplay
            delay={5000}
            height={"auto"}
            gap={5}
            dragFree
          >
            {track?.tracks?.items.map((item: TrackItem, index: number) => (
              <CarouselSlide key={index} as={Box} style={{ padding: "10px" }}>
                <TrackCard item={item} data={data[index]} />
              </CarouselSlide>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
}
