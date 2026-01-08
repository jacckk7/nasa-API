import { Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/home";
import Image from "./pages/image";
import NotFound from "./pages/notfound";
import Layout from "./components/layout";
import Asteroids from "./pages/asteroids";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image" element={<Image />} />
        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
