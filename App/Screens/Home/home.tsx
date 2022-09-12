import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {bathymetryData} from './map-style/defaultStyle';
import Icon from "react-native-vector-icons/Ionicons";

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiZGhydXZkYXZlIiwiYSI6ImNsN3lreDNhajAwYXU0M3A0ZjU4MTBoencifQ.v6q1Wc4UbVeOu-LOQ_OGrw',
);

import {lineString as makeLineString} from '@turf/helpers';

const defaultStyle = {
  version: 8,
  name: 'Water',
  sources: {
    map: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      minzoom: 1,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'water',
      source: 'mapbox-streets',
      'source-layer': 'water',
      type: 'fill',
      paint: {
        'fill-color': '#00ffff',
      },
    },
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f2efea',
      },
    },

    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};

const windData = [
  {
    lon: 2.22,
    lat: 78.34,
    data: 445
  },
  {
    lon: 4.45,
    lat: 76.54,
    data: 789
  },
];

const HEIGHT = '100%';
const WIDTH = '100%';


const generateWindOnClick = (long: number, lat:number) => {
  return <MapboxGL.MarkerView
  id={`windd`}
  coordinate={[long, lat]}
>
  <View style={{width: 100}}>
      <Icon name="rainy-sharp" size={20} color={"blue"} />
      <Text style={{color: 'black', fontSize: 12, fontWeight:'700'}}>HEHE</Text>
  </View>
</MapboxGL.MarkerView>
}
const Home = () => {
 
  const [bathymetry, setBathymetry] = useState(false);
  const [showwindData, setWindData] = useState(false);
  const [coordinate, setCoordinates] = useState([0,0]);

  return (
    <View style={styles.page}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: 10,
          top: 0,
          right: 0,
          margin: 20,
          borderRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}>
        <Text style={{color: 'black', textAlign: 'center', marginBottom: 10}}>
          Change Map View
        </Text>
        <Button
          title={!bathymetry ? 'Enable Bathymetry' : 'Disable Bathymetry'}
          onPress={() => setBathymetry(!bathymetry)}
        />
        <View style={{marginTop: 10}}>
         <Button
          title={!showwindData ? 'Show Wind Layer' : 'Hide Wind Layer'}
          onPress={() => setWindData(!showwindData)}
        />
        </View>
      </View>
      <View style={{height: HEIGHT, width: WIDTH}}>

        <MapboxGL.MapView
          // On Press we can get the coordinate of that data point....
          // @ts-ignore
          onPress={(data) => {setCoordinates(data.geometry.coordinates)}}
          style={styles.map}
          styleJSON={
            bathymetry
              ? JSON.stringify(bathymetryData)
              : JSON.stringify(defaultStyle)
          }
          >
            {/* we can add this camera feature to check on zoom stuff */}
          <MapboxGL.Camera
            zoomLevel={2}
            centerCoordinate={[3.2028, 73.2207]}
            animationMode="flyTo"
            animationDuration={1200}
          />

          {/* We can put such customized markers over the map */}
          {/* we can plot obstacles in between also using these markers */}
          <MapboxGL.MarkerView coordinate={[3.2028, 73.2207]} id="marker-1">
            <View style={styles.marker}>
              <Text style={styles.markerText}>A</Text>
            </View>
          </MapboxGL.MarkerView>

          <MapboxGL.MarkerView coordinate={[4.6796, 55.492]} id="marker-1">
            <View style={styles.marker}>
              <Text style={styles.markerText}>B</Text>
            </View>
          </MapboxGL.MarkerView>

          <MapboxGL.ShapeSource
            id="line1"
            shape={makeLineString([
              [3.2028, 73.2207],
              [4.6796, 55.492],
              [4.5796, 54.49]
            ])}>
            <MapboxGL.LineLayer
              id="route"
              style={{lineColor: 'red', lineWidth: 2}}
            />
          </MapboxGL.ShapeSource>

          {/* On Click Generator */}
          {/* {
            generateWindOnClick(coordinate[0], coordinate[1])
          } */}
          {
            showwindData ? 
            <View>
                {
                  windData.map((data: any) => (
      
                    <MapboxGL.MarkerView
                      id={`windd`}
                      coordinate={[data.lon, data.lat]}
                    >
                      <View style={{width: 80, backgroundColor: data.data > 500 ? 'darkblue' : 'blue', borderRadius: 15, paddingVertical: 2, paddingHorizontal: 8}}>
                          {/* <Icon name="rainy-sharp" size={20} color={"blue"} /> */}
                          <Text style={{color: 'white', fontSize: 12, fontWeight:'700', textAlign:'center'}}>{data.data} KMPH</Text>
                      </View>
                    </MapboxGL.MarkerView>
                  ))
                }
            </View> : null
          }
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
  marker: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  markerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default Home;
