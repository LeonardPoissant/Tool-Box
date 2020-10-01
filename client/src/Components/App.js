import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ToolBox from "./MyToolbox";
import HaikuGenerator from "./HaikuGenerator";
import CreateHaikuDatabase from "./HaikuDataBase";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <ToolBox />
        </Route>
        <Route path="/HaikuGenerator/">
          <HaikuGenerator />
        </Route>
        <Route path="/CreateMyHaikuDataBase">
          <CreateHaikuDatabase />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
