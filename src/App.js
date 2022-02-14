import "./App.css";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shelf from "./pages/Shelf";
import PlantManager from "./pages/PlantManager";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/plantManager" element={<PlantManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/shelf" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
