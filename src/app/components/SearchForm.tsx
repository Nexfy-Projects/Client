import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchFormProps {
  onSearch: (search: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [search, setSearch] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <Box mt={4} textAlign="center">
      <form onSubmit={handleSubmit}>
        <TextField
          label="曲名・アーティスト名"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            color: "white",
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "& input": { color: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        />
        <Button type="submit" variant="contained">
          検索
        </Button>
      </form>
    </Box>
  );
};
