import { Route, Routes } from "react-router";

import Login from "./Login";
import Browse from "./Browse";
import Home from "./Home";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Body;
