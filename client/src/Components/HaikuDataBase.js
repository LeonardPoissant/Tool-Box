import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";
import Loader from "./LoadingSpinner"

const CreateHaikuDatabase = () => {
  const {
    handleCreateHaikuDatabase,
    haikuDataBaseName,
    setHaikuDataBaseName,
    haikuArray,
    setHaikuArray,
    urlTitle,
    loading
   
  } = useContext(HaikuContext);
  

  useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  }, []);

  return (
    <Wrapper>
      <Link to={`/ManageDb/${urlTitle}`}>
      <DbName>{haikuDataBaseName}</DbName>
      </Link>
      <Instructions>Click on your database's name to edit it</Instructions>

      {loading?(<Loader/>):(<div></div>)}
      
      <HaikuDataBaseForm onSubmit={(e) => handleCreateHaikuDatabase(e)}>
        <InputsWrapper>
          <VerseWrapper>
            <VerseInput
              type="text"
              placeholder="type in a verse"
              value={haikuArray}
              minLength="2"
              maxLength="28"
              onChange={(e) => setHaikuArray(e.target.value)}
            ></VerseInput>
          </VerseWrapper>
        </InputsWrapper>
        <Instructions>
          Verses should be between 2 and 28 characters long.. Submit at least 3
          different verses
        </Instructions>
        <SubmitHaikuDbButton type="submit">Submit Verse</SubmitHaikuDbButton>
      </HaikuDataBaseForm>
      <ToGenerator to={`/HaikuGenerator/${urlTitle}`}>
        Generate Haiku
      </ToGenerator>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
`;

const DbName = styled.div`
  font-size: 25px;
`;

const HaikuDataBaseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 300px;
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
  width: 400px;
  text-align: center;
  outline: none;
  font-size:16px;
`;

const Instructions = styled.div`
  padding-bottom: 100px;
  color: rgb(204, 204, 204);
  @media (max-width: 736px) {
    width: 75%;
  }
`;

const SubmitHaikuDbButton = styled.button`
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

const ToGenerator = styled(Link)`
  color: black;
  text-decoration: underline;
  font-size: 25px;
`;

export default CreateHaikuDatabase;
