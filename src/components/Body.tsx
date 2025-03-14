import { Route, Routes } from "react-router";

import Login from "./Login";
import Browse from "./Browse";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Body;
