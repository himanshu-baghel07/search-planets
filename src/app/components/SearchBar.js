import { Input } from "antd";
import React from "react";

const SearchBar = ({ value, onSearch, onChange }) => {
  return (
    <Input.Search
      placeholder="Search planets..."
      value={value}
      onSearch={onSearch}
      onChange={onChange}
      size="large"
      className="mb-6"
    />
  );
};

export default SearchBar;
