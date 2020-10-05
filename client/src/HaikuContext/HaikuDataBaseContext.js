import React, { createContext, useState, useEffect } from "react";

import useRemoveSpace from "../Utils/RemoveSpaces";

export const HaikuContext = createContext(null);

const HaikuDataBaseProvider = ({ children }) => {
  const [haikuDataBaseName, setHaikuDataBaseName] = useState("");
  const [haikuArray, setHaikuArray] = useState([]);
  const [haikuDb, setHaikuDb] = useState({});
  const [urlTitle, setUrlTitle] = useRemoveSpace(haikuDataBaseName);

  const saveContent = (haikuDataBaseName) => {
    window.sessionStorage.setItem("haikuDataBaseName", haikuDataBaseName);
  };

  //MOVE THE USEFFECT BACK TO 2ND AND 3RD PAGE SO ON MAIN PAGE WE CAN CLEAR ON REFRESH.
  useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  });

  const onChange = (e) => {
    setHaikuDataBaseName(e);
    saveContent(e);
    setUrlTitle(e);
  };

  const handleCreateHaikuDatabase = async (e) => {
    e.preventDefault();
    setUrlTitle(urlTitle);

    //https://toolzbox.herokuapp.com/createHaikus

    fetch("https://toolzbox.herokuapp.com/createHaikus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        urlTitle,
        haikuArray,
      }),
    })
      .then((res) => res.json())
      .then((db) => {
        //setHaikuDataBaseName("");
        setHaikuArray([]);
        setHaikuDb(db);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <HaikuContext.Provider
      value={{
        handleCreateHaikuDatabase,
        haikuDataBaseName,
        setHaikuDataBaseName,
        haikuArray,
        setHaikuArray,
        haikuDb,
        urlTitle,
        setUrlTitle,
        onChange,
      }}
    >
      {children}
    </HaikuContext.Provider>
  );
};

export default HaikuDataBaseProvider;
