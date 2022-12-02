import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripIntroCard from "./TripIntroCard";
import { Trip } from "./Trips";

export default function TripPage() {
  const [trip, setTrip] = useState<Trip>();
  const [stops, setStops] = useState();
  const [stays, setStays] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/trips/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setTrip(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      try {
        const response = await window.fetch(`/api/stops/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setStops(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      try {
        const response = await window.fetch(`/api/stays`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setStays(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (trip) {
    console.log(stops);
    return (
      <>
        <TripIntroCard trip={trip} />
        <VStack>
          {stops?.map((stop, idx) => (
            <>
              <h3 key={idx}>{stop.name}</h3>
              <div>Start: {stop.start_day}</div>
              <div>End: {stop.end_day}</div>
              <div>Staying at: {stays?.find((s) => s.id === stop.stay_id).name}</div>
            </>
          ))}
        </VStack>
      </>
    );
  }
}
