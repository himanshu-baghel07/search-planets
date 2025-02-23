import { Card, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const PlanetCard = ({ planet }) => {
  // Extracting the `description` object from the Redux store's `planets` state
  const { description } = useSelector((state) => state.planets);

  // Object mapping planet names to their corresponding image paths
  const planetImages = {
    Earth: "/earth_icon.svg",
    Jupitor: "/jupiter_icon.svg", // Note: "Jupitor" is misspelled (should be "Jupiter")
    Venus: "/venus_icon.svg",
    Mercury: "/mercury_icon.svg",
    Mars: "/mars_icon.svg",
    Saturn: "/saturn_icon.svg",
    Uranus: "/uranus_icon.svg",
    Neptune: "/neptune_icon.svg",
  };

  // Object mapping planet names to their corresponding informational links
  const planetInfoLink = {
    Earth: "https://science.nasa.gov/earth/facts/",
    Jupitor: "https://science.nasa.gov/jupiter/",
    Venus: "https://science.nasa.gov/venus/",
    Mercury: "https://science.nasa.gov/mercury/",
    Mars: "https://science.nasa.gov/mars/",
    Saturn: "https://science.nasa.gov/saturn/",
    Uranus: "https://science.nasa.gov/uranus/",
    Neptune: "https://science.nasa.gov/neptune/",
  };

  // Function to generate a formatted description for the planet
  const generateDescription = (planet, description) => {
    const colorName = description.color[planet.color]?.name || "unknown color";
    const shapeName = description.shape[planet.shape]?.name || "unknown shape";
    const sizeName = description.size[planet.size]?.name || "unknown size";

    // Return a formatted string describing the planet's color, shape, and size
    return `${
      planet.name === "Jupitor" ? "Jupiter" : planet.name // Correcting the spelling of "Jupiter"
    } has ${colorName?.toLowerCase()} color, ${shapeName?.toLowerCase()} shape, and is ${sizeName?.toLowerCase()} in size`;
  };

  const formattedDescription = generateDescription(planet, description);
  const { Title, Text } = Typography;
  return (
    <Card
      hoverable
      className="mb-4 fade-in "
      onClick={() => {
        // Opens the planet's informational link in a new tab when the card is clicked
        window.open(
          planetInfoLink[planet?.name], // Get the link for the current planet
          "_blank",
          "noopener,noreferrer"
        );
      }}
    >
      {/* Planet image displayed at the top-right corner of the card */}
      <img
        className=" absolute top-0 right-0"
        src={planetImages[planet?.name]}
        alt={planetImages[planet?.name]}
        height={50}
        width={50}
      />
      <Title level={4}>
        {planet?.name === "Jupitor" ? "Jupiter" : planet?.name}{" "}
        {/* Fixed spelling of "Jupiter" */}
      </Title>
      <Text type="secondary">{formattedDescription}</Text>
    </Card>
  );
};

export default PlanetCard;
