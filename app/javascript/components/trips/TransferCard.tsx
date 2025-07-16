import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Transfer } from "./TripPage";
import { format, parseISO } from "date-fns";

export type TransferCardProps = {
  transfer: Transfer;
};

const modeEmojis = {
  flight: "✈️",
  train: "🚄",
  bus: "🚍",
  taxi: "🚕",
  rentalcar: "🚙",
  rentalbike: "🏍️",
  boat: "⛴️",
};

export default function TransferCard({ transfer }: TransferCardProps) {
  return (
    <Flex align="center" h="100px" my="12px" width="70%">
      <Box flex={1}>
        <Text align="center" fontSize="44">
          {modeEmojis[transfer.mode]}
        </Text>
      </Box>
      <Divider bg="gray.500" borderRadius="full" orientation="vertical" height="100%" width="4px" mx={4} />
      <Box flex={1}>
        <Text>{format(parseISO(transfer.departureTime), "HH:mm")}</Text>
        <Text>from {transfer.pickupPoint}</Text>
        <Text>Arrival: {format(parseISO(transfer.arrivalTime), "HH:mm")}</Text>
        <Text>Price: {transfer.price}</Text>
      </Box>
    </Flex>
  );
}
