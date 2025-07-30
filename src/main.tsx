import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProductsManage from "./components/ProductsManage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsManage />} />
        <Route path="/products/:id" element={<ProductsManage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

