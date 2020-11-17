import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Button, Badge, Input, Overlay } from 'react-native-elements';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Context as UserContext } from '../contexts/user-context';
import firebase from '../config/firebase-config';
import Constants from 'expo-constants';
import { isValidNumber } from 'libphonenumber-js';
import login_fg from '../../assets/login_fg.png';
import login_bg from '../../assets/login_bg.png';

export const OTPScreen = ({ navigation }) => {
  const { state, OTPSignin } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationError, setVerificationError] = useState(false);
  const [otp, setOtp] = useState('');
  const [visible, setVisible] = useState(false);
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
      setVisible(true);
    } catch (err) {
      Alert.alert('Error fetching OTP. Try again!');
    }
  };

  const toggleOverlay = () => setVisible((prevVisible) => !prevVisible);

  const confirmOTP = async (code) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      const uuid = Constants.deviceId;
      const userData = await firebase.auth().signInWithCredential(credential);
      setVisible(false);
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
    <ImageBackground source={login_bg} style={styles.bgImage}>
      <>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
        <Image source={login_fg} style={styles.image} />
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
          <Button title='Request OTP' onPress={requestOTP} raised />
        </View>
        {verificationId ? (
          <ScrollView>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.parent2}>
                <Text style={styles.verifyOtp}>Verify OTP</Text>
                <OTPInputView
                  style={styles.otpInput}
                  pinCount={6}
                  autoFocusOnLoad
                  keyboardAppearance='dark'
                  secureTextEntry
                  keyboardType='number-pad'
                  code={otp}
                  onCodeChanged={setOtp}
                  onCodeFilled={confirmOTP}
                />
                {verificationError ? (
                  <>
                    <Text style={styles.error}>
                      Incorrect OTP. Please try again!
                    </Text>
                    <Button
                      title='Clear OTP'
                      buttonStyle={styles.clearOtp}
                      onPress={() => {
                        setVerificationError(null);
                        setOtp('');
                      }}
                    />
                  </>
                ) : null}
              </View>
            </Overlay>
          </ScrollView>
        ) : null}
      </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingTop: 35,
    marginTop: 1,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  parent2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    alignSelf: 'center',
    width: '85%',
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
    marginBottom: 20,
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
  image: {
    marginVertical: 40,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  clearOtp: {
    marginVertical: 15,
  },
});
