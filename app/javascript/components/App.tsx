import { Route, Routes } from "react-router-dom";
import TripForm from "./trips/TripForm";
import TripPage from "./trips/TripPage";
import Trips from "./trips/Trips";
import LoginForm from "./auth/LoginForm";
import CreateUserForm from "./auth/CreateUserForm";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<CreateUserForm />} />
      <Route element={<PrivateRoute />}>
        <Route path="trips/new" element={<TripForm inputMode="create" />} />
        <Route path="trips/:id/*" element={<TripPage />} />
        <Route path="trips" element={<Trips />} />
      </Route>
    </Routes>
  );
}
