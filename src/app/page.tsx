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
import { useRedirect } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTokenContext } from "@/utils/context/tokenContext";
import { performSearch } from "@/functions/spotify/search";

interface Track {
  tracks: {
    items: {
      id: string;
      name: string;
    };
  };
}

export default function Home() {
  const { redirected, setRedirected } = useRedirect();
  const [search, setSearch] = useState<string>("");
  const { accessToken, setAccessToken } = useTokenContext();
  const [track, setTrack] = useState([]);

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

      console.log(accessToken);
    }
  });

  const handleRedirect = async () => {
    if (!redirected) {
      document.cookie = "redirected=true; path=/"; // Cookieに保存
      router.push("/api/spotify/login");
      setRedirected(true);
    }
  };
  // console.log(redirected);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = {
      q: search,
      offset: 10,
      limit: 20,
      type: "track",
    };

    const res = await performSearch(query, accessToken);
    setTrack(res);
    console.log(res);
  };

  return (
    <>
      <Box>
        <Center>
          <Heading as="h1" size="4xl" marginBottom={"40px"} isTruncated>
            Welcome to NexFy!!
          </Heading>
        </Center>

        {!redirected ? (
          <>
            <Center>
              <Text>Please click below to Start</Text>
            </Center>
            <Center>
              <Box mt={4}>
                <Button onClick={handleRedirect}>
                  Start to Spotify System
                </Button>
              </Box>
            </Center>
          </>
        ) : (
          <>
            <Center>
              <Box mt={4} width={"60%"}>
                <form onSubmit={handleSearch}>
                  <Flex justifyContent={"center"}>
                    <Input
                      type="text"
                      placeholder="曲名・アーティスト名"
                      onChange={(e) => setSearch(e.target.value)}
                    ></Input>
                    <Button type="submit">検索</Button>
                  </Flex>
                </form>
              </Box>
              <Box mt={4}>
                <ul>
                  {track?.map((item: Track) => (
                    <li key={item.tracks.items.id}>{item.tracks.items.name}</li>
                  ))}
                  <li></li>
                </ul>
              </Box>
            </Center>
          </>
        )}
      </Box>
    </>
  );
}
