import React from 'react';
import { Header } from 'react-native-elements';
import { CustomRightComponent } from './HeaderRightComponent';

export const CustomHeader = ({ title }) => {
  return (
    <Header
      centerComponent={{ text: title, style: { color: '#fff' } }}
      rightComponent={<CustomRightComponent />}
    />
  );
};
