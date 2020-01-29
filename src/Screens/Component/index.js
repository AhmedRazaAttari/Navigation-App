import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class CustomButton extends Component{
    render(){
        return(
            <TouchableOpacity>
                <View style={{backgroundColor : this.props.BackColor, width : this.props.Width, height : this.props.Height, borderRadius : this.props.BorderRadius, alignItems : "center", justifyContent : "center"}}>
                    <Text style={{fontSize : this.props.FontSize, color : this.props.FontColor}}>{this.props.Value}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export {
    CustomButton
}