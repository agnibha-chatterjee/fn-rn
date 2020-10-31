import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, Switch } from 'react-native';
import { Input, Divider, Button, ButtonGroup } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Context as UserContext } from '../contexts/user-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const schema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be atleast 3 characters long')
    .required('Title is required'),
  description: Yup.string()
    .min(3, 'Description must be atleast 3 characters long')
    .required('Description is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  expiration: Yup.string().required('Expiration is required'),
});

const typePickerItems = [
  { label: 'Request', value: 'request', key: 2 },
  { label: 'Offering', value: 'offering', key: 3 },
];

const locationPickerItems = [
  { label: 'Use default location', value: 'default', key: 0 },
  { label: 'Select custom location', value: 'custom', key: 1 },
];

const ISO_END = 'T23:59:00.000Z';

export const RequestForm = () => {
  const navigation = useNavigation();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const DefaultButton = () => <Text>Default Location</Text>;
  const CustomButton = () => {
    return (
      <Text
        onPress={() => {
          navigation.navigate('Map');
          setSelectedIdx(1);
        }}>
        Custom Location
      </Text>
    );
  };
  const buttons = [{ element: DefaultButton }, { element: CustomButton }];
  const { state } = useContext(UserContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          type: 'request',
          title: '',
          description: '',
          contactNumber: state.contactNumber ?? '',
          expiration: new Date(),
          price: '0',
          selectedIndex: selectedIdx,
        }}
        onSubmit={(values) => {
          const finalValues = {
            ...values,
            location:
              values.selectedIndex === 0
                ? state.defaultLocation
                : state.customLocation,
            searchRadius: state.defaultSearchRadius,
            price: parseInt(values.price),
          };
          console.log(finalValues);
        }}
        validateOnChange
        validationSchema={schema}>
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <View style={styles.container}>
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Type of Request</Text>
                <RNPickerSelect
                  style={styles.picker}
                  onValueChange={handleChange('type')}
                  items={typePickerItems}
                  onBlur={handleBlur('type')}
                  value={values.type}
                  placeholder={{}}
                />
                <Divider />
              </View>
              <Input
                style={styles.input}
                label='Title'
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                errorMessage={errors.title && touched.title ? errors.title : ''}
              />
              <Input
                style={styles.input}
                label='Description'
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                errorMessage={
                  errors.description && touched.description
                    ? errors.description
                    : ''
                }
              />
              <Input
                style={styles.input}
                label='Contact Number'
                onChangeText={handleChange('contactNumber')}
                onBlur={handleBlur('contactNumber')}
                value={values.contactNumber}
                errorMessage={
                  errors.contactNumber && touched.contactNumber
                    ? errors.contactNumber
                    : ''
                }
              />
              <Input
                style={styles.input}
                label='Expiration Date'
                onFocus={() => setShowDatePicker(true)}
                value={values.expiration.toISOString().split('T')[0]}
                errorMessage={
                  errors.expiration && touched.expiration
                    ? errors.expiration
                    : ''
                }
              />
              {showDatePicker ? (
                <DateTimePicker
                  onChange={(event, date) => {
                    if (!date) {
                      return setShowDatePicker(false);
                    }
                    setShowDatePicker(false);
                    setFieldValue('expiration', new Date(date));
                  }}
                  mode='date'
                  display='calendar'
                  value={values.expiration}
                />
              ) : null}
              <View style={styles.priceContainer}>
                <Text>Do you want to add a price quote?</Text>
                <Switch value={toggle} onValueChange={setToggle} />
              </View>
              {toggle ? (
                <Input
                  style={styles.input}
                  label='Price'
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  keyboardType='number-pad'
                  errorMessage={
                    errors.price && touched.price ? errors.price : ''
                  }
                />
              ) : null}
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Select your preferred location</Text>
                <ButtonGroup
                  onPress={(idx) => {
                    setFieldValue('selectedIndex', idx);
                    if (idx === 1) {
                      navigation.navigate('Map');
                    }
                  }}
                  selectedIndex={values.selectedIndex}
                  buttons={buttons}
                  containerStyle={{ height: 40 }}
                />
                <Text style={styles.address}>
                  {values.selectedIndex === 0
                    ? `Default address : ${state.address}`
                    : `Custom address : ${state.customAddress}`}
                </Text>
                <Divider />
              </View>
              <Button
                onPress={handleSubmit}
                title='Submit'
                buttonStyle={styles.button}
              />
            </View>
          );
        }}
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
  picker: {
    marginBottom: 15,
  },
  label: {
    marginLeft: 7,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
  },
  address: {
    margin: 10,
  },
});
