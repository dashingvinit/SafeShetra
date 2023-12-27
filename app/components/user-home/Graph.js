import React, { useState,  useEffect,  } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Axios from '../../constants/Axios';
import LottieView from 'lottie-react-native';

const Graph = () => {
  const [redZoneCoordinates, setRedZoneCoordinates] = useState(null);
  const [greenZoneCoordinates, setGreenZoneCoordinates] = useState(null);
  const [location, setLocation] = useState(null) 
  const [isLoading, setIsLoading] = useState(true);


 

  const fetchHazardDetails = async () => {
    try {
      const response = await Axios.get('/hazard');
      setRedZoneCoordinates(response.data.coordinates2km);
      setGreenZoneCoordinates(response.data.coordinates3km);
      setLocation(response.data);
      console.log(redZoneCoordinates, greenZoneCoordinates);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching hazard details:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHazardDetails();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container1}>
        <LottieView
          autoPlay
          autoSize
          source={require('../../assets/lottieFiles/maps.json')}
          style={styles.lottieView}
        />
      </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.centerLat,
            longitude: location.centerLng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          {/* Red Zone */}
          {redZoneCoordinates && (
            <Polygon
              coordinates={redZoneCoordinates}
              fillColor="rgba(184, 0, 0, .3)"
              strokeColor="rgba(184, 0, 0, .3)"
            />
          )}

          {/* Green Zone */}
          {greenZoneCoordinates && (
            <Polygon
              coordinates={greenZoneCoordinates}
              fillColor="rgba(255, 152, 0, 0.4)"
              strokeColor="rgba(255, 152, 0, 0.4)"
            />
          )}
        </MapView>
      )}

      {/* Red Button */}
      <TouchableOpacity
        style={styles.redButton}
        onPress={() => fetchHazardDetails()}>
        <Text style={styles.redButtonText}>Get Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 500,
  },
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
