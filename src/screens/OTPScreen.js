import React, { useState, useRef, useContext, useEffect } from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import { Button, Badge, Input } from 'react-native-elements';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Context as UserContext } from '../contexts/user-context';
import firebase from '../config/firebase-config';
import Constants from 'expo-constants';
import { isValidNumber } from 'libphonenumber-js';

export const OTPScreen = ({ navigation }) => {
  const { state, OTPSignin } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationError, setVerificationError] = useState(false);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (state.authenticated) return navigation.navigate('Registration');
  }, []);

  const requestOTP = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const phnNo = '+91'.concat(phoneNumber);
      const isValidNo = isValidNumber(phnNo);
      if (!isValidNo) {
        return Alert.alert(
          'That looks like an invalid phone number. Try again!'
        );
      }
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phnNo,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmOTP = async (code) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      const uuid = Constants.deviceId;
      const userData = await firebase.auth().signInWithCredential(credential);
      OTPSignin(
        {
          _id: userData.user.uid,
          contactNumber: userData.user.phoneNumber,
          uuid,
        },
        () => navigation.navigate('Registration')
      );
    } catch (error) {
      setVerificationError(true);
    }
  };

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Please enter your phone number</Text>
        <View style={styles.parent}>
          <Badge value='+91' badgeStyle={styles.badge} />
          <Input
            inputStyle={styles.input}
            placeholder='Ex: 9901199218'
            keyboardType='phone-pad'
            autoCompleteType='tel'
            onChangeText={setPhoneNumber}
          />
        </View>
        <Button title='Send OTP' onPress={requestOTP} raised />
      </View>
      {verificationId ? (
        <View style={styles.parent2}>
          <Text style={styles.verifyOtp}>Verify OTP</Text>
          <OTPInputView
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad
            editable
            keyboardAppearance='dark'
            onCodeFilled={confirmOTP}
          />
          {verificationError ? (
            <Text style={styles.error}>Error! Please try again!</Text>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  parent2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  otpInput: {
    alignSelf: 'center',
    width: '80%',
    height: 100,
    color: 'black',
  },
  verifyOtp: {
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    color: 'black',
  },
  badge: {
    height: 40,
    width: 40,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  error: {
    color: 'red',
    fontSize: 20,
  },
});
