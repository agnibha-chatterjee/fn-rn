import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomLeftComponentDashboard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Request')}>
      <Entypo name='new-message' size={24} color='white' />
    </TouchableOpacity>
  );
};

export const CommonLeftComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons name='arrow-back' size={24} color='white' />
    </TouchableOpacity>
  );
};
