import React, { FC } from "react";

import { Nav } from "./Nav";
import { Channel } from "./Channel";

interface Props {}

const App: FC<Props> = () => {
  return (
    <div className="App">
      <Nav />
      <Channel />
    </div>
  );
};

export default App;
