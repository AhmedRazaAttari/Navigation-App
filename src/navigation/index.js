import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Home from '../Screens/Screen/Home';

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    
}, {
    drawerType : "slide",
    contentComponent: (props) => (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', padding : 10 }}>
                {/* <Image source= style={{borderRadius : 100, height : 70, width : 70}}/> */}
                <Text style={{ fontSize: 30 }}>NavigationApp</Text>
            </View>
            <DrawerNavigatorItems {...props} />
        </SafeAreaView>
    )
}
);

const MyApp = MyDrawerNavigator;

export default MyApp;