import { Box, Center, Heading, Text } from '@yamada-ui/react';
export default function Home() {
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
