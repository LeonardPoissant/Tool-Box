import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const Header = () => {
  const [mainPageHeader, setMainPageHeader] = useState(false);
  const [generatorHeader, setGeneratorHeader] = useState(false);
  const [createPageHeader, setCreatePageHeader] = useState(false);
  const { haikuDb } = useContext(HaikuContext);

  const location = useLocation();

  useEffect(() => {
    const getLocation = () => {
      if (location.pathname === "/HaikuGenerator") {
        return (
          setMainPageHeader(false),
          setGeneratorHeader(true),
          setCreatePageHeader(false)
        );
      } else if (location.pathname === "/") {
        return (
          setMainPageHeader(true),
          setGeneratorHeader(false),
          setCreatePageHeader(false)
        );
      } else if (location.pathname === "/CreateMyHaikuDataBase") {
        return (
          setMainPageHeader(false),
          setGeneratorHeader(false),
          setCreatePageHeader(true)
        );
      }
    };
    getLocation();
  }, [location.pathname]);

  return (
    <Wrapper>
      {location.pathname === "/HaikuGenerator" ? (
        <>
          <ChangePageWrapper to={"/"}>
            <ArrowBackIcon />
            <LinkTo>Tool-Box</LinkTo>
          </ChangePageWrapper>
          <ChangePageWrapper to={"/CreateMyHaikuDataBase"}>
            <LinkTo>Create new haikus</LinkTo>
            <ArrowForwardIcon />
          </ChangePageWrapper>
        </>
      ) : !generatorHeader && !mainPageHeader && createPageHeader ? (
        <>
          <ChangePageWrapper to={"/HaikuGenerator"}>
            <ArrowBackIcon />
            <LinkTo>Generator</LinkTo>
          </ChangePageWrapper>
          <ChangePageWrapper to={"/"}>
            <LinkTo>Tool-Box</LinkTo>
            <ArrowForwardIcon />
          </ChangePageWrapper>
        </>
      ) : !generatorHeader && mainPageHeader && !createPageHeader ? (
        <div>Tool Box</div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ChangePageWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  padding-left: 5px;
  margin-left: 5px;
`;

const LinkTo = styled.div`
  margin-top: 3px;
`;

export default Header;
