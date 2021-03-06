import React from "react";

import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <h1> ABOUT</h1>

      <Paragraph>
        This is a tool to help you generate your own haikus, based on the text of your choice. To create your own haiku generator, choose a name for your haiku database and type it in the text field in the homepage. Memorize it for the future...
      </Paragraph>
      <Paragraph>Then, click "start" and you can now enter individual haiku lines. Every time you enter a line, click on "submit verse" to save it to your generator's database. Once you submit a few lines, you can start "generating haikus".
</Paragraph>
      <Paragraph>To access your database and delete some lines you do not want to use anymore, click on the name of your database, at the top of the page.
</Paragraph>
      <Paragraph>You can keep on "feeding" your generator with haiku lines, as long as you remember the name you gave it (as you will have to re-enter it every time you come back to the website).</Paragraph>
      <Paragraph>This is a tool that was made just for fun, and the content of your haiku databases will never be used for any commercial reasons. Also, your databases will remain fully anonymous because we do not collect any of your personal data.</Paragraph>
      <Paragraph>We hope you enjoy it :-)</Paragraph>

      <Instructions>
        Find all the instructions needed to replicate this application
        <span> </span>
        <StyledA href="https://github.com/LeonardPoissant/Tool-Box" >here.</StyledA>
      </Instructions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const Paragraph = styled.p`
width:30%;

margin-top:0px;
 
 
`;

const Instructions = styled.p`

`;

const StyledA = styled.a`

`;


export default About;
