import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as UserContext } from '../contexts/user-context';

export const CustomRightComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('tried mounting');
  }, []);

  if (mounted) {
    const { signOut, state } = useContext(UserContext);
    return (
      <TouchableOpacity onPress={() => signOut(state._id)}>
        <MaterialCommunityIcons name='logout' size={24} color='white' />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};
