"use client";
import {
  Card,
  Checkbox,
  Collapse,
  Divider,
  notification,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { fetchColors, fetchShapes, fetchSizes } from "../services/api";
import { useDispatch } from "react-redux";
import { setDescription } from "../redux/store/planetsSlice";

/*
 * This component renders a set of filters (color, shape, size) as checkboxes.
 * It fetches filter options from the API and allows the user to select/deselect filters.
 * Selected filters are passed back to the parent component via the `onChange` prop.
 */

const Filters = ({ filters, onChange }) => {
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { Title, Text } = Typography;

  const loadFilters = async () => {
    setLoading(true);

    try {
      // Fetch all data concurrently
      const colorsData = await fetchColors();
      const shapesData = await fetchShapes();
      const sizesData = await fetchSizes();

      // Check if any of the API calls failed
      if (colorsData.error || shapesData.error || sizesData.error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch some data. Please try again later.",
        });
        return; // Exit early if there's an error
      }

      if (!colorsData.error) setColors(colorsData);
      if (!shapesData.error) setShapes(shapesData);
      if (!sizesData.error) setSizes(sizesData);

      // Transform the data into the desired structure
      const transformedData = {
        color: colorsData.reduce((acc, color) => {
          acc[color.id] = color;
          return acc;
        }, {}),
        shape: shapesData.reduce((acc, shape) => {
          acc[shape.id] = shape;
          return acc;
        }, {}),
        size: sizesData.reduce((acc, size) => {
          acc[size.id] = size;
          return acc;
        }, {}),
      };
      dispatch(setDescription(transformedData));
      // Store the transformed data in the state
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const collapseItems = [
    {
      key: "1",
      label: "Filters",
      children: (
        <Space direction="vertical" className="w-full" size="large">
          {/* Color Filter */}
          <div>
            <Text strong className="text-xl mb-2 block">
              Color
            </Text>
            <Checkbox.Group
              className="w-auto flex flex-col gap-2"
              onChange={(values) => onChange("color", values)}
              value={filters.color}
            >
              {colors?.map((color) => (
                <Checkbox
                  key={color.id}
                  value={color.id}
                  className="flex items-center"
                >
                  <Text className="text-lg"> {color.name}</Text>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className="my-0" />
          {/* Shape Filter */}
          <div>
            <Text strong className="text-xl mb-2 block">
              Shape
            </Text>
            <Checkbox.Group
              className="w-full flex flex-col gap-2"
              onChange={(values) => onChange("shape", values)}
              value={filters.shape}
            >
              {shapes?.map((shape) => (
                <Checkbox key={shape.id} value={shape.id}>
                  <Text className="text-lg">{shape.name}</Text>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className="my-0" />
          {/* Size Filter */}
          <div>
            <Text strong className="text-xl mb-2 block">
              Size
            </Text>
            <Checkbox.Group
              className="w-full flex flex-col gap-2"
              onChange={(values) => onChange("size", values)}
              value={filters.size}
            >
              {sizes?.map((size) => (
                <Checkbox key={size.id} value={size.id}>
                  <Text className="text-lg"> {size.name}</Text>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadFilters();
  }, []);

  return loading ? (
    <div className="sticky top-4 w-full flex justify-center items-center transition-opacity duration-300">
      <Spin size="large" />
    </div>
  ) : (
    <>
      {/* Desktop View */}
      <div className="hidden md:block sticky top-4 fade-in">
        <Title level={4} className="mb-4">
          Filters
        </Title>
        <Space direction="vertical" className="w-auto" size="large">
          <div>
            <Text strong className="mb-2 block">
              Color
            </Text>
            <Checkbox.Group
              className=" w-auto flex flex-col gap-2"
              onChange={(values) => onChange("color", values)}
              value={filters.color}
            >
              {colors?.map((color) => (
                <Checkbox key={color.id} value={color.id}>
                  {color.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className="my-0" />
          <div>
            <Text strong className="mb-2 block">
              Shape
            </Text>
            <Checkbox.Group
              className="w-full flex flex-col gap-2"
              onChange={(values) => onChange("shape", values)}
              value={filters.shape}
            >
              {shapes?.map((shape) => (
                <Checkbox key={shape.id} value={shape.id}>
                  {shape.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
          <Divider className="my-0" />
          <div>
            <Text strong className="mb-2 block">
              Size
            </Text>
            <Checkbox.Group
              className="w-full flex flex-col gap-2"
              onChange={(values) => onChange("size", values)}
              value={filters.size}
            >
              {sizes?.map((size) => (
                <Checkbox key={size.id} value={size.id}>
                  {size.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </Space>
      </div>

      {/* Mobile/Tablet View */}
      <div className="block md:hidden mb-2">
        <Collapse items={collapseItems} defaultActiveKey={[]} />
      </div>
    </>
  );
};

export default Filters;
