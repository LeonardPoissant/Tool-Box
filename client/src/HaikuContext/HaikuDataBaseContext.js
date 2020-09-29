import React, { createContext, useState } from "react";

export const HaikuContext = createContext(null);

const HaikuDataBaseProvider = ({ children }) => {
  const [haikuDataBaseName, setHaikuDataBaseName] = useState("");
  const [haikuArray, setHaikuArray] = useState([
    { verse1: "", verse2: "", verse3: "" },
  ]);

  const handleCreateHaikuDatabase = async (e) => {
    e.preventDefault();

    //https://toolzbox.herokuapp.com/createHaikus

    fetch("https://toolzbox.herokuapp.com/createHaikus", {
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
      .then(() => {
        setHaikuDataBaseName("");
        setHaikuArray([{ verse1: "", verse2: "", verse3: "" }]);
      })
      .catch((err) => {
        console.log(err);
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
      }}
    >
      {children}
    </HaikuContext.Provider>
  );
};

export default HaikuDataBaseProvider;
