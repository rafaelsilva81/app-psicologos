import React from "react";
import { IonItem } from "@ionic/react";
import styled from "styled-components";

const InputItem = styled(IonItem)`
  --border-color: var(--ion-color-medium);
  --border-radius: 10px;
  --border-width: 1px;
  --box-shadow: 2px gray;
  --highlight-height: 0;
  --background: var(--ion-color-medium-tint);
  color: var(--ion-color-medium-contrast);
`;

export default InputItem;
