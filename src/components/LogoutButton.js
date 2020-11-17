import React, { useContext } from 'react';
import { Button, Icon } from 'react-native-elements';
import { Context as UserContext } from '../contexts/user-context';

export const LogoutButton = () => {
  const { signOut, state } = useContext(UserContext);
  return (
    <Button
      title='Logout'
      type='clear'
      icon={
        <Icon raised name='logout' type='material-community' color='#f50' />
      }
      onPress={() => signOut(state._id)}
    />
  );
};
