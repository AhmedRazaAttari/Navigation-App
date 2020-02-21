import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { SearchBar, Chips, ScrollableModal } from '../../Component';
import {Map, MapStyleBtn, MapCompassBtn, MapNavigateBtn, MapGoBtn} from '../../Component/Map';
var width = Dimensions.get("screen").width;

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    // componentDidMount() {
    //     fetch("https://api.foursquare.com/v2/venues/search?ll="+ +"",""+ + "&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD")

    // }
    // static getDerivedStateFromProps(props){
    //     console.log(props.ComponentState)
    // }

    render() {
        console.log(this.props.ComponentState)
        return (
            <View>
                <StatusBar hidden={true} />
                <Map Width="100%" Height="100%" />
                <SearchBar Width={"94%"} Height={55} SideBarBtn={() => this.props.navigation.toggleDrawer()} />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ position: "absolute", width: width, top: 90 }} keyboardShouldPersistTaps="never">
                    <View style={{ flexDirection: "row" }}>
                        <Chips ChipTitle="Restaurants" />
                        <Chips ChipTitle="Coffee" />
                        <Chips ChipTitle="Groceries" />
                        <Chips ChipTitle="Gas" />
                        <Chips ChipTitle="Hotels" />
                        <Chips ChipTitle="ATMs" />
                        <Chips ChipTitle="More" />
                    </View>
                </ScrollView>
                <MapStyleBtn />
                <MapCompassBtn />
                <MapNavigateBtn />
                <MapGoBtn />
            </View>
        )
    }
}