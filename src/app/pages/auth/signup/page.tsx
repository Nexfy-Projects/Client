"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required("フルネームは必須です"),
    email: yup
      .string()
      .email("有効なメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    password: yup
      .string()
      .min(8, "パスワードは8文字以上である必要があります")
      .required("パスワードは必須です"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "パスワードが一致しません"),
    phoneNumber: yup.string().matches(/^[0-9]*$/, "数字のみ入力してください"),
    address: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Signup() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: JSON.parse(localStorage.getItem("signupForm") || "{}"),
  });

  const watchAllFields = watch();

  useEffect(() => {
    localStorage.setItem("signupForm", JSON.stringify(watchAllFields));
  }, [watchAllFields]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("./signup/confirm");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Nexfyに登録
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="フルネーム"
              autoFocus
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
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
              autoComplete="new-password"
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
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="パスワード（確認）"
              type="password"
              id="confirmPassword"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="電話番号（任意）"
              id="phoneNumber"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
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
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="住所（任意）"
              id="address"
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "& textarea": { color: "white" },
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
          次へ
        </Button>
      </Box>
    </Container>
  );
}
