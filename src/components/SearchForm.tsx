import { useState, FormEvent } from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchFormProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSubmit, isLoading = false }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSubmit(searchQuery);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        fullWidth
        label="曲名やアーティスト名で検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading || !searchQuery.trim()}
      >
        検索
      </Button>
    </Box>
  );
};

export default SearchForm;
