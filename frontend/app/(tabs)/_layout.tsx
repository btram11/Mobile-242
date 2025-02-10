//@ts-nocheck
import { Tabs, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Image } from 'react-native'

// import house from '../../assets/icons/house.png'
import { house, bookmark, create, profile } from '../../constants/icons'
import { useGlobalContext } from '@/context/GlobalProvider'
// import { Bookmark, Create, Profile } from 'lucide-react-native'

const TabIcon = ({ focused, icon, name, color }) => {
    return (
        <View className="flex-1 items-center justify-center">
            <Image source={icon} className={`w-6 h-6 ${focused? 'scale-110' : 'scale-100'}`} tintColor={color}/>
            <Text className={`text-xs ${focused ? 'font-latobold scale-110' : 'font-lato'}`} style={{color: color}}>{name}</Text>
        </View>
    )
}

export default function TabLayout() {
    const { isLoading, loggedIn } = useGlobalContext()
    console.log(isLoading, loggedIn)
    if (!isLoading && !loggedIn ) {
        router.replace('/(auth)/login')
    }
    return (
        <Tabs>
            <Tabs.Screen
                name= 'home'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#078c7f',
                    tabBarStyle: {
                        backgroundColor: '#ebf5f4',
                        borderTopColor: 'transparent',
                        elevation: 0,   // doesn't work in android
                        shadowOpacity: 0.5,
                        borderTopWidth: 2,
                        height: 60
                    },
                    
                    tabBarIcon: ({ focused, color }) => 
                        <TabIcon 
                        focused={focused}
                        icon={house}
                        color={color}
                        name="Home" />
                }} />

            <Tabs.Screen
                name='bookmark'
                options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#078c7f',
                    tabBarStyle: {
                        backgroundColor: '#ebf5f4',
                        borderTopColor: 'transparent',
                        elevation: 0,   // doesn't work in android
                        shadowOpacity: 0.5,
                        borderTopWidth: 2,
                        height: 60
                    },
                    tabBarIcon: ({ focused, color }) => 
                        <TabIcon 
                        focused={focused}
                        icon={bookmark}
                        color={color}
                        name="Bookmark" />
                }} />

            <Tabs.Screen
                name='create'
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#078c7f',
                    tabBarStyle: {
                        backgroundColor: '#ebf5f4',
                        borderTopColor: 'transparent',
                        elevation: 0,   // doesn't work in android
                        shadowOpacity: 0.5,
                        borderTopWidth: 2,
                        height: 60
                    },
                    tabBarIcon: ({ focused, color }) => 
                        <TabIcon 
                        focused={focused}
                        icon={create}
                        color={color}
                        name="Create" />
                }} />

            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#078c7f',
                    tabBarStyle: {
                        backgroundColor: '#ebf5f4',
                        borderTopColor: 'transparent',
                        elevation: 0,   // doesn't work in android
                        shadowOpacity: 0.5,
                        borderTopWidth: 2,
                        height: 60
                    },
                    tabBarIcon: ({ focused, color }) => 
                        <TabIcon 
                        focused={focused}
                        icon={profile}
                        color={color}
                        name="Profile" />
                }} />
        </Tabs>
    )
}