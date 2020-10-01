import React, { useContext } from "react";

import styled, { keyframes } from "styled-components";

import { HaikuGeneratorContext } from "../HaikuContext/HaikuGeneratorContext";
import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const HaikuGenerator = () => {
  const { generatedHaiku, generateNewHaiku, animating } = useContext(
    HaikuGeneratorContext
  );

  const { haikuDb } = useContext(HaikuContext);
  if (haikuDb.haikuDataBase != undefined) {
    console.log("HAIKUDB", haikuDb.haikuDataBase.haikuDataBaseName);
  }

  return (
    <div>
      <HaikuWrapper>
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
        <Generate onClick={() => generateNewHaiku()}>GENERATE</Generate>
      </HaikuWrapper>
    </div>
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

const Generate = styled.button`
  position: sticky;
  padding: 25px;
  border-style: solid;
  text-decoration: none;
`;

export default HaikuGenerator;
