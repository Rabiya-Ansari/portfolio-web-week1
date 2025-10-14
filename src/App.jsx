import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import BlogDetails from "./pages/BlogDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

