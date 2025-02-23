"use client";
import SearchBar from "./components/SearchBar";
import { Col, Row, Spin, Typography } from "antd";
import Filters from "./components/Filters";
import { useDispatch, useSelector } from "react-redux";
import PlanetCard from "./components/PlanetCard";
import { Suspense, useEffect, useState } from "react";
import { fetchPlanets } from "./services/api";
import {
  setFilters,
  setPlanets,
  setSearchText,
} from "./redux/store/planetsSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function HomePageContent() {
  // Extract state from Redux store
  const { planets, filters, searchText, description } = useSelector(
    (state) => state.planets
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Function to fetch planets data based on parameters
  const fetchData = async (paramsOverride = null) => {
    setLoading(true);
    try {
      // Use provided params or build from current state
      const params = paramsOverride || {};
      if (!paramsOverride) {
        if (searchText) params.q = searchText;
        if (filters.color.length > 0) params.color = filters.color; // Array of colors
        if (filters.shape.length > 0) params.shape = filters.shape; // Array of shapes
        if (filters.size.length > 0) params.size = filters.size; // Array of sizes
      }

      // Pass params directly to your existing fetchPlanets method
      const data = await fetchPlanets(params);
      dispatch(setPlanets(data));
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to initialize state and fetch data based on URL parameters
  const initializeFromURL = async () => {
    // Extract query parameters from the URL
    const q = searchParams.get("q"); // Get search text
    const colors = searchParams.getAll("color");
    const shapes = searchParams.getAll("shape");
    const sizes = searchParams.getAll("size");

    // Build initial params object for immediate fetch
    const initialParams = {};
    if (q) initialParams.q = q;
    if (colors.length > 0) initialParams.color = colors; // Array of colors
    if (shapes.length > 0) initialParams.shape = shapes; // Array of shapes
    if (sizes.length > 0) initialParams.size = sizes; // Array of sizes

    // Update Redux state with URL parameters
    if (q) dispatch(setSearchText(q)); // Update search text in Redux
    dispatch(
      setFilters({
        color: colors.length > 0 ? colors : [],
        shape: shapes.length > 0 ? shapes : [],
        size: sizes.length > 0 ? sizes : [],
      })
    );

    // Fetch data with URL parameters directly
    await fetchData(initialParams);
  };

  useEffect(() => {
    initializeFromURL();
  }, [searchParams]); // Re-run when searchParams change

  // Function to create a query string for URL updates
  const createQueryString = (name, values) => {
    const params = new URLSearchParams();
    // Copy existing query parameters except the one being updated
    for (const [key, value] of searchParams.entries()) {
      if (key !== name) params.append(key, value);
    }

    if (values) {
      if (Array.isArray(values)) {
        // Append each value for arrays (e.g., filters)
        values.forEach((value) => params.append(name, value));
      } else {
        // Append a single value (e.g., search text)
        params.set(name, values);
      }
    }

    return params.toString(); // Return the query string
  };

  // Function to handle search input
  const handleSearch = async (value) => {
    const queryString = createQueryString("q", value); // Create query string with search text
    router.push(`${pathname}?${queryString}`); // Update URL with new query string
    dispatch(setSearchText(value)); // Update Redux state with the searched text
  };

  // Function to handle input changes (e.g., typing in the search bar)
  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchText(value)); // Update Redux state as the user types

    if (!value.trim()) {
      handleSearch(""); // Reset search if input is empty
    }
  };

  // Function to handle filter changes
  const handleFilterChange = async (filterType, values) => {
    const queryString = createQueryString(filterType, values); // Create query string with updated filters
    router.push(`${pathname}?${queryString}`); // Update URL with new query string
    dispatch(setFilters({ ...filters, [filterType]: values })); // Update Redux state with new filters
  };

  // Function to reset filters and search text
  const resetFiltersAndSearch = async () => {
    // Reset Redux state
    dispatch(setSearchText(""));
    dispatch(setFilters({ color: [], shape: [], size: [] }));

    // Clear URL parameters
    router.push(pathname);

    // Fetch data without any filters
    await fetchData({});
  };

  return (
    <div className="container animate-fade-in">
      <div className="border bg-[url('/nav_bg_image.jpg')] bg-cover bg-center bg-no-repeat p-2 rounded-md border-blue-950 mb-3">
        <h2
          className=" text-3xl cursor-pointer flex justify-center items-center font-bold mb-8 text-slate-200 drop-shadow-[red]"
          onClick={resetFiltersAndSearch}
        >
          <img
            src="./solar_system_icon.svg"
            alt="solar system"
            height={30}
            width={30}
            style={{ backgroundColor: "#f5f5f5", borderRadius: "50px" }}
          />{" "}
          Planet Explorer
        </h2>
        {/* SearchBar component for searching planets */}
        <SearchBar
          value={searchText}
          onSearch={handleSearch}
          onChange={handleInputChange}
        />
      </div>

      <Row gutter={32} className="p-1">
        <Col xs={24} md={4} lg={3}>
          {/* Filters component for filtering planets */}
          <Filters filters={filters} onChange={handleFilterChange} />
        </Col>

        {/* Main content area to display planets or loading state */}
        <Col xs={24} md={20} lg={21} className="md:border-l border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center h-full relative">
              <span className="loader absolute top-2"></span>
            </div>
          ) : (
            // Display planets or a message if no planets are found
            <Row gutter={[16, 16]}>
              {planets?.length > 0 ? (
                planets.map((planet) => (
                  <Col xs={24} sm={24} lg={12} key={planet.id}>
                    <PlanetCard planet={planet} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No planets found</p>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
