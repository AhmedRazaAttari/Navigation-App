import React, {Component} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Logo from '../../../images/logo.png';
import {CustomButton} from '../../Component';

export default class Loading extends Component{
    render(){
        return(
            <View style={styles.ViewDesign}>
                <Image source={Logo} style={styles.LogoSize}/>
                <Text style={styles.FontStyle}>Find the best way to your destination and enjoy the city</Text>
                <CustomButton BackColor="green" Width={200} Height={50} BorderRadius={20} Value="Get Started" FontSize={19} FontColor="white"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    LogoSize : {
        height : 300,
        width : 300
    },
    ViewDesign : {
        display : "flex",
        flex : 1,
        justifyContent : "space-evenly",
        alignItems : "center"
    },
    FontStyle : {
        fontSize : 20,
        textAlign : "center"
    }
})