import { Box, VStack, Text, Button, useDisclosure } from "@yamada-ui/react";

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={isOpen ? onClose : onOpen}
        display={{ base: "block", md: "none" }}
      >
        メニュー
      </Button>
      <Box
        as="nav"
        width={{ base: "100%", md: "250px" }} // 幅をレスポンシブに設定
        bg="gray.800"
        p={10}
        height="100vh"
        position="fixed"
        top="60px"
        left={isOpen ? "0" : "-250px"} // トグル機能
        transition="left 0.3s ease"
      >
        <VStack align="flex-start" gap={4}>
          <Text>ホーム</Text>
          <Text>検索</Text>
          <Text>あなたのライブラリ</Text>
        </VStack>
      </Box>
    </>
  );
};
