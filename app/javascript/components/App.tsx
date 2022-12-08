import { Route, Routes } from "react-router-dom";
import TripPage from "./TripPage";
import Trips from "./Trips";

export default function App() {
  return (
    <Routes>
      <Route path="trips/:id" element={<TripPage />} />
      <Route path="trips/*" element={<Trips />} />
    </Routes>
  );
}
