import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import MapView from 'react-native-maps';
import { Context as UserContext } from '../contexts/user-context';
import { generateGeocodeURI } from '../config/constants';
import marker from '../../assets/marker_64.png';

export const Map = () => {
  const { updateLocationAndAddress } = useContext(UserContext);
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
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
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={marker} />
      </View>
      <SafeAreaView style={styles.footer}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
