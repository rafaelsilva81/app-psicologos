import { IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCircle } from "ionicons/icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckboxContainer = styled.div`
  padding: 0.5em;
  border-radius: 5px;
  min-width: 25vw;
  background-color: ${(props) =>
    props.checked ? "var(--ion-color-primary)" : "#e0e0e0"};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
`;

const Text = styled.label`
  color: ${(props) => (props.checked ? "#FFF" : "#444")};
`;

const StyledCheckbox = styled.label`
  width: 2em;
  height: 2em;
  margin-bottom: 5px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* display: ${(props) => (props.checked ? "flex" : "none")}; */
    /*     filter: invert(75%) sepia(11%) saturate(6042%) hue- rotate(30deg)
      brightness(105%) contrast(68%); */
  }
`;

function Checkbox({ children, ...props }) {
  const { icon } = props;
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(e) {
    setChecked(!checked);
    props.isChecked(!checked);
  }

  return (
    <CheckboxContainer onClick={handleCheckboxChange} checked={checked}>
      <HiddenCheckbox onChange={handleCheckboxChange} checked={checked} />
      <StyledCheckbox checked={checked}>
        <FontAwesomeIcon icon={icon} color="black" />
      </StyledCheckbox>
      <Text checked={checked}>{children}</Text>
    </CheckboxContainer>
  );
}

export default Checkbox;
