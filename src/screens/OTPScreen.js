import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Badge, Input } from 'react-native-elements';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firebase from '../config/firebase-config';
import { Context as UserContext } from '../contexts/user-context';

export const OTPScreen = ({ navigation }) => {
  const { OTPSignin } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationError, setVerificationError] = useState(false);
  const recaptchaVerifier = useRef(null);

  const requestOTP = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const phnNo = '+91'.concat(phoneNumber);
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
      const userData = await firebase.auth().signInWithCredential(credential);
      OTPSignin(
        { uid: userData.user.uid, phoneNumber: userData.user.phoneNumber },
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
            onChangeText={(value) => setPhoneNumber(value)}
          />
        </View>
        <Button title='Send OTP' onPress={requestOTP} raised />
      </View>
      {verificationId ? (
        <View style={styles.parent2}>
          <Text style={styles.verifyOtp}>Verify OTP</Text>
          <OTPInputView
            style={styles.otpInput}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            pinCount={6}
            autoFocusOnLoad
            editable={true}
            keyboardAppearance='dark'
            onCodeFilled={(code) => {
              confirmOTP(code);
            }}
          />
          {verificationError ? <Text>Error! Please try again!</Text> : null}
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

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
