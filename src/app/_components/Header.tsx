"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
// import { signIn } from 'next-auth/react';

export const Header = () => {
  const router = useRouter();
  const [signined] = useState(false);
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
        <ListItem component="a">
          <ListItemText primary="あなたのライブラリ" />
        </ListItem>
        {!signined && (
          <>
            <ListItem
              component="a"
              onClick={() => router.push("/pages/auth/signup")}
            >
              <ListItemText primary="新規登録" />
            </ListItem>
            <ListItem
              component="a"
              onClick={() => router.push("/pages/auth/signin")}
            >
              <ListItemText primary="サインイン" />
            </ListItem>
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
          <Button
            color="inherit"
            onClick={() => router.push("/pages/library/[...id]")}
          >
            あなたのライブラリ
          </Button>

          {signined ? (
            <Avatar alt="user" src="/path-to-profile-image.jpg" />
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => router.push("/pages/auth/signup")}
              >
                新規登録
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push("/pages/auth/signin")}
              >
                ログイン
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
