import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Home from '../Screens/Home';
import Logo from '../images/logo.png';

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    
}, {
    drawerType : "front",
    contentComponent: (props) => (
        <SafeAreaView style={{ flex: 1, backgroundColor : "#161d2b" }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'space-around', padding : 10, backgroundColor : "#161d2b" }}>
                <Image source={Logo}  style={{borderRadius : 100, height : 80, width : 80}}/>
                <Text style={{ fontSize: 30, color : "white" }}>Navigation App</Text>
            </View>
            <DrawerNavigatorItems {...props} />
        </SafeAreaView>
    )
}
);

const MyApp = MyDrawerNavigator;

export default MyApp;