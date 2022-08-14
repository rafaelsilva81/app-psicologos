import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import styled from "styled-components";

const CustomLabel = styled.label``;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  width: 0;
  height: 0;
`;
const CustomRadio = ({ children, ...props }) => {
  const { name, icon, val } = props;
  return <></>;
};

export default CustomRadio;
