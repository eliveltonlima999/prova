import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

Icon.loadFont();

import Home from "./pages/Home";
import Assignment from "./pages/Assignment";


const Routes = createMaterialBottomTabNavigator(
    {
        Início: {
            screen: Home,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                    <Icon name="home" size={25} color={focused ? '#FFF' : '#DDD'} />
                )
            }),
        },
        Adicionar: {
            screen: Assignment,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                    <Icon name="plus" size={25} color={focused ? '#FFF' : '#DDD'} />
                ),
            })
        }
    }, {
        barStyle: {
            backgroundColor: '#3380FF'
        },
        tabBarOptions: {
            style: {
                paddinTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
            }
        },
        initialRouteName: "Início"
    }
);

export default createAppContainer(Routes);