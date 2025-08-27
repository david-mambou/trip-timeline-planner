import { Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TripCard from "./TripCard";

export type Trip = {
  id: number;
  name: string;
};

export default function Trips() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/trips", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [location.key]);

  return (
    <>
      <SimpleGrid alignItems="center" columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        {trips.map((trip, idx) => (
          <TripCard key={idx} trip={trip} />
        ))}
        <Button colorScheme="blue" onClick={() => navigate("./new")}>
          Add Trip
        </Button>
      </SimpleGrid>
    </>
  );
}
