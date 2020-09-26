import React from "react";
import client from "../client/client";

function App() {
  const response = client("https://place.map.kakao.com/83147987");
  console.log(response);
  return <div className="App"></div>;
}

export default App;
