"use client";

import { Box, Typography, Container } from "@mui/material";

export default function FirstLibrary() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          最初のライブラリページ
        </Typography>
        <Typography variant="body1">
          ここにライブラリの内容を表示します。
        </Typography>
      </Box>
    </Container>
  );
}
