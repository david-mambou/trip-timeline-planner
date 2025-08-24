import { Button, Heading, HStack, Input, Select } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../helpers/helpers";
import type { Trip } from "../trips/Trips";
import type { Stay, Stop } from "../trips/TripPage";
import snakecaseKeys from "snakecase-keys";

type StopFormProps = {
  trip: Trip;
  stays: Stay[];
};

type CreateStopRequest = Omit<Stop, "id">;

export default function StopForm({ trip, stays }: StopFormProps) {
  const navigate = useNavigate();

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
      createStop({
        name: target.name.value,
        tripId: trip.id,
        startDay: new Date(target.startDay.value),
        endDay: new Date(target.endDay.value),
        stayId: target.stayId.value,
      });
    }
  };

  return (
    <>
      <Heading my={4} size="md">
        Add stop
      </Heading>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input name="name" placeholder="France" />
        <label htmlFor="startDay">Start</label>
        <Input name="startDay" type="date" />
        <label htmlFor="endDay">End</label>
        <Input name="endDay" type="date" />
        <label htmlFor="stay">Stay</label>
        <Select name="stayId">
          {stays.map((stay, i) => (
            <option key={i} value={stay.id}>
              {stay.name}
            </option>
          ))}
          <option value={0}>Other...</option>
        </Select>
        <HStack justify="space-between" mt={4} mb={4}>
          <Button colorScheme="blackAlpha" onClick={() => navigate("./../..")}>
            Back to trip
          </Button>
          <Button colorScheme="blue" type="submit">
            Add stop
          </Button>
        </HStack>
      </form>
    </>
  );
}
