import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, TextInput, Modal, Keyboard, ScrollView, FlatList, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import { ListItem } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, EvilIcons, Feather, Entypo } from '@expo/vector-icons';
import { RNChipView } from 'react-native-chip-view'
import Loading from '../images/3sqI.gif';


var SearchedData = [];
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.BtnClick}>
                <View style={{ backgroundColor: this.props.BackColor, width: this.props.Width, height: this.props.Height, borderRadius: this.props.BorderRadius, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: this.props.FontSize, color: this.props.FontColor }}>{this.props.Value}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

class CustomTextBox extends Component {
    render() {
        return (
            <TextInput
                style={{
                    width: this.props.Width,
                    height: this.props.Height,
                    fontSize: 19,
                    color: "black"
                }}
                onChangeText={this.props.ONChangeText}
                placeholderTextColor={this.props.PlaceholderColor}
                placeholder={this.props.Value}
                onFocus={this.props.ONFocus}
                onBlur={this.props.ONBlur}
                autoFocus={this.props.AutoFocus}
            />
        )
    }
}

class Chips extends Component {
    render() {
        return (
            <View style={{ marginLeft: 15 }}>
                <RNChipView
                    title={this.props.ChipTitle}
                    avatar={this.props.ChipIcon}
                    onPress={this.props.ChipSelected}
                    backgroundColor="#333c54"
                    titleStyle={{
                        color: "white"
                    }}
                />
            </View>
        )
    }
}

class SearchBar extends Component {

    constructor() {
        super();

        this.state = {
            SearchBarActive: false,
            marker_lat: null,
            marker_long: null,
            dataFetched: false,
            SearchBarTxt: ""
        }
        this.SearchLocation = this.SearchLocation.bind(this);
    }

    Search = () => {
        this.setState({
            SearchBarActive: true
        })
    }

    CancelSearch = () => {
        this.setState({
            SearchBarActive: false
        })
        Keyboard.dismiss();
    }

    // async componentDidMount() {

    //     // Location.watchPositionAsync({ timeInterval: 7000, distanceInterval: 0.1 }, loc => {
    //     //     // console.log('watching***', loc);
    //     //     this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
    //     // })

    // }

    async SearchLocation(e) {
        console.log(e)
        this.setState({
            SearchBarTxt: e
        })
        let items = [];
        await fetch("https://api.foursquare.com/v2/venues/suggestcompletion?ll=" + this.state.marker_lat + "," + this.state.marker_long + "&client_id=NQE3ACGGUP4NAIZSDVEGBTAFVHXU1JCYGWFKKFPJQ3JPDCVW&client_secret=X3FNU5RO5Y20LSBGO34D0HX5XVLTOI1V0KFHWCCHWM2ID1AN&v=20200205&query=" + e)
            .then(res => res.json())
            .then((response) => {

                for (var i = 0; i < response.response.minivenues.length; i++) {

                    items.push({
                        nameOfPlace: response.response.minivenues[i].name,
                        LocationObj: response.response.minivenues[i].location
                    })
                }
                SearchedData = items;
                this.setState({
                    dataFetched: true
                })
                console.log(SearchedData)

            })


    }


    Show_Modal() {
        return <Modal
            animationType="slide"
            // transparent={false}
            visible={true}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        // }}
        >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <View style={{
                    width: this.props.Width, height: this.props.Height, borderRadius: 10, elevation: 4,
                    backgroundColor: "white", justifyContent: "space-between", flexDirection: "row", marginTop: 20,
                    alignSelf: "center", alignItems: "center", padding: 12
                }}>
                    <TouchableOpacity onPress={this.CancelSearch}><AntDesign name="arrowleft" size={25} color="black" /></TouchableOpacity>
                    <CustomTextBox Width={215} Value="Search Here" ONFocus={this.Search} ONBlur={this.CancelSearch} PlaceholderColor={!this.state.SearchBarActive ? "white" : "black"} AutoFocus={true} ONChangeText={(e) => this.SearchLocation(e)} />
                    {this.state.SearchBarTxt.length ? <TouchableHighlight>
                        <Entypo name="cross" size={26} color="black" />
                    </TouchableHighlight> : <TouchableHighlight onPress={this.props.RecordAudio}>
                            <MaterialIcons name="keyboard-voice" size={26} color="black" />
                        </TouchableHighlight>}
                </View>
                
               
            </View>
        </Modal>
    }

    SearchBarView() {
        return <View style={{
            width: this.props.Width, height: this.props.Height, borderRadius: 10, elevation: 4,
            backgroundColor: "black", position: "absolute", justifyContent: "space-around", flexDirection: "row", top: 20,
            alignSelf: "center", alignItems: "center"
        }}>
            <TouchableOpacity onPress={this.props.SideBarBtn}>
                <MaterialCommunityIcons name="reorder-horizontal" size={30} color="white" />
            </TouchableOpacity>
            <CustomTextBox Width={140} Value="Search Here" ONFocus={this.Search} ONBlur={this.CancelSearch} />
            <TouchableHighlight onPress={this.props.RecordAudio}>
                <MaterialIcons name="keyboard-voice" size={26} color="white" />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.UserBtn}>
                <FontAwesome name="user-circle-o" size={24} color="white" />
            </TouchableHighlight>
        </View>
    }

    render() {
        return (
            !this.state.SearchBarActive ? this.SearchBarView() : this.Show_Modal()
        )
    }
}


export {
    CustomButton,
    SearchBar,
    Chips,
}

var styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
})
