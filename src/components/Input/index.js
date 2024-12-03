import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      clearTimeout(timeoutRef.current);
      props.onSearch("");
      setIsLoading(false);
      return;
    }

    clearTimeout(timeoutRef.current);

    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      props.onSearch(value);
      setIsLoading(false);
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clearTimeout(timeoutRef.current);
      if (inputValue.trim() !== "") {
        props.onSearch(inputValue);
      }
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = () => {
    clearTimeout(timeoutRef.current);
    if (inputValue.trim() !== "") {
      props.onSearch(inputValue);
    }
    setIsLoading(false);
  };

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
      position: "relative",
    },
    input: {
      flexGrow: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
      transition: "box-shadow 0.2s ease, outline 0.2s ease",
      outline: isFocused ? "2px solid rgba(155, 155, 155, 0.5)" : "none",
      boxShadow: isFocused ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: "medium",
    },
    button: {
      padding: "7px 15px",
      border: "none",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
      backgroundColor: "#000000",
      color: "#FFFFFF",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: "bold",
    },
    loading: {
      position: "absolute",
      right: "10px",
    },
  };

  return (
    <div style={styles.inputContainer}>
      <input
        style={styles.input}
        type={props.type}
        placeholder={props.placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} style={styles.button}>
        <SearchIcon />
      </button>
      {isLoading && <CircularProgress size={20} style={styles.loading} />}
    </div>
  );
};

export default Input;
