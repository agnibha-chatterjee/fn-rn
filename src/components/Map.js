import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const Map = ({ navigation }) => {
  const [latLng, setLatLng] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChange={setRegion}
        style={styles.mapStyle}>
        <Marker
          draggable
          coordinate={latLng}
          onDragEnd={(e) => setLatLng(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
