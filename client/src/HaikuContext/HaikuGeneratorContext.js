import React, { createContext, useState } from "react";

export const HaikuGeneratorContext = createContext(null);

const HaikuGeneratorProvider = ({ children }) => {
  //Generate a haiku from all the databases
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  const [animating, setAnimating] = useState(false);

  //https://toolzbox.herokuapp.com/allHaikus

  const generateNewHaiku = async () => {
    fetch("https://toolzbox.herokuapp.com/allHaikus")
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  };

  return (
    <HaikuGeneratorContext.Provider
      value={{
        generatedHaiku,
        generateNewHaiku,
        animating,
        setAnimating,
      }}
    >
      {children}
    </HaikuGeneratorContext.Provider>
  );
};

export default HaikuGeneratorProvider;
