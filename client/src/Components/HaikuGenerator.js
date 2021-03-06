import React, { useState, useEffect, useContext } from "react";

import styled, { keyframes } from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";
import Loader from "./LoadingSpinner"

const HaikuGenerator = () => {
  const { urlTitle } = useContext(HaikuContext);
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('URLTITLE', urlTitle)

  //https://toolzbox.herokuapp.com/allHaikus/${haikuDb._id}


  useEffect(() => {
    setLoading(true)

    fetch(`https://toolzbox.herokuapp.com/randomHaiku/${urlTitle}`)
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
        setLoading(false)
        console.log(randomHaiku)
      });
    setAnimating(false);
  }, []);
  // `https://toolzbox.herokuapp.com/randomHaiku/${urlTitle}`
  const generateNewHaiku = async (e) => {
    setLoading(true)
    fetch(`https://toolzbox.herokuapp.com/randomHaiku/${urlTitle}`)
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
        setLoading(false)
      });
    setAnimating(false);
  };

  console.log('AFTER FECTCH', generatedHaiku)

  return (
    <>
      <HaikuWrapper>
        {loading ? (<Loader />) : (<></>)}
        <HaikuDisplay>
          {animating ? (
            generatedHaiku.map((verse, index) => {
              return (
                <HaikuVerse
                  key={index}
                  style={{
                    animationDuration:
                      index === 1 ? "3s" : index === 2 ? "4s" : "2s",
                  }}
                >
                  {verse}
                </HaikuVerse>
              );
            })
          ) : (
              <> </>
            )}
        </HaikuDisplay>
      </HaikuWrapper>
      <GenerateWrapper>
        <Generate onClick={(e) => generateNewHaiku(e)}>Generate Haiku</Generate>
      </GenerateWrapper>
    </>
  );
};

const HaikuWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const HaikuDisplay = styled.div`
  padding: 70px;
`;

const verseKeyFrames = keyframes`
0% {
  opacity:0;
  display:none;
}
30% {
  opacity:0;
  display:none;
}
50% {
  opacity:0,5;
}
100%{
  opacity:1;
}
`;

const HaikuVerse = styled.div`
  padding: 5px;
  width: 100%;
  animation: ${verseKeyFrames} ease-in;
`;

const GenerateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Generate = styled.button`
  position: absolute;
  padding: 10px;
  border: none;
  outline: none;
  background-color: white;
  text-decoration: underline;
  font-size: 25px;
  :hover {
    cursor: pointer;
  }
`;

export default HaikuGenerator;
