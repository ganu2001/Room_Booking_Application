import { Button } from "antd";
import 'antd/dist/reset.css';
import React from 'react';
import ButtonStyle from './CustomButton.module.css';

export const CustomButton = ({
  isFilled = false,
  text = 'Button',
  onClick = () => {},
  type = 'button',
  loading = false,
  loadingText = 'Loading...',
  customStyle = {},
  btnDisabled = false
}) => {
  return (

    <Button
      onClick={onClick}
      className={`${btnDisabled ? `${ButtonStyle.DisabledBtn}` : isFilled ? `${ButtonStyle.filledBtn}` : `${ButtonStyle.outlinedBtn}`}`}
      style={customStyle}
      htmlType={type}
      loading={loading}
      disabled={btnDisabled}
    >
      {loading ? loadingText : text}
    </Button >
  );
};
