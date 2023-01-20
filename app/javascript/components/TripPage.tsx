import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import StopForm from "./StopForm";
import TripDetails from "./TripDetails";
import TripIntroCard from "./TripIntroCard";
import { Trip } from "./Trips";

export type Stop = {
  id?: number;
  name: string;
  stay_id?: number;
  trip_id: number;
  start_day: Date;
  end_day: Date;
  inbound_id?: number;
  outbound_id?: number;
};

export type Stay = {
  id: number;
  name: string;
  price: number;
};

export type Activity = {
  id: number;
  name: string;
  price: number;
};

export type Transfer = {
  id: number;
  mode: string;
  departure_time: string;
  arrival_time: string;
  pickup_point: string;
  price: number;
};

export default function TripPage() {
  const navigate = useNavigate();
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
            [stop.id as number]: data,
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
        <Button onClick={() => navigate("./..")}>Back to Trips</Button>
        <TripIntroCard trip={trip} />

        <Routes>
          <Route
            index
            element={<TripDetails stops={stops} stays={stays} transfers={transfers} activities={activities} />}
          />
          <Route path="stops/new" element={<StopForm stays={stays} trip={trip} />} />
        </Routes>
      </>
    );
  } else {
    return <></>;
  }
}
