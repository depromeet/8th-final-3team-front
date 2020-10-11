import React, { useEffect, useState } from "react";
import Message from "rc-message";
import ReactTurntable from "react-turntable";
import "react-turntable/assets/index.css";
import "rc-message/assets/index.css";
import { RestaurantProps } from "../../apis/findNearRestaurants";

const [prizes, setPrizes] = useState(["hi", "hello"]);

const options = {
  prizes,
  width: 400,
  height: 400,
  primaryColor: "#83AF9B",
  secondaryColor: "#C8C8A9",
  fontStyle: {
    color: "#fff",
    size: "14px",
    fontVertical: true,
    fontWeight: "bold",
    fontFamily: "Microsoft YaHei",
  },
  speed: 1000,
  duration: 2000,
  clickText: "Click",
  onStart() {
    console.log("start...");
    return true;
  },
  onComplete(prize: any) {
    console.log("prize:", prize);
    Message.success({
      content: prize,
    });
  },
};

const Turntable: React.FC<RestaurantProps> = (restaurantProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!isRendered) {
      const re = restaurantProps.restaurants.map((value) => {
        // prizes.push(value.name);
        return value.name;
      });
      setPrizes(re);
    }
    setIsRendered(true);
  }, [isRendered, restaurantProps]);

  return (
    <div>
      <ReactTurntable {...options}></ReactTurntable>
    </div>
  );
};

export default Turntable;
