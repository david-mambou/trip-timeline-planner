import { Button, Input, Select } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmptyObject } from "~/javascript/helpers/helpers";
import { Transfer, TransferMode } from "../trips/TripPage";
import { Trip } from "../trips/Trips";
import snakecaseKeys from "snakecase-keys";

type TransferFormProps = {
  trip: Trip;
};

type CreateTransferRequest = Omit<Transfer, "id"> & { isOutboundOf?: number; isInboundOf?: number };

const modes: { value: TransferMode; label: string }[] = [
  { value: "flight", label: "✈️ Flight" },
  { value: "train", label: "🚄 Train" },
  { value: "bus", label: "🚍 Bus" },
  { value: "taxi", label: "🚕 Taxi" },
  { value: "rentalcar", label: "🚙 Rental car" },
  { value: "rentalbike", label: "🏍️ Rental bike" },
  { value: "boat", label: "⛴️ Boat" },
];

export default function TransferForm({ trip }: TransferFormProps) {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(modes[0] && modes[0].value);

  const [searchParams] = useSearchParams();
  const isOutboundOfStr = searchParams.get("isOutboundOf");
  const isInboundOfStr = searchParams.get("isInboundOf");
  let isOutboundOf: number | undefined, isInboundOf: number | undefined;
  if (isOutboundOfStr) {
    isOutboundOf = parseInt(isOutboundOfStr);
  }
  if (isInboundOfStr) {
    isInboundOf = parseInt(isInboundOfStr);
  }

  const createTransfer = async (transfer: CreateTransferRequest) => {
    const snakecasedTransfer = snakecaseKeys(transfer);
    try {
      const response = await window.fetch("/api/transfers", {
        method: "POST",
        body: JSON.stringify(snakecasedTransfer),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);

      window.alert("Transfer added!");
      navigate(`/trips/${trip.id}`);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mode: { value: TransferMode };
      departureTime: { value: string };
      arrivalTime: { value: string };
      pickupPoint: { value: string };
      price: { value: number };
    };
    const errors = validateTransfer({
      isOutboundOf,
      isInboundOf,
      mode: target.mode.value,
      departureTime: new Date(target.departureTime.value),
      arrivalTime: new Date(target.arrivalTime.value),
      pickupPoint: target.pickupPoint.value,
      price: target.price.value,
    });

    if (isEmptyObject(errors)) {
      await createTransfer({
        isOutboundOf,
        isInboundOf,
        mode: target.mode.value,
        departureTime: new Date(target.departureTime.value),
        arrivalTime: new Date(target.arrivalTime.value),
        pickupPoint: target.pickupPoint.value,
        price: target.price.value,
      });
    }
  };

  const validateTransfer = (transfer: CreateTransferRequest) => {
    const errors: Record<string, string> = {};
    if (!modes.map((mode) => mode.value).includes(transfer.mode)) {
      errors.mode = "Mode must be one of the modes in the list";
    }
    // TODO: manage different time zones better
    if (transfer.arrivalTime.getTime() - transfer.departureTime.getTime() < 0) {
      errors.arrivalDate = "Arrival date must be later than departure date";
    }
    return errors;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mode">Transportation mode</label>
        <Select name="mode" value={selectedMode} onChange={(e) => setSelectedMode(e.target.value as TransferMode)}>
          {modes.map((mode, i) => (
            <option key={i} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </Select>
        <label htmlFor="pickupPoint">Pickup point</label>
        <Input name="pickupPoint"></Input>
        <label htmlFor="departureTime">Departure time</label>
        <Input name="departureTime" type="datetime-local" />
        <label htmlFor="arrivalTime">Arrival time</label>
        <Input name="arrivalTime" type="datetime-local" />
        <label htmlFor="price">Price</label>
        <Input name="price"></Input>
        <Button type="submit">Add transfer</Button>
      </form>
      <Button onClick={() => navigate(`/trips/${trip.id}`)}>Back to Trip</Button>
    </>
  );
}
