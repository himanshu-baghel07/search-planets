import { Input } from "antd";
import React from "react";

const SearchBar = ({ value, onSearch, onChange }) => {
  return (
    <div className=" flex justify-center">
      <Input.Search
        placeholder="Search planets..."
        value={value}
        onSearch={onSearch}
        onChange={onChange}
        size="large"
        className="mb-6 w-full sm:w-1/2"
        enterButton
        style={{
          "--ant-primary-color": "#1890ff", // Ant Design's default blue
          "--ant-primary-color-hover": "#40a9ff",
        }}
      />
    </div>
  );
};

export default SearchBar;
