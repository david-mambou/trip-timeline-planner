import { Button, Input } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../helpers/helpers";
import type { Trip } from "./Trips";

type CreateTripRequest = Omit<Trip, "id">;

type TripFormProps =
  | {
      trip?: undefined;
      inputMode: "create";
    }
  | {
      trip: Trip;
      inputMode: "update";
    };

export default function TripForm({ trip, inputMode }: TripFormProps) {
  const navigate = useNavigate();

  const createTrip = async (trip: CreateTripRequest) => {
    try {
      const response = await window.fetch("/api/trips", {
        method: "POST",
        body: JSON.stringify(trip),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const updateTrip = async (trip: Trip) => {
    try {
      const response = await window.fetch(`/api/trips/${trip.id}`, {
        method: "PUT",
        body: JSON.stringify(trip),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Trip updated!");
      navigate(`/trips/${trip.id}`);
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
      inputMode === "create"
        ? createTrip({ name: target.name.value })
        : updateTrip({ id: trip?.id, name: target.name.value });
    }
  };

  return (
    <>
      <Button onClick={() => navigate("./..")}>Back to Trips</Button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input defaultValue={trip?.name} name="name" placeholder="France" />
        <Button type="submit">{inputMode === "create" ? "Add trip" : "Update trip"}</Button>
      </form>
    </>
  );
}
