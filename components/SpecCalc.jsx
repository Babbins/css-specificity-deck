import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Spec from "./Spec";
import { calculate } from "specificity";

const Input = styled.input`
  height: 45px;
  width: 400px;
  font-size: 30px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin: 0 20px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  & > *:not(:last-child) {
    margin-bottom: 50px;
  }
  h1 {
    margin: 0;
  }
`;
const SpecCalc = ({ initialSelector = "div" }) => {
  const [selector, setSelector] = useState(initialSelector);
  const specObj = calculate(selector);
  let array;

  if (specObj.length) {
    array = specObj[0].specificityArray.slice(1);
  } else {
    array = [0, 0, 0];
  }

  const handleInput = e => setSelector(e.target.value);

  return (
    <Wrapper>
      <h1>Specificity Calculator</h1>
      <InputWrapper>
        <p> Selector: </p>
        <Input value={selector} onChange={handleInput} />
      </InputWrapper>
      <Spec array={array} />
    </Wrapper>
  );
};

export default SpecCalc;
