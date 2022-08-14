import React from "react";
import styled from "styled-components";
import temp from "../assets/imgs/login.svg";

const HiddenRadioButton = styled.input.attrs({
  type: "radio",
})`
  height: 25px;
  width: 25px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

const RadioButton = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  pointer-events: none;

  ${HiddenRadioButton}:checked + && {
    background-color: red;
  }
`;

const HumorRadioInput = () => {
  return (
    <RadioButton>
      <HiddenRadioButton />
      <img src={temp} style={{ height: "5em" }} />
    </RadioButton>
  );
};

export default HumorRadioInput;
