import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PublicLayout from "./layouts/PublicLayout";

// Pages
import { Categories, Dashboard, Login, Reports, Signup } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / Authenticated Layout */}
        <Route
          path="/dashboard"
          element={
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <PublicLayout>
              <Reports />
            </PublicLayout>
          }
        />

        {/* SETTINGS ROUTES */}
        <Route
          path="/settings/categories"
          element={
            <PublicLayout>
              <Categories />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
