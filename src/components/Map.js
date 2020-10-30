import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import { Button, Slider } from 'react-native-elements';
import axios from 'axios';
import MapView, { Circle } from 'react-native-maps';
import { Context as UserContext } from '../contexts/user-context';
import { generateGeocodeURI, MULTIPLY_FACTOR } from '../config/constants';
import marker from '../../assets/marker_64.png';

export const Map = () => {
  const {
    state: { defaultSearchRadius },
    updateLocationAndAddress,
    updateSearchRadius,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const saveLocation = async () => {
    const res = await axios.get(
      generateGeocodeURI(region.latitude, region.longitude)
    );
    updateLocationAndAddress(res.data.display_name, region, () =>
      navigation.goBack()
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (!region) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        loadingEnabled
        showsUserLocation>
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={
            defaultSearchRadius
              ? defaultSearchRadius * MULTIPLY_FACTOR
              : MULTIPLY_FACTOR
          }
          strokeWidth={1}
          strokeColor='#1a66ff'
          fillColor={'rgba(230,238,255,0.5)'}
          key={1}
        />
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={marker} />
      </View>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.label}>Your preferred search radius</Text>
        <Slider
          style={styles.slider}
          step={1}
          minimumValue={1}
          maximumValue={20}
          onValueChange={updateSearchRadius}
          value={defaultSearchRadius}
          thumbStyle={styles.thumb}
        />
        <Text style={{ ...styles.label, marginTop: -5, marginBottom: 10 }}>
          {defaultSearchRadius} km(s)
        </Text>
        <Button title='Confirm' raised onPress={saveLocation} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingTop: 10,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: 'black',
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
});
