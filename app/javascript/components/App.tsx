import { Route, Routes } from "react-router-dom";
import TripForm from "./trips/TripForm";
import TripPage from "./trips/TripPage";
import Trips from "./trips/Trips";

export default function App() {
  return (
    <Routes>
      <Route path="trips/new" element={<TripForm inputMode="create" />} />
      <Route path="trips/:id/*" element={<TripPage />} />
      <Route path="trips" element={<Trips />} />
    </Routes>
  );
}
