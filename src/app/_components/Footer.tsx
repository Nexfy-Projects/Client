import { Flex, Box, Text, Slider } from "@yamada-ui/react";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      bg="gray.800"
      color="white"
      align="center"
      justify="space-between"
      p={4}
      position="fixed"
      bottom="0"
      width="100%"
    >
      <Box>
        <Text>再生中の曲名</Text>
        <Text fontSize="sm" color="gray.400">
          アーティスト名
        </Text>
      </Box>
      <Slider defaultValue={30} width="300px" />
      <Box></Box>
    </Flex>
  );
};
