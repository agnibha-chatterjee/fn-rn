import React, { useState, useContext } from 'react';
import Card from '../components/Card';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from '../config/axios';
import { Context as UserContext } from '../contexts/user-context';

export const DiscoverItemScreen = () => {
  const details = useRoute().params;
  const { state } = useContext(UserContext);
  const [disabled, setDisabled] = useState(
    details.respondedBy.includes(state._id)
  );
  const offerToHelp = async () => {
    try {
      const res = await axios.get(
        `/requests/${details._id}/respond/${state._id}`,
        {
          headers: {
            _id: state._id,
          },
        }
      );
      setDisabled(res.data.success);
    } catch (error) {
      Alert.alert('We ran into an error! Please try again.');
    }
  };
  return (
    <>
      <Card details={details} offerToHelp={offerToHelp} disabled={disabled} />
    </>
  );
};
