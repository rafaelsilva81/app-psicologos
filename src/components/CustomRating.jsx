import { IonContent, IonLabel, IonPopover, IonText } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import "./styles/custom_rating.css";

const CustomRating = () => {
  return (
    <>
      <div className="humor-container">
        <label className="humor-label">
          <input type="radio" value="Male" id="click-trigger" name="gender" />
          <img src="/assets/imgs/acompanhamento_humor/emotion-temp.png" />
        </label>
        <label className="humor-label">
          <input type="radio" value="Male" name="gender" />
          <img src="/assets/imgs/acompanhamento_humor/emotion-temp.png" />
        </label>
        <label className="humor-label">
          <input type="radio" value="Male" name="gender" />
          <img src="/assets/imgs/acompanhamento_humor/emotion-temp.png" />
        </label>
        <label className="humor-label">
          <input type="radio" value="Male" name="gender" />
          <img src="/assets/imgs/acompanhamento_humor/emotion-temp.png" />
        </label>
        <label className="humor-label">
          <input type="radio" value="Male" name="gender" />
          <img src="/assets/imgs/acompanhamento_humor/emotion-temp.png" />
        </label>
      </div>
    </>
  );
};

export default CustomRating;
