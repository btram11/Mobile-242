import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View, Image } from 'react-native'

import { logo1 } from '../constants/logos'

export default function RootLayout({ children }) {
    return (
        <SafeAreaView className="bg-primary h-full w-full flex-1 items-center justify-center p-0 m-0">
            {/* <ScrollView contentContainerStyle={{ height: '100%', width: '100%' }}> */}
            {/* <ScrollView className='bg-black flex-1 h-full w-full'> */}
                <View className='w-full h-full flex-1 items-center justify-center'>
                    <View className='h-20 w-full absolute top-0 items-center justify-center'>
                        <Image
                            source={logo1}
                            className='h-20'  // cannot use w-52, height-52 in tailwind
                            resizeMode='contain' />
                    </View>
                    {children}
                </View>
                
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}