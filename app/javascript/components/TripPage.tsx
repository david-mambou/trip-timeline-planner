import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripIntroCard from "./TripIntroCard";
import { Trip } from "./Trips";

type Stop = {
  id: number;
  name: string;
  stay_id: number;
  trip_id: number;
  start_day: string;
  end_day: string;
  inbound_id?: number;
  outbound_id?: number;
};

type Stay = {
  id: number;
  name: string;
  price: number;
};

type Activity = {
  id: number;
  name: string;
  price: number;
};

type Transfer = {
  id: number;
  mode: string;
  departure_time: string;
  arrival_time: string;
  pickup_point: string;
  price: number;
};

export default function TripPage() {
  const [trip, setTrip] = useState<Trip>();
  const [stops, setStops] = useState<Stop[]>([]);
  const [stays, setStays] = useState<Stay[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [activities, setActivities] = useState<{ [index: number]: Activity[] }>({});
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
      try {
        const response = await window.fetch(`/api/transfers`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setTransfers(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchActivities = () => {
      stops?.map(async (stop) => {
        try {
          const response = await window.fetch(`/api/stops/${stop.id}/activities`);
          if (!response.ok) throw Error(response.statusText);
          const data = await response.json();
          setActivities((prev) => ({
            ...prev,
            [stop.id]: data,
          }));
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
      });
    };

    fetchActivities();
  }, [stops]);

  if (trip) {
    return (
      <>
        <TripIntroCard trip={trip} />
        <VStack>
          {stops?.map((stop, idx) => (
            <>
              <h3 key={idx}>{stop.name}</h3>
              <div>Start: {stop.start_day}</div>
              <div>End: {stop.end_day}</div>
              <div>Staying at: {stays?.find((s) => s.id === stop.stay_id)?.name}</div>
              {activities[stop.id] && (
                <div>Activities: {activities[stop.id].map((activity) => activity.name).join(", ")}</div>
              )}
              {stop.outbound_id && <div>Leaving by: {transfers?.find((t) => t.id === stop.outbound_id)?.mode}</div>}
            </>
          ))}
        </VStack>
      </>
    );
  }
}
