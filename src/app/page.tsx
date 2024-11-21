"use client";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Input,
  Flex,
} from "@yamada-ui/react";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";
import { useRedirect } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTokenContext } from "@/utils/context/tokenContext";
import { performSearch } from "@/functions/spotify/search";
import { type SearchResult, type TrackItem } from "@/interfaces/interface";
import Image from "next/image";

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
            credentials: "include", // クッキーを送信するために設定
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

      // console.log(accessToken);
    }
  });

  const handleRedirect = async () => {
    if (!redirected) {
      document.cookie = "redirected=true; path=/"; // Cookieに保存
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
    <>
      <Center>
        <Heading as="h1" size="4xl" marginTop={"40px"} marginBottom={"40px"}>
          Welcome to NexFy!!
        </Heading>
      </Center>

      {!redirected ? (
        <>
          <Center>
            <Box mt={4}>
              <Text>Please click below to Start</Text>
              <Button onClick={handleRedirect}>Start to Spotify System</Button>
            </Box>
          </Center>
        </>
      ) : (
        <>
          <Center>
            <Box width={"50%"}>
              <form onSubmit={handleSearch}>
                <Flex justifyContent="center" direction={"row"}>
                  <Input
                    type="text"
                    placeholder="曲名・アーティスト名"
                    onChange={(e) => setSearch(e.target.value)}
                    width={"40%"} // 入力フィールドの幅を調整
                  />
                  <Button type="submit">検索</Button>
                </Flex>
              </form>
            </Box>
          </Center>
          <Center>
            <Carousel slideSize={"10%"} autoplay delay={5000}>
              {track?.tracks.items.map((item: TrackItem, index: number) => (
                <CarouselSlide as={Center} bg={"primary"} key={index}>
                  <Flex direction="column">
                    <Box mt={"4xl"}>
                      <a
                        href={item.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={item.album.images[0].url}
                          alt={item.name}
                          width={512} // 適切な幅を指定
                          height={512} // 適切な高さを指定
                          style={{ objectFit: "cover" }} // 画像の表示方法を調整
                        />
                      </a>
                    </Box>
                    <Box>
                      <Text fontSize={"2xl"}>{item.name}</Text>
                      <Text fontSize={"xl"}>{item.artists[0].name}</Text>
                      <audio controls src={item.preview_url || ""}></audio>
                    </Box>
                  </Flex>
                </CarouselSlide>
              ))}
            </Carousel>
          </Center>
        </>
      )}
    </>
  );
}
