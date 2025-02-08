// @ts-nocheck
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

function Profile() {

  return (
    <View className='bg-primary flex-1 items-center justify-center'>
      <Text>Profile Page</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})