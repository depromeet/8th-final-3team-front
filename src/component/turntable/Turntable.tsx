import React from "react";
import Client from "../../client/Client";
import { MAP_API_URL } from "../../utils/Constant";

import Message from "rc-message";
import ReactTurntable from "react-turntable";
import "react-turntable/assets/index.css";
import "rc-message/assets/index.css";

function findNearRestaurants() {
  const querys = ["radius=20000", "query=한식"];

  const result = Client(MAP_API_URL + "/v2/local/search/keyword.json", querys);
  console.log(result);
}

const prizes = ["한식", "중식", "양식", "일식"];

const options = {
  prizes,
  width: 500,
  height: 500,
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
    //If you want before the rotate do some...
    console.log("start...");
    //If you want stop rotate you can return false
    return true;
  },
  onComplete(prize: any) {
    console.log("prize:", prize);
    Message.success({
      content: prize,
    });
  },
};
function Turntable() {
  return (
    <div>
      <ReactTurntable {...options}></ReactTurntable>
    </div>
  );
}

export default Turntable;
