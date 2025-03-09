"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import supabase from "../api/supabase/init";
import { useSetToken } from "@/utils/context/tokenContext";

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("ログアウトエラー:", error);
    return;
  }
  await fetch("/api/cookies", {
    method: "DELETE",
    credentials: "include",
  });

  window.location.href = "/";
}

export const Header = () => {
  const router = useRouter();
  const { accessToken } = useSetToken();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        "key" in event && // ここでeventがKeyboardEventであることを確認
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component="a" onClick={() => router.push("/")}>
          <ListItemText primary="ホーム" />
        </ListItem>
        <ListItem component="a">
          <ListItemText primary="検索" />
        </ListItem>

        {accessToken && (
          <>
            <ListItem component="a">
              <ListItemText primary="あなたのライブラリ" />
            </ListItem>
            <ListItem component="a">
              <ListItemText primary="プロフィール" />
            </ListItem>
            <Button onClick={signOut}>ログアウト</Button>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nexfy
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button color="inherit" onClick={() => router.push("/")}>
            ホーム
          </Button>
          <Button color="inherit">検索</Button>

          {accessToken && (
            <>
              <Button color="inherit">あなたのライブラリ</Button>

              <Button color="inherit">プロフィール</Button>

              <Button color="inherit" onClick={signOut}>
                ログアウト
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};
