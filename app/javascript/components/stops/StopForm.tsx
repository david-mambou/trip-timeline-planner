import { Button, Input, Select } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../helpers/helpers";
import type { Trip } from "../trips/Trips";
import type { Stay, Stop } from "../trips/TripPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import snakecaseKeys from "snakecase-keys";

type StopFormProps = {
  trip: Trip;
  stays: Stay[];
};

type CreateStopRequest = Omit<Stop, "id">;

export default function StopForm({ trip, stays }: StopFormProps) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const createStop = async (stop: CreateStopRequest) => {
    const snakecasedStop = snakecaseKeys(stop);
    try {
      const response = await window.fetch("/api/stops", {
        method: "POST",
        body: JSON.stringify(snakecasedStop),
        headers: {
          Accept: "application/json",
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
    };
    const errors = validateStop({
      name: target.name.value,
      tripId: trip.id,
      startDay: startDate,
      endDay: endDate,
      stayId: target.stayId.value,
    });

    if (isEmptyObject(errors)) {
      createStop({
        name: target.name.value,
        tripId: trip.id,
        startDay: startDate,
        endDay: endDate,
        stayId: target.stayId.value,
      });
    }
  };

  return (
    <>
      <Button onClick={() => navigate("./../..")}>Back to Trip</Button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input name="name" placeholder="France" />
        <label htmlFor="start">Start</label>
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        <label htmlFor="end">End</label>
        <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
        <label htmlFor="stay">Stay</label>
        <Select name="stayId">
          {stays.map((stay, i) => (
            <option key={i} value={stay.id}>
              {stay.name}
            </option>
          ))}
          <option value={0}>Other...</option>
        </Select>
        <Button type="submit">Add stop</Button>
      </form>
    </>
  );
}
