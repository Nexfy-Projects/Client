"use client";

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import supabase from "@/app/api/supabase/init";
import { revalidatePath } from "next/cache";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
};

export default function SignupConfirm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("signupForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleBack = () => {
    router.push("../signup");
  };

  const handleSubmit = async () => {
    const data = {
      email: formData?.email as string,
      password: formData?.password as string,
    };
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.error("Error signing up:", error.message);
      return;
    }
    localStorage.setItem("si", JSON.stringify(formData));
    localStorage.removeItem("signupForm");
    revalidatePath("/auth/signup/confirm");
    redirect("/auth/signup/confirm/complete");
  };

  if (!formData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        入力内容の確認
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="フルネーム" secondary={formData.fullName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="メールアドレス" secondary={formData.email} />
        </ListItem>
        <ListItem hidden>
          <ListItemText primary="パスワード" secondary={formData.password} />
        </ListItem>
        {formData.phoneNumber && (
          <ListItem>
            <ListItemText primary="電話番号" secondary={formData.phoneNumber} />
          </ListItem>
        )}
        {formData.address && (
          <ListItem>
            <ListItemText primary="住所" secondary={formData.address} />
          </ListItem>
        )}
      </List>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          type="button"
          onClick={handleBack}
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        >
          戻る
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          次へ
        </Button>
      </Box>
    </Container>
  );
}
