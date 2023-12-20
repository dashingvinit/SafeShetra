import React, { useState, useEffect } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Axios } from '../../constants/Axios';
import * as Location from 'expo-location';

const Graph = () => {
  const [pressed, setpressed] = useState('null');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location);
          location.latitude;
        } catch (error) {
          console.error('Error getting current location:', error);
        }
      } catch (error) {
        console.error('Error fetching target location:', error);
      }
    };
    getLocation();
  }, []);

  const fetchHazardDetails = async () => {
    try {
      const { latitude, longitude } = location.coords;
      const industryId = '12345678';
      const hazard_title = 'Fire';
      console.log(latitude, longitude, hazard_title, industryId);

      const response = await Axios.post('/hazard', {
        centerLat: latitude,
        centerLng: longitude,
        hazard_title,
        industryId,
      });
      console.log(response);
    } catch (error) {
      console.error('Error fetching hazard details:', error);
      throw error;
    }
  };

  const redZoneCoordinates = [
    {
      latitude: 17.447317218018018,
      longitude: 78.462976,
    },
    {
      latitude: 17.44610050143071,
      longitude: 78.46948485885022,
    },
    {
      latitude: 17.442614675985958,
      longitude: 78.47511466024588,
    },
    {
      latitude: 17.437330521725702,
      longitude: 78.4791050683127,
    },
    {
      latitude: 17.4309616929633,
      longitude: 78.48091715632964,
    },
    {
      latitude: 17.424368335314014,
      longitude: 78.48030619176888,
    },
    {
      latitude: 17.418440918263435,
      longitude: 78.47735468877983,
    },
    {
      latitude: 17.413979972329194,
      longitude: 78.47246126419599,
    },
    {
      latitude: 17.41158797297867,
      longitude: 78.46628680212282,
    },
    {
      latitude: 17.41158797297867,
      longitude: 78.45966519787717,
    },
    {
      latitude: 17.413979972329194,
      longitude: 78.45349073580401,
    },
    {
      latitude: 17.418440918263435,
      longitude: 78.44859731122017,
    },
    {
      latitude: 17.424368335314014,
      longitude: 78.44564580823112,
    },
    {
      latitude: 17.4309616929633,
      longitude: 78.44503484367036,
    },
    {
      latitude: 17.437330521725702,
      longitude: 78.44684693168729,
    },
    {
      latitude: 17.442614675985958,
      longitude: 78.45083733975412,
    },
    {
      latitude: 17.44610050143071,
      longitude: 78.45646714114977,
    },
  ];

  const greenZoneCoordinates = [
    // Use the coordinates3km for the green zone
    { latitude: 17.456326227027027, longitude: 78.462976 },
    { latitude: 17.437651010658783, longitude: 78.48868023017013 },
    { latitude: 17.407433875827703, longitude: 78.4788620878998 },
    { latitude: 17.407433875827703, longitude: 78.4470899121002 },
    { latitude: 17.437651010658783, longitude: 78.43727176982986 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 17.43486707377252,
          longitude: 78.462976,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {/* Red Zone */}
        <Polygon
          coordinates={redZoneCoordinates}
          fillColor="rgba(184, 0, 0, .3)"
          strokeColor="rgba(184, 0, 0, .3)"
        />

        {/* Green Zone */}
        <Polygon
          coordinates={greenZoneCoordinates}
          fillColor="rgba(255, 152, 0, 0.4)"
          strokeColor="rgba(255, 152, 0, 0.4)"
        />
      </MapView>

      {/* Red Button */}
      <TouchableOpacity
        style={styles.redButton}
        onPress={() =>
          fetchHazardDetails(
            location.coords.latitude,
            location.coords.longitude
          )
        }>
        <Text style={styles.redButtonText}>Get Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 450,
    marginHorizontal: 8,
    marginBottom: 5,
    borderRadius: 25,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    borderRadius: 25,
  },
  redButton: {
    backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottomborderRadius: 10,
  },
  redButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Graph;
