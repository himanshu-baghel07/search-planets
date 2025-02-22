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
      enterButton
      style={{
        "--ant-primary-color": "#1890ff", // Ant Design's default blue
        "--ant-primary-color-hover": "#40a9ff",
      }}
    />
  );
};

export default SearchBar;
