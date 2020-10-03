import React, { createContext, useState } from "react";

export const HaikuContext = createContext(null);

const HaikuDataBaseProvider = ({ children }) => {
  const [haikuDataBaseName, setHaikuDataBaseName] = useState("");
  const [haikuArray, setHaikuArray] = useState([]);
  const [haikuDb, setHaikuDb] = useState({});

  const handleCreateHaikuDatabase = async (e) => {
    e.preventDefault();

    //https://toolzbox.herokuapp.com/createHaikus

    fetch("/https://toolzbox.herokuapp.com/createHaikus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        haikuDataBaseName,
        haikuArray,
      }),
    })
      .then((res) => res.json())
      .then((db) => {
        setHaikuDataBaseName("");
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
      }}
    >
      {children}
    </HaikuContext.Provider>
  );
};

export default HaikuDataBaseProvider;
