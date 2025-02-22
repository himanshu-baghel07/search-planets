import { Card, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const PlanetCard = ({ planet }) => {
  const { description } = useSelector((state) => state.planets);

  const generateDescription = (planet, description) => {
    const colorName = description.color[planet.color]?.name || "unknown color";
    const shapeName = description.shape[planet.shape]?.name || "unknown shape";
    const sizeName = description.size[planet.size]?.name || "unknown size";

    return `${planet.name} ${colorName} color, ${shapeName} shape, and ${sizeName} size`;
  };

  const formattedDescription = generateDescription(planet, description);
  const { Title, Text } = Typography;
  return (
    <Card hoverable className="mb-4 fade-in">
      <Title level={4}>{planet.name}</Title>
      <Text type="secondary">{formattedDescription}</Text>
    </Card>
  );
};

export default PlanetCard;
