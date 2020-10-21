import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Context as UserContext } from '../contexts/user-context';

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

export const UserForm = ({ navigation }) => {
  const { state, registerUser } = useContext(UserContext);
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: state.address ?? '',
        defaultSearchRadius: 0,
      }}
      onSubmit={(values) => registerUser(values)}
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
          <Input
            style={styles.input}
            label='Address'
            onFocus={() => {
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
            errorMessage={
              errors.firstName && touched.firstName ? errors.firstName : ''
            }
          />
          <Input
            style={styles.input}
            label='Lastname'
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            errorMessage={
              errors.lastName && touched.lastName ? errors.lastName : ''
            }
          />
          <Input
            style={styles.input}
            label='Username'
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
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
            errorMessage={errors.email && touched.email ? errors.email : ''}
          />
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={20}
            onValueChange={(value) => {
              setFieldValue('defaultSearchRadius', value);
            }}
            value={values.defaultSearchRadius}
            thumbStyle={styles.thumb}
          />
          <Text>{values.defaultSearchRadius} km(s)</Text>
          <Button
            onPress={handleSubmit}
            title='Register'
            buttonStyle={styles.button}
          />
        </View>
      )}
    </Formik>
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
});
