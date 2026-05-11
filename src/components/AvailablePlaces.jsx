import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/placess");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places!");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({ message: error.message || "Something went wrong!" });
      }

      setIsLoading(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage
        title="An error occurred!"
        message={error.message}
        onConfirm={() => setError(null)}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading available places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
