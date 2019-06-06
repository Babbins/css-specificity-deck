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
  width: 100vw;
  margin-bottom: 1em;
  p,
  pre,
  div {
    margin: 0;
  }
  span {
    font-size: 30px;
  }
  code {
    font-size: 30px;
  }
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
  ${({ winner }) =>
    winner &&
    `
    background-color: peachpuff;
  `}
`;

const TargetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
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
    const ruleASpecVal = parseInt(ruleASpec.join());
    const ruleBSpecVal = parseInt(ruleBSpec.join());
    winner = ruleASpecVal > ruleBSpecVal ? "a" : "b";
  }

  const Stutter = stutter ? Appear : Fragment;
  return (
    <Wrapper>
      <h1> CSS Rule Duel</h1>
      <Stutter>
        <RulesWrapper>
          <StyledRule>
            {winner === "a" && <WinnerTrophy />}
            <p>Rule A:</p>
            <Code language="css">{ruleAString}</Code>
            {displaySpec && <Spec array={ruleASpec} />}
          </StyledRule>

          <StyledRule winner={winner === "b"}>
            {winner === "b" && <WinnerTrophy />}
            <p>Rule B:</p>
            <Code language="css">{ruleBString}</Code>
            {displaySpec && <Spec array={ruleBSpec} />}
          </StyledRule>
        </RulesWrapper>
        <TargetWrapper>
          <Code language="javascript">{targetString}</Code>
        </TargetWrapper>
      </Stutter>
      {answer && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ${ruleAString}
              ${ruleBString}
            `
          }}
        />
      )}
    </Wrapper>
  );
};

export default Duel;

const ruleTupleToString = ruleTuple => `
  ${ruleTuple[0]} {
    ${ruleTuple[1]}
  }
`;
