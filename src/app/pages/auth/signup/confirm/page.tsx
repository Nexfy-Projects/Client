"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type FormData = {
  fullName: string;
  email: string;
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
    router.push("../");
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful registration
    localStorage.removeItem("signupForm"); // Clear the saved form data
    router.push("./confirm/complete");
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
