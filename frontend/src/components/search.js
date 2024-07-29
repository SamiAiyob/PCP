import { CButton } from "@coreui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `public-search/?q=${query}`,
      );
      navigate("/search-results", { state: { results: response.data } });
    } catch (error) {
      console.error("Error during search", error);
    }
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search skills"
        required
      />
      <CButton
        type="submit"
        style={{ backgroundColor: "#1d899a", color: "white" }}
      >
        Search
      </CButton>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    marginRight: "5px",
  },
  button: {
    color: "#106372",
    marginTop: "0",
  },
};

export default Search;
