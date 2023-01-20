import { Button, Input } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../helpers/helpers";
import type { Trip } from "./Trips";

type CreateTripRequest = Omit<Trip, "id">;

export default function TripForm() {
  const navigate = useNavigate();

  const createTrip = async (trip: CreateTripRequest) => {
    try {
      const response = await window.fetch("/api/trips", {
        method: "POST",
        body: JSON.stringify(trip),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedTrip = await response.json();
      window.alert("Trip added!");
      navigate(`/trips/${savedTrip.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const validateTrip = (trip: CreateTripRequest) => {
    const errors: Record<string, string> = {};
    if (trip.name.length < 1) {
      errors.name = "Name must be at least one character";
    }
    return errors;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const errors = validateTrip({ name: target.name.value });
    console.log(target.name.value);

    if (isEmptyObject(errors)) {
      createTrip({ name: target.name.value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <Input name="name" placeholder="France" />
      <Button type="submit">Add trip</Button>
    </form>
  );
}
