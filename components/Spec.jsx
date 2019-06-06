import React, { Fragment } from "react";
import styled from "styled-components";

const Node = styled.div`
  background-color: ${props => props.color};
  width: 200px;
  height: 100px;
`;

const data = [
  {
    color: "navy",
    label: "ID"
  },
  {
    color: "salmon",
    label: "Class"
  },
  {
    color: "teal",
    label: "Element"
  }
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {

    display flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
  & > *:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  & > *:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Number = styled.div`
  font-size: 40px;
`;
const NodeLabel = styled.div`
  font-size: 20px;
`;

const Spec = ({ array }) => (
  <Wrapper>
    {array.map((item, idx) => (
      <Node color={data[idx].color} key={idx}>
        <Number>{item}</Number>
        <NodeLabel>{data[idx].label}</NodeLabel>
      </Node>
    ))}
  </Wrapper>
);

export default Spec;
