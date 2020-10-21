import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as UserContext } from '../contexts/user-context';

export const CustomRightComponent = () => {
  const { signOut, state } = useContext(UserContext);
  return (
    <TouchableOpacity onPress={() => signOut(state._id)}>
      <MaterialCommunityIcons name='logout' size={24} color='white' />
    </TouchableOpacity>
  );
};
