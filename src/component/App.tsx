import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import Turntable from "./turntable/Turntable";

function App() {
  let latitude: number;
  let longitude: number;

  const [isSuccess, setIsSuccess] = useState(false);

  navigator.geolocation.getCurrentPosition((pos) => {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    setIsSuccess(true);
  });

  return (
    <div className="App">
      {isSuccess ? (
        <Turntable></Turntable>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
}

export default App;
