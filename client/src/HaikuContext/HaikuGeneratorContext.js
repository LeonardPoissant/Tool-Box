import React, { createContext, useState, useEffect } from "react";

export const HaikuGeneratorContext = createContext(null);

const HaikuGeneratorProvider = ({ children }) => {
  //Generate a haiku from all the databases
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  //const [generateNewHaiku, setGenerateNewHaiku] = useState(false);

  const generateNewHaiku = async () => {
    fetch("https://toolzbox.herokuapp.com/allHaikus")
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
      });
  };

  return (
    <HaikuGeneratorContext.Provider
      value={{
        generatedHaiku,
        generateNewHaiku,
      }}
    >
      {children}
    </HaikuGeneratorContext.Provider>
  );
};

export default HaikuGeneratorProvider;
