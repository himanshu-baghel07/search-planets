import { Card, Typography } from "antd";
import React from "react";

const PlanetCard = ({ planet }) => {
  const { Title, Text } = Typography;
  return (
    <Card hoverable className="mb-4 fade-in">
      <Title level={4}>{planet.name}</Title>
      <Text type="secondary">{planet.description}</Text>
    </Card>
  );
};

export default PlanetCard;
