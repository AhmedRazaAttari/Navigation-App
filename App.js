import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoadingScreen from './src/Screens/Loading';
import HomeScreen from './src/Screens/Home';
import Navigation from './src/navigation';

const StackNavigator = createStackNavigator({
  LoadingScreen : {screen : LoadingScreen, navigationOptions : {
    headerShown : false
  }},
  Drawer : {
   screen : Navigation,
   navigationOptions : {
     headerShown : false,
   }
  },
}, {
  // mode : "modal",
});

export default createAppContainer(StackNavigator);