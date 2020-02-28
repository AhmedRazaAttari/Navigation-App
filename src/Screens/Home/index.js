import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import { SearchBar, Chips, ScrollableModal } from '../../Component';
import { Map, MapStyleBtn, MapCompassBtn, MapNavigateBtn, MapGoBtn } from '../../Component/Map';
var width = Dimensions.get("screen").width;
var categories = ["Restaurant", "Petrol Pump", "Shrine", "Hotel", "ATM", "Masjid", "Hospital", "Bank"]
import { GetLocation } from '../../Component/globalFunctions.js';
import LoadingGif from '../../images/loader.gif';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isloading: false,
            latitude: null,
            longitude: null
        }

    }

    async SearchByCategory(SearchValue) {
        GetLocation(SearchValue)
            // .then(result => {
            //     console.log(result.coords.latitude);
            //     this.setState({
            //         isloading: true,
            //         latitude: result.coords.latitude,
            //         longitude: result.coords.longitude
            //     })
            // })
            // .then(() => {
               
            // }).then(() => {
            //     this.setState({
            //         isloading: false
            //     })
            // })
    }

    render() {
        // console.log(this.props.ComponentState)
        return (
            <View>
                <StatusBar hidden={true} />
                <Map Width="100%" Height="100%" />
                <SearchBar Width={"94%"} Height={55} SideBarBtn={() => this.props.navigation.toggleDrawer()} />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ position: "absolute", width: width, top: 90 }} keyboardShouldPersistTaps="never">
                    <View style={{ flexDirection: "row" }}>
                        {categories.map((items, i) => {
                            return <Chips key={i} ChipTitle={items} ChipSelected={() => this.SearchByCategory(items)} />
                        })}
                    </View>
                </ScrollView>
                <MapStyleBtn />
                <MapCompassBtn />
                <MapNavigateBtn />
                <MapGoBtn />
                {this.state.isloading && <View style={{ position: "absolute", width: 90, height: 90, left: "36%", top: "43%" }}><Image source={LoadingGif} style={{ width: 90, height: 90 }} /></View>}
            </View>
        )
    }
}