"use client";
import { Box, Center, Heading, Text, Button, Input } from "@yamada-ui/react";
import { useRedirect } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Home() {
  const { redirected, setRedirected } = useRedirect();
  const router = useRouter();

  const handleRedirect = () => {
    if (!redirected) {
      setRedirected(true);
      router.push("/api/spotify/login");
    }
  };

  console.log(redirected);

  return (
    <>
      <Box>
        <Center>
          <Heading as="h1" size="4xl" isTruncated>
            Welcome
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
          <Center>
            <Input type="text" placeholder="曲名・アーティスト名"></Input>
          </Center>
        )}
      </Box>
    </>
  );
}
