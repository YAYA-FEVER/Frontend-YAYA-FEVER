import "./App.css";
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shelf from "./pages/Shelf";
import PlantManager from "./pages/PlantManager";
import PlantDetail from "./pages/PlantDetail";
import AddPlant from "./pages/AddPlant";
import BasketPage from "./pages/BasketPage";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/plantManager" element={<PlantManager />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route
            path="/plantManager/plantDetail/:id"
            element={<PlantDetail />}
          />
          <Route path="/addPlant" element={<AddPlant/>}>
            <Route path=":id" element={<AddPlant/>} />
          </Route>
          <Route path="*" element={<Navigate to="/shelf" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
