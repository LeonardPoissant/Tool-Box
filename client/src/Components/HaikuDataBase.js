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
  } = useContext(HaikuContext);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const haikuList = [...haikuArray];
    haikuList[index][name] = value;
    setHaikuArray(haikuList);
  };

  //handle adding new input fields

  const handleAddClick = () => {
    setHaikuArray([...haikuArray, { verse1: "", verse2: "", verse3: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...haikuArray];
    list.splice(index, 1);
    setHaikuArray(list);
  };

  console.log("ARRAYsdfsdf", haikuArray);

  return (
    <Wrapper>
      <HaikuDataBaseForm onSubmit={(e) => handleCreateHaikuDatabase(e)}>
        <input
          type="text"
          placeholder="Choose your haiku data base name"
          value={haikuDataBaseName}
          onChange={(e) => setHaikuDataBaseName(e.target.value)}
        ></input>
        {haikuArray.map((x, i) => {
          return (
            <InputsWrapper>
              <VerseWrapper>
                <VerseInput
                  type="text"
                  name="verse1"
                  placeholder="type in a verse"
                  value={x.verse1}
                  onChange={(e) => handleInputChange(e, i)}
                ></VerseInput>
                <VerseInput
                  type="text"
                  name="verse2"
                  placeholder="type in a verse"
                  value={x.verse2}
                  onChange={(e) => handleInputChange(e, i)}
                ></VerseInput>
                <VerseInput
                  type="text"
                  name="verse3"
                  placeholder="type in a verse"
                  value={x.verse3}
                  onChange={(e) => handleInputChange(e, i)}
                ></VerseInput>
              </VerseWrapper>
              <AddRemoveWrapper>
                {haikuArray.length !== 1 && (
                  <Button onClick={() => handleRemoveClick(i)}>Remove</Button>
                )}
                {haikuArray.length - 1 === i && (
                  <Button onClick={handleAddClick}>ADD</Button>
                )}
              </AddRemoveWrapper>
            </InputsWrapper>
          );
        })}

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
