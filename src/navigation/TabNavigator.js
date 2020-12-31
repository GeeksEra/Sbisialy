
import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { theme } from '../core/theme';
import { createStackNavigator } from 'react-navigation';
import { Image } from 'react-native'
import You from "../screens/home/bottoms/you";
import Browse from "../screens/home/bottoms/browse";
import Cart from "../screens/home/bottoms/cart";
import Wishlist from "../screens/home/bottoms/notiifcations";
import Notifications from "../screens/home/bottoms/explore";

import { translate } from '../utils/utils';
import { moderateScale } from 'react-native-size-matters';

const TabBarComponent = (props) => (<BottomTabBar {...props} />);




const BrowseStack = createStackNavigator(
    {
        Browse: { screen: Browse },
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        navigationOptions: {
            header: null,
            tabBarIcon: ({ focused }) => <Image resizeMode="contain" source={require('../assets/assets/home.png')} style={{ width: focused ? moderateScale(23) : moderateScale(21), height: focused ? moderateScale(21) : moderateScale(21), tintColor: focused ? theme.colors.secondary : theme.colors.primary, paddingBottom: 5 }} />,
        }
    }
);

const CartStack = createStackNavigator(
    {
        Cart: { screen: Cart }
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        navigationOptions: {
            header: null,
            tabBarIcon: ({ focused }) => <Image resizeMode="contain" source={require('../assets/assets/events.png')} style={{ width: focused ? moderateScale(23) : moderateScale(21), height: focused ? moderateScale(21) : moderateScale(21), tintColor: focused ? theme.colors.secondary : theme.colors.primary, paddingBottom: 5 }} />,

        }
    }
);

const WishlistStack = createStackNavigator(
    {
        Wishlist: { screen: Wishlist }
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        navigationOptions: {
            header: null,
            tabBarIcon: ({ focused }) => <Image resizeMode="contain" source={require('../assets/assets/notificaiton.png')} style={{ width: focused ? moderateScale(23) : moderateScale(21), height: focused ? moderateScale(21) : moderateScale(21), tintColor: focused ? theme.colors.secondary : theme.colors.primary, paddingBottom: 5 }} />,
        }
    }
);



const ExploreStack = createStackNavigator(
    {
        Notifications: { screen: Notifications }
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        navigationOptions: {
            header: null,
            tabBarIcon: ({ focused }) => <Image resizeMode="contain" source={require('../assets/assets/search.png')} style={{ width: focused ? moderateScale(23) : moderateScale(21), height: focused ? moderateScale(21) : moderateScale(21), tintColor: focused ? theme.colors.secondary : theme.colors.primary, paddingBottom: 5 }} />,
        }
    }
);

const YouStack = createStackNavigator(
    {
        You: { screen: You }
    },
    {
        defaultNavigationOptions: {
            header: null,
        },
        navigationOptions: {
            header: null,
            tabBarIcon: ({ focused }) => <Image resizeMode="contain" source={require('../assets/assets/account.png')} style={{ width: focused ? moderateScale(23) : moderateScale(21), height: focused ? moderateScale(21) : moderateScale(21), tintColor: focused ? theme.colors.secondary : theme.colors.primary, paddingBottom: 5 }} />,
        }
    }
);

const BottomTabNavigator = createBottomTabNavigator({
    Browse: {
        screen: BrowseStack,
        navigationOptions: ({ navigation }) => {
            return { tabBarLabel: translate('Hometab').toUpperCase(), }
        }
    },
    Explore: {
        screen: ExploreStack,
        navigationOptions: ({ navigation }) => {
            return { tabBarLabel: translate('Explore').toUpperCase(), }
        }
    },
    Cart: {
        screen: CartStack,
        navigationOptions: ({ navigation }) => {
            return { tabBarLabel: translate('Workshops').toUpperCase(), }
        }
    },
    Wishlist: {
        screen: WishlistStack,
        navigationOptions: ({ navigation }) => {
            return { tabBarLabel: translate('Notifications').toUpperCase(), }
        }
    },
    You: {
        screen: YouStack,
        navigationOptions: ({ navigation }) => {
            return { tabBarLabel: translate('Account').toUpperCase(), }
        }
    },
},
    {
        tabBarComponent: props =>
            <TabBarComponent
                {...props}
                style={{
                    borderTopWidth: 0,
                    paddingTop: moderateScale(0),
                    height: moderateScale(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                }}
            />,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: theme.colors.secondary,
            inactiveTintColor: theme.colors.primary,
            tintColor: theme.colors.white,
            showLabel: false,
            style: {
                borderTopWidth: 0,
                paddingTop: moderateScale(0),
                height: moderateScale(55),
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 0 }
            }
        },
    },
);



export default BottomTabNavigator;
