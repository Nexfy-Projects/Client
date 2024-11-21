"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Slider } from "@mui/material";

export const Footer = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, backgroundColor: "green" }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography variant="body1" color="inherit">
            再生中の曲名
          </Typography>
          <Typography variant="body2" color="gray.400">
            アーティスト名
          </Typography>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
          <Slider defaultValue={30} sx={{ color: "inherit" }} />
        </Box>

        {/* 空のBoxは不要なので削除または他のコンテンツを追加 */}
      </Toolbar>
    </AppBar>
  );
};
