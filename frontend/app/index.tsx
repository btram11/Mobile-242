// @ts-nocheck

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Link } from 'expo-router'

import { logo1 } from '../constants/logos'
import { CustomButtonPrimary, CustomButtonSecondary } from '../components/CustomButton'

import { Redirect, router } from 'expo-router'

import RootLayout from '@/layouts/RootLayout'
import { useGlobalContext } from '@/context/GlobalProvider'

export default function HomeScreen() {

  return (
    <RootLayout>
      <View className='flex-1 h-full w-full justify-center items-center'>
        <Text className=' text-secondary font-latobold text-4xl m-2'>Start here, go anywhere!</Text>
        <Text className='text-secondary font-lato my-8 mx-2 text-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a euismod sapien. Ut nec posuere nisl, ut pretium est. Mauris sed maximus velit, at varius enim.
        </Text>

        <CustomButtonPrimary
          text="Get started"
          buttonStyle=""
          textStyle=""
          handlePress={() => { router.push('./(tabs)/home') }} />
      </View>
    </RootLayout>
  )
}