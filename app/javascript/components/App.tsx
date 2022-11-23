import { Route, Routes } from "react-router-dom";
import Trips from "./Trips";

export default function App() {
  return (
    <Routes>
      <Route path="trips/*" element={<Trips />} />
    </Routes>
  );
}
