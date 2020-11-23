import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export const ProfilePhoto = ({
  setFieldValue,
  profilePicture,
  firstName,
  lastName,
}) => {
  const avatarTitle = profilePicture ? '' : `${firstName[0]}${lastName[0]}`;
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setFieldValue('profilePicture', result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        avatarStyle={styles.avatar}
        titleStyle={styles.avatarTitle}
        rounded
        title={avatarTitle}
        source={profilePicture ? { uri: profilePicture } : null}
        size='xlarge'
        onPress={handleProfilePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'black',
  },
  avatarTitle: {
    color: 'black',
  },
});
