import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState, useEffect } from "react";
import Turntable from "./turntable/Turntable";
import findNearRestaurants from "../apis/findNearRestaurants";

export interface TurntableProps {
  prize: string[];
}

export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface SameName {
  keyword: string;
  region: any[];
  selected_region: string;
}

export interface Meta {
  is_end: boolean;
  pageable_count: number;
  same_name: SameName;
  total_count: number;
}

export interface Places {
  documents: Place[];
  meta: Meta;
}

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  const positionOptions = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 27000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!isSuccess) {
          findNearRestaurants(pos.coords.latitude, pos.coords.longitude);
          setIsSuccess(true);
        }
      },
      (error) => {
        console.log(
          "Error Code: " + error.code + ", Error Description: " + error.message
        );
      },
      positionOptions
    );
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
