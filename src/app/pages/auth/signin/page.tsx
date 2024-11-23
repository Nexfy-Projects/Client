"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("有効なメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    password: yup.string().required("パスワードは必須です"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Here you would typically handle the sign-in process
    console.log("Sign in attempt with:", data);
    // For now, we'll just simulate a successful sign-in
    router.push("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Nexfyにサインイン
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "& input": { color: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "& input": { color: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
              }}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          サインイン
        </Button>
      </Box>
    </Container>
  );
}
