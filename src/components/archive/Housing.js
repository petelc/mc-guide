import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./Header";
import Service from "./Service";

const apiURL = "http://localhost:4000";

export const Housing = () => {
  const [assist, setAssist] = useState({ assist: null });
  console.log(assist);

  useEffect(() => {
    // TODO set up the loading state and component
    const requestURL = apiURL + "/filteredServices?requestType=Housing";
    axios.get(requestURL).then((services) => {
      const allServices = services.data;
      setAssist({ assist: allServices });
    });
  }, [setAssist]);

  return (
    <>
      <Header />
      <div className="container">
        <Service assist={assist} />
      </div>
    </>
  );
};
