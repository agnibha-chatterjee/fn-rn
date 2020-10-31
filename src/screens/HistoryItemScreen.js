import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Card, Text } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

export const HistoryItemScreen = () => {
  const details = useRoute().params;
  return (
    <Card wrapperStyle={styles.container}>
      <Card.Title>Details</Card.Title>
      <Card.Divider />
      <Text h4 h4Style={styles.text}>
        Cost : <Icon size={18} name='rupee' type='font-awesome' />
        {details.cost}
      </Text>
      <Text h4>
        Created at : {dayjs(details.createdAt).format('D MMMM YYYY, h:mm a')}
      </Text>
      <Text h4>Request type : {details.requestType}</Text>
      <Text h4 h4Style={styles.text}>
        Completed :{' '}
        <Icon
          size={22}
          name={details.completed ? 'check-circle' : 'times-circle'}
          color={details.completed ? 'green' : 'firebrick'}
          type='font-awesome'
        />
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 30,
  },
  text: {
    width: 250,
  },
});
