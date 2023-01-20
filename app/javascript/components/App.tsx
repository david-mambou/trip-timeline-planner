import { Route, Routes } from "react-router-dom";
// import StopForm from "./StopForm";
import TripForm from "./TripForm";
import TripPage from "./TripPage";
import Trips from "./Trips";

export default function App() {
  return (
    <Routes>
      <Route path="trips/new" element={<TripForm />} />
      {/* <Route path="trips/:id/stops/new" element={<StopForm />} /> */}
      <Route path="trips/:id/*" element={<TripPage />} />
      <Route path="trips" element={<Trips />} />
    </Routes>
  );
}
