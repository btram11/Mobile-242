import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Link } from 'expo-router'

import "./global.css";
import { Redirect, router } from 'expo-router'
import HomeScreen from "./app/index"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Regular'
  }
})

export default function App() {
  return (
    <HomeScreen />
  )
}