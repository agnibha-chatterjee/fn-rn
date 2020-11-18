import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Button, Input, Slider, Divider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Context as UserContext } from '../contexts/user-context';
import { ProfilePhoto } from './ProfilePhoto';

const schema = Yup.object({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  username: Yup.string()
    .min(6, 'Username has to have atleast 6')
    .required('Username is required'),
  email: Yup.string()
    .email('Enter a valid email id')
    .required('Email is required'),
  address: Yup.string().required('Address is required'),
});

export const UserForm = ({ buttonTitle }) => {
  const { state, registerUser, updateProfile } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <Formik
        initialValues={{
          firstName: state.firstName ?? '',
          lastName: state.lastName ?? '',
          username: state.username ?? '',
          email: state.email ?? '',
          address: state.address ?? '',
          defaultSearchRadius: state.defaultSearchRadius ?? 0,
          profilePicture: state.profilePicture ?? '',
        }}
        onSubmit={(values) => {
          const userData = {
            ...values,
            _id: state._id,
            defaultLocation: state.defaultLocation,
          };
          if (route.name === 'Registration') {
            registerUser(userData);
          } else {
            updateProfile(userData);
          }
        }}
        validateOnChange
        enableReinitialize
        validationSchema={schema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            {route.name === 'Edit Profile' ? (
              <>
                <ProfilePhoto
                  setFieldValue={setFieldValue}
                  profilePicture={values.profilePicture}
                  firstName={state.firstName}
                  lastName={state.lastName}
                />
                <Divider style={styles.divider} />
              </>
            ) : null}
            <Input
              style={styles.input}
              label='Address'
              onFocus={() => {
                Keyboard.dismiss();
                navigation.navigate('Map');
              }}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              errorMessage={
                errors.address && touched.address ? errors.address : ''
              }
            />
            <Input
              style={styles.input}
              label='Firstname'
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              disabled={
                route.name === 'Edit Profile' ? !state.canChangeName : false
              }
              errorMessage={
                errors.firstName && touched.firstName ? errors.firstName : ''
              }
            />
            {state.canChangeName ? null : (
              <Text style={styles.error}>
                You can change your firstname every 365 days
              </Text>
            )}
            <Input
              style={styles.input}
              label='Lastname'
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              disabled={
                route.name === 'Edit Profile' ? !state.canChangeName : false
              }
              errorMessage={
                errors.lastName && touched.lastName ? errors.lastName : ''
              }
            />
            {state.canChangeName ? null : (
              <Text style={styles.error}>
                You can change your lastname every 365 days
              </Text>
            )}
            <Input
              style={styles.input}
              label='Username'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize='none'
              errorMessage={
                errors.username && touched.username ? errors.username : ''
              }
            />
            <Input
              style={styles.input}
              label='Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCapitalize='none'
              errorMessage={errors.email && touched.email ? errors.email : ''}
            />
            <Text style={styles.label}>Your preferred search radius</Text>
            <Slider
              style={styles.slider}
              step={1}
              minimumValue={1}
              maximumValue={20}
              onValueChange={(value) => {
                setFieldValue('defaultSearchRadius', value);
              }}
              value={values.defaultSearchRadius}
              thumbStyle={styles.thumb}
            />
            <Text style={{ ...styles.label, marginTop: -5, marginBottom: 10 }}>
              {values.defaultSearchRadius} km(s)
            </Text>
            <Button
              onPress={handleSubmit}
              title={buttonTitle}
              buttonStyle={styles.button}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  input: {
    color: 'black',
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: 'black',
  },
  button: {
    marginTop: 15,
  },
  label: {
    marginLeft: 10,
    marginBottom: -5,
  },
  slider: {
    marginHorizontal: 10,
  },
  divider: {
    marginBottom: 10,
  },
  error: {
    color: 'firebrick',
    fontSize: 12,
    top: -20,
    left: 10,
  },
});
