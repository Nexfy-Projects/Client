// components/Header.tsx
import { Flex, Avatar, Text, Link } from "@yamada-ui/react";

export const Header = () => {
  return (
    <Flex
      as="header"
      bg="gray.800"
      color="white"
      align="center"
      justify="space-between"
      px={6}
      py={4}
      boxShadow="md"
      position="fixed"
      top="0"
      width="100%"
      zIndex="10">
      {/* ロゴ部分 */}
      <Text fontSize="xl" fontWeight="bold">
        Nextfy
      </Text>

      {/* ナビゲーションバー */}
      <Flex align="center" gap={30}>
        <Link href="/" color={"white"}>
          ホーム
        </Link>
        <Text>検索</Text>
        <Text>あなたのライブラリ</Text>
      </Flex>

      {/* 検索バー */}
      {/* <Flex align='center'>
        <Input
          placeholder='曲やアーティストを検索'
          variant='filled'
          bg='gray.700'
          border='none'
          _placeholder={{ color: 'gray.400' }}
        />
        <IconButton
          aria-label='Search'
          icon={<Search />}
          ml={2}
          bg='gray.700'
          color='white'
          _hover={{ bg: 'gray.600' }}
        />
      </Flex> */}

      {/* プロフィール部分 */}
      <Avatar name="ユーザー名" src="/path-to-profile-image.jpg" />
    </Flex>
  );
};