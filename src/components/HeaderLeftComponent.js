import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomLeftComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Request')}>
      <Entypo name='new-message' size={24} color='white' />
    </TouchableOpacity>
  );
};
