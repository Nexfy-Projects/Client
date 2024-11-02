"use client";
// components/Header.tsx
import { Flex, Avatar, Text, Link, Button, Box } from "@yamada-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const signined = useState(false);

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
      zIndex="10"
    >
      {/* ロゴ部分 */}
      <Text fontSize="xl" fontWeight="bold">
        Nexfy
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

      {/* プロフィール部分 */}
      {signined ? (
        <Avatar name="user" src="/path-to-profile-image.jpg" />
      ) : (
        <>
          <Box>
            <Button
              onClick={() => router.push("/pages/auth/signup")}
              marginRight={5}
            >
              新規登録
            </Button>
            <Button onClick={() => router.push("/pages/auth/signin")}>
              ログイン
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};
