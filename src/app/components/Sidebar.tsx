import { Box, VStack, Text } from '@yamada-ui/react';

export const Sidebar = () => {
  return (
    <Box
      as='nav'
      width='250px'
      bg='gray.800'
      p={4}
      height='100vh'
      position='fixed'
      top='60px'
      left='0'>
      <VStack align='flex-start' gap={4}>
        <Text>ホーム</Text>
        <Text>検索</Text>
        <Text>あなたのライブラリ</Text>
      </VStack>
    </Box>
  );
};
