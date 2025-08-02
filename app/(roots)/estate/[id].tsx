
import { router } from 'expo-router'
import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const estate = () => {
  return (
    <SafeAreaView>
      <Button title='back' onPress={() => router.back()}/>
      <Text>estate</Text>
    </SafeAreaView>
  )
}

export default estate