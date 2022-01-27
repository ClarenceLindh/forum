import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";

const Home = (loggedInUser:any) => {


  return (
    <div className="main">
      <CreateThread />
    </div>
  );
};

export default Home;
