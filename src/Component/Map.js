import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableHighlight, Text, Keyboard } from 'react-native';
import MapView, {
    Marker,
    AnimatedRegion
} from 'react-native-maps';
import MarkerIcon from '../images/download.jpg';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


var mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
]

class Map extends Component {

    state = {
        marker_lat: LATITUDE,
        marker_long: LONGITUDE,
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
        }),
        isloading : true
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA, Permissions.AUDIO_RECORDING);
        this.setState({ hasCameraPermission: status === 'granted' });

        let location = await Location.getCurrentPositionAsync({});
        // console.log('location****', location)
        this.setState({ location });

        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
            // console.log('watching***', loc);
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

    }



    render() {
        return (
            
            <MapView style={{ width: this.props.Width, height: this.props.Height }}
                followsUserLocation
                showsMyLocationButton={true}
                showsUserLocation
                customMapStyle={mapStyle}
                provider="google"
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                <Marker
                    // icon={}
                    // pinColor="purple"
                    coordinate={{
                        latitude: this.state.marker_lat,
                        longitude: this.state.marker_long
                    }}>
                    <View style={{ elevation: 10 }}>
                        <Image source={MarkerIcon} style={{ width: 30, height: 30, borderRadius: 100 }} />
                    </View>

                </Marker>
            </MapView>
        )
    }
}


class MapStyleBtn extends Component {
    render() {
        return (
            <View style={{ padding: 10, borderRadius: 100, position: "absolute", right: 10, top: 150, backgroundColor: "#333c54" }}>
                <TouchableHighlight>
                    <SimpleLineIcons name="layers" size={23} color="white" />
                </TouchableHighlight>
            </View>
        )
    }
}


class MapCompassBtn extends Component {
    render() {
        return (
            <View style={{ padding: 10, borderRadius: 100, position: "absolute", right: 10, top: 210, backgroundColor: "#333c54" }}>
                <TouchableHighlight>
                    <SimpleLineIcons name="compass" size={24} color="white" />
                </TouchableHighlight>
            </View>
        )
    }
}


class MapNavigateBtn extends Component {
    render() {
        return (
            <View style={{ padding: 15, borderRadius: 100, position: "absolute", right: 12, bottom: 160, backgroundColor: "white" }}>
                <TouchableHighlight>
                    <Ionicons name="md-locate" size={30} color="#3b70d9" />
                </TouchableHighlight>
            </View>
        )
    }
}



class MapGoBtn extends Component {
    render() {
        return (
            <View style={{ width: 60, height: 60, borderRadius: 100, position: "absolute", right: 12, bottom: 90, backgroundColor: "#3b70d9", alignItems: "center", justifyContent: "center", padding: 5 }}>
                <TouchableHighlight>
                    <View style={{ alignItems: "center" }}>
                        <MaterialCommunityIcons name="directions" size={30} color="white" />
                        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>Go</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}


export {
    Map,
    MapStyleBtn,
    MapCompassBtn,
    MapNavigateBtn,
    MapGoBtn
}

