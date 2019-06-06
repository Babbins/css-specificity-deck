import React, { Fragment } from "react";
import { Split } from "mdx-deck/layouts";
import { Appear } from "mdx-deck";
import Spec from "./Spec";
import { calculate } from "specificity";
import styled from "styled-components";
import { Card } from "rebass";
import Trophy from "assets/trophy.svg";
import SyntaxHighlighter from "react-syntax-highlighter";

const WinnerTrophy = styled(Trophy)`
  height: 150px;
  width: 150px;
  position absolute;
  top: -62px;
  left: -62px;
  transform: rotate(-12deg);
`;
const RulesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
`;

const StyledRule = styled.div`
  padding: 25px;
  position: relative;
  border-radius: 10px;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > * {
    margin-bottom: 30px !important;
  }
  ${({ winner }) =>
    winner &&
    `
    background-color: peachpuff;
  `}
`;

const TargetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100vw;
  & > *:not(last-child) {
    margin-right: 100px !important;
  }
`;

const TargetRender = styled.section`
  position: relative;
  background-color: white;
  color: black;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
  label {
    position: absolute;
    top: 5px;
    left: 5px;
    color: black
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  p,
  pre,
  div,
  h1 {
    margin: 0;
  }
  span {
    font-size: 30px;
  }
  code {
    font-size: 30px;
  }
`;

const Code = styled(SyntaxHighlighter)`
  border-radius: 10px;
`;

const Duel = ({
  ruleA,
  ruleB,
  target,
  targetString,
  displaySpec,
  answer,
  stutter
}) => {
  const ruleAString = ruleTupleToString(ruleA);
  const ruleBString = ruleTupleToString(ruleB);
  const ruleASpec = calculate(ruleA[0])[0].specificityArray.slice(1);
  const ruleBSpec = calculate(ruleB[0])[0].specificityArray.slice(1);
  let winner;
  if (answer) {
    const ruleASpecVal = parseInt(ruleASpec.join(""));
    const ruleBSpecVal = parseInt(ruleBSpec.join(""));
    winner = ruleASpecVal > ruleBSpecVal ? "a" : "b";
  }

  const Stutter = stutter ? Appear : Fragment;
  return (
    <Wrapper>
      <h1> CSS Rule Duel</h1>

      <Stutter>
        <TargetWrapper>
          <Code language="html">{targetString}</Code>
          <TargetRender>
            <label>{answer ? "After styles" : "Before styles"}</label>
            {target}
          </TargetRender>
        </TargetWrapper>
        <RulesWrapper>
          <StyledRule winner={winner === "a"}>
            {winner === "a" && <WinnerTrophy />}
            <p>Rule A</p>
            <Code language="css">{ruleAString}</Code>
            {displaySpec && <Spec array={ruleASpec} />}
          </StyledRule>
          <h2>VS.</h2>
          <StyledRule winner={winner === "b"}>
            {winner === "b" && <WinnerTrophy />}
            <p>Rule B</p>
            <Code language="css">{ruleBString}</Code>
            {displaySpec && <Spec array={ruleBSpec} />}
          </StyledRule>
        </RulesWrapper>
        {answer && (
          <Fragment>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              section > ${ruleAString}
              section > ${ruleBString}
            `
              }}
            />
          </Fragment>
        )}
      </Stutter>
    </Wrapper>
  );
};

export default Duel;

const ruleTupleToString = ruleTuple => `
  ${ruleTuple[0]} {
    ${ruleTuple[1]}
  }
`;
