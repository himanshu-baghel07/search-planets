"use client";
import {
  Card,
  Checkbox,
  Divider,
  notification,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { fetchColors, fetchShapes, fetchSizes } from "../services/api";

/*
 * This component renders a set of filters (color, shape, size) as checkboxes.
 * It fetches filter options from the API and allows the user to select/deselect filters.
 * Selected filters are passed back to the parent component via the `onChange` prop.
 */

const Filters = ({ filters, onChange }) => {
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState();

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
      }

      if (!colorsData.error) setColors(colorsData);
      if (!shapesData.error) setShapes(shapesData);
      if (!sizesData.error) setSizes(sizesData);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  ) : (
    <Card className="sticky top-4 fade-in">
      <Title level={4} className="mb-4">
        Filters
      </Title>
      <Space direction="vertical" className="w-full" size="large">
        <div>
          <Text strong className="mb-2 block">
            Color
          </Text>
          <Checkbox.Group
            className="w-full flex flex-col gap-2"
            onChange={(values) => onChange("color", values)}
            value={filters.color}
          >
            {colors?.map((color) => (
              <Checkbox key={color.id} value={color.id}>
                <Space>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </Space>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
        <Divider className="my-2" />
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
        <Divider className="my-2" />
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
    </Card>
  );
};

export default Filters;
