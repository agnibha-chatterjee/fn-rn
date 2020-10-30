import React from 'react';
import { Header } from 'react-native-elements';
import { CustomRightComponent } from './HeaderRightComponent';

export const CustomHeader = ({ title, leftComponent }) => {
  return (
    <Header
      backgroundColor='#222'
      centerComponent={{ text: title, style: { color: '#fff' } }}
      rightComponent={<CustomRightComponent />}
      leftComponent={leftComponent}
    />
  );
};

CustomHeader.defaultProps = {
  leftComponent: null,
};
