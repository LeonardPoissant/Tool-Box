import React, { useContext, useState } from "react";
import styled from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const CreateHaikuDatabase = () => {
  const {
    handleCreateHaikuDatabase,
    haikuDataBaseName,
    setHaikuDataBaseName,
    haikuArray,
    setHaikuArray,
    haikuDb,
  } = useContext(HaikuContext);

  // handle input change

  console.log("haikuDb", haikuDb);

  //handle adding new input fields

  return (
    <Wrapper>
      <HaikuDataBaseForm onSubmit={(e) => handleCreateHaikuDatabase(e)}>
        <input
          type="text"
          placeholder="Choose your haiku data base name"
          value={haikuDataBaseName}
          onChange={(e) => setHaikuDataBaseName(e.target.value)}
        ></input>

        <InputsWrapper>
          <VerseWrapper>
            <VerseInput
              type="text"
              placeholder="type in a verse"
              value={haikuArray}
              onChange={(e) => setHaikuArray(e.target.value)}
            ></VerseInput>
          </VerseWrapper>
        </InputsWrapper>

        <SubmitHaikuDbButton type="submit">Submit Verses</SubmitHaikuDbButton>
      </HaikuDataBaseForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const HaikuDataBaseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputsWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const VerseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VerseInput = styled.input`
  padding: 5px;
  margin: 5px;
  width: 300px;
`;

const AddRemoveWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button``;

const SubmitHaikuDbButton = styled.button`
  padding: 10px;
`;

export default CreateHaikuDatabase;
