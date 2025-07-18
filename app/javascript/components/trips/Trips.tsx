import { Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";

export type Trip = {
  id: number;
  name: string;
};

export default function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/trips");
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
  }, []);

  return (
    <>
      <SimpleGrid columns={4} spacing={8}>
        {trips.map((trip, idx) => (
          <TripCard key={idx} trip={trip} />
        ))}
      </SimpleGrid>
      <Button onClick={() => navigate("./new")}>Add Trip</Button>
    </>
  );
}
