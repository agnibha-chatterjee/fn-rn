import React, { useState, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Icon,
  Card,
  Text,
  ListItem,
  Avatar,
  Button,
} from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

const CustomCard = ({ details, disabled, offerToHelp }) => {
  const name = useRoute().name;

  return (
    <Card wrapperStyle={styles.wrapper}>
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
      {name === 'DiscoverItem' ? (
        <>
          <Text h4>Description : {details.description}</Text>
          <Text h4>Contact number : {details.contactNumber}</Text>
          <Text h4>
            Expires at :{' '}
            {dayjs(details.expiration).format('D MMMM YYYY, h:mm a')}
          </Text>
          <View style={styles.requestedBy}>
            <Text style={styles.requestedByText}>This post was put up by</Text>
            <ListItem>
              <Avatar
                rounded
                size='large'
                source={{ uri: details.requestedBy.profilePicture }}
              />
              <ListItem.Content>
                <ListItem.Title>{details.requestedBy.firstName}</ListItem.Title>
                <ListItem.Subtitle>
                  {details.requestedBy.email}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
          <Button
            raised
            title={
              !disabled ? 'Offer to help' : 'You have responded to this post'
            }
            disabled={disabled}
            onPress={offerToHelp}
          />
        </>
      ) : null}
    </Card>
  );
};

CustomCard.defaultProps = {
  offerToHelp: () => null,
  disabled: false,
};

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 30,
  },
  text: {
    width: 250,
  },
  requestedBy: {
    marginVertical: 30,
  },
  requestedByText: {
    fontSize: 18,
  },
});

export default CustomCard;
