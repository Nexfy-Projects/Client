'use client';

import { spotifyLogin } from '@/utils/recoil/atom/spotifyLoginAtom';
import { Box, Center, Heading, Text } from '@yamada-ui/react';
import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

export default function Home() {
  const hasRedirected = useRecoilValue(spotifyLogin);
  const setHasRedirected = useSetRecoilState(spotifyLogin);
  console.log(hasRedirected);

  useEffect(() => {
    if (!hasRedirected) {
      // リダイレクトを行う
      setHasRedirected(true);
      window.location.href = '/api/spotify/login';
    }
  }, [hasRedirected, setHasRedirected]);

  return (
    <>
      <Box>
        <Center>
          <Heading as='h1' size='4xl' isTruncated>
            Welcome
          </Heading>
        </Center>
        <Center>
          <Text>Please here to Start</Text>
        </Center>
      </Box>
    </>
  );
}
