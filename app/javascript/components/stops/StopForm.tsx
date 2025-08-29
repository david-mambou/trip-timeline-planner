import { Button, Heading, HStack } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmptyObject } from "../../helpers/helpers";
import type { Trip } from "../trips/Trips";
import type { Stay, Stop } from "../trips/TripPage";
import snakecaseKeys from "snakecase-keys";
import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import LoadingPage from "../routes/LoadingPage";
import camelcaseKeys from "camelcase-keys";
import { format } from "date-fns";

type StopFormProps = {
  trip: Trip;
  stays: Stay[];
  inputMode: "create" | "update";
};

type CreateStopRequest = Omit<Stop, "id">;

export default function StopForm({ trip, stays, inputMode }: StopFormProps) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [stop, setStop] = useState<Stop>();
  const { stopId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (!stopId) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/stops/${stopId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        const camelcasedData = camelcaseKeys(data);
        setStop(camelcasedData);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [stopId]);

  const createStop = async (stop: CreateStopRequest) => {
    const snakecasedStop = snakecaseKeys(stop);
    try {
      const response = await window.fetch("/api/stops", {
        method: "POST",
        body: JSON.stringify(snakecasedStop),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Stop added!");
      navigate(`/trips/${trip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStop = async (stop: CreateStopRequest) => {
    const snakecasedStop = snakecaseKeys(stop);
    try {
      const response = await window.fetch(`/api/stops/${stopId}`, {
        method: "PUT",
        body: JSON.stringify(snakecasedStop),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Stop updated!");
      navigate(`/trips/${trip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const validateStop = (stop: CreateStopRequest) => {
    const errors: Record<string, string> = {};
    if (stop.name.length < 1) {
      errors.name = "Name must be at least one character";
    }
    return errors;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      stayId: { value: number };
      startDay: { value: string };
      endDay: { value: string };
    };
    const errors = validateStop({
      name: target.name.value,
      tripId: trip.id,
      startDay: new Date(target.startDay.value),
      endDay: new Date(target.endDay.value),
      stayId: target.stayId.value,
    });

    if (isEmptyObject(errors)) {
      inputMode === "create"
        ? createStop({
            name: target.name.value,
            tripId: trip.id,
            startDay: new Date(target.startDay.value),
            endDay: new Date(target.endDay.value),
            stayId: target.stayId.value,
          })
        : updateStop({
            name: target.name.value,
            tripId: trip.id,
            startDay: new Date(target.startDay.value),
            endDay: new Date(target.endDay.value),
            stayId: target.stayId.value,
          });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Heading my={4} size="md">
        {inputMode === "create" ? `Add stop to ${trip.name}` : `Edit stop ${stop?.name}`}
      </Heading>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <CustomInput defaultValue={stop?.name} name="name" placeholder="France" />
        <label htmlFor="startDay">Start</label>
        <CustomInput defaultValue={stop && format(stop.startDay, "yyyy-MM-dd")} name="startDay" type="date" />
        <label htmlFor="endDay">End</label>
        <CustomInput defaultValue={stop && format(stop.endDay, "yyyy-MM-dd")} name="endDay" type="date" />
        <label htmlFor="stay">Stay</label>
        <CustomSelect defaultValue={stop?.stayId} name="stayId">
          {stays.map((stay, i) => (
            <option key={i} value={stay.id}>
              {stay.name}
            </option>
          ))}
          <option value={0}>Other...</option>
        </CustomSelect>
        <HStack justify="space-between" mt={4} mb={4}>
          <Button colorScheme="blackAlpha" onClick={() => navigate(inputMode === "create" ? "./../.." : "./../../..")}>
            Back to trip
          </Button>
          <Button colorScheme="blue" type="submit">
            {inputMode === "create" ? "Add stop" : "Edit stop"}
          </Button>
        </HStack>
      </form>
    </>
  );
}
