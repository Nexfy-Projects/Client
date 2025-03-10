"use client";

import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSubmit, isLoading = false }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1 }}
    >
      <TextField
        fullWidth
        label="曲名・アーティスト名を入力"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SearchIcon />
          )
        }
      >
        検索
      </Button>
    </Box>
  );
}
