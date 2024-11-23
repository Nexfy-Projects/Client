"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";

export default function SignupComplete() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        登録完了
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Nexfyへの登録が完了しました。ようこそ！
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button onClick={handleHome} variant="contained">
          ホームへ
        </Button>
      </Box>
    </Container>
  );
}
