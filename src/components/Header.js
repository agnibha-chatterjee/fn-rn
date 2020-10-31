import React from 'react';
import { Header } from 'react-native-elements';

export const CustomHeader = ({ title, leftComponent, rightComponent }) => {
  return (
    <Header
      backgroundColor='#222'
      centerComponent={{ text: title, style: { color: '#fff' } }}
      rightComponent={rightComponent}
      leftComponent={leftComponent}
    />
  );
};

CustomHeader.defaultProps = {
  leftComponent: null,
  rightComponent: null,
};
