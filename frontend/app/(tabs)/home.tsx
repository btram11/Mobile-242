// @ts-nocheck

import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Trending from '@/components/Trending'
import Header from '@/components/Header'
import EmptyState from '@/components/EmptyState'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { Ionicons } from "@expo/vector-icons";

import SubjectCard from '@/components/SubjectCard'
import BookCard from '@/components/BookCard'
import NewsCard from '@/components/NewsCard'
import ProviderCard from '@/components/ProviderCard'

import '../../global.css'

// import mockedBooks from '../../../backend/prisma/data/database_books.json'
const mockedBooks = [
	{ id: 1, title: "The Great Gatsby", img_src: require('@/assets/images/book1.jpg'), leased_price: null, sold_price: 20, is_leased: false, is_sold: true, is_from: false },
	{ id: 2, title: "If on a Winter's Night a Traveler", img_src: require('@/assets/images/book2.jpg'), leased_price: 15, sold_price: 20, is_leased: true, is_sold: true, is_from: true },
	{ id: 3, title: "The Catcher in the Rye", img_src: require('@/assets/images/book3.jpg'), leased_price: 25, sold_price: 30, is_leased: true, is_sold: false, is_from: true },
]

const mockedNews = [
	{ title: "New Payment Method available", img_src: require('@/assets/images/news1.jpg'), summary: "Faster payment with your Electronic Wallet!" },
	{ title: "New Major available", img_src: require('@/assets/images/news2.jpg'), summary: "Textbooks available for new majors!" },
	{ title: "Best Provider of the month", img_src: require('@/assets/images/news3.jpg'), summary: "Here is the best provider of the month, according to our customers." }]

const mockedProviders = [{
		"name": "John Doe",
		"img_src": require('@/assets/images/avatar1.jpg'),
		"description": "This is the provider's description",
		"rating": 5
	},{
		"name": "Jane Doe",
		"img_src": require('@/assets/images/avatar2.jpg'),
		"description": "This is the provider's description",
		"rating": 4.5
	},{
		"name": "Jack Doe",
		"img_src": require('@/assets/images/avatar3.jpg'),
		"description": "This is the provider's description",
		"rating": 4
	}
]

export default function HomePage() {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(
		() => {
			setIsLoading(true)
			getAllPosts()
				.then((data) => {
					console.log(data)
					setData(data)
				})
				.catch(
					(error) => {
						console.log(error)
						throw Error("Error catched in HomePage(): ", error)
					}
				)
				.finally(
					setIsLoading(false)
				)
		}, []
	)

	const [isRefreshing, setIsRefreshing] = useState(false)

	const onRefresh = async () => {
		setIsRefreshing(true)
		const newData = await fetchData()
		setData(newData)
		setIsRefreshing(false)
	}

	return (
		<ScrollView className="bg-secondarydark flex-1 px-2 py-4">
			<View className="flex-row items-center bg-secondarylight py-2 px-4 rounded-3xl">
				<Ionicons name="search-outline" size={20} color='gray' />
				<TextInput placeholder="Search" placeholderTextColor="gray" className="text-white flex-1 ml-2" />
			</View>

			<View className="block relative h-72 w-full">
				<Image source={require('@/assets/images/globe-books.png')} className="absolute w-72 h-72 -bottom-8 right-0 z-10" resizeMode='contain' />
			</View>

			<View className='bg-white rounded-3xl p-4'>
				<View className='mb-8'>
					<Text className="text-primary text-2xl font-latobold">New books available</Text>
					<Text className="text-gray-400 text-sm">Expand your knowledge right now</Text>

					<View className="flex-row mt-2 space-x-3">
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{mockedBooks.map((book, idx) => (
								<BookCard key={book.id} id={book.id} img_src={book.img_src} title={book.title} sold_price={book.sold_price} is_sold={book.is_sold} is_leased={book.leased_price} leased_price={book.leased_price} is_from={book.is_from} color={idx%2==0?'gray':'green'} />
							))}
						</ScrollView>
					</View>
				</View>

				<View className='mb-8'>
					<Text className="text-primary text-2xl font-latobold">News & Updates</Text>
					<Text className="text-gray-400 text-sm">Stuffs you should know</Text>

					<View className="flex-row mt-2 space-x-3">
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{mockedNews.map((news, idx) => (
								<NewsCard key={news.title} title={news.title} img_src={news.img_src} summary={news.summary} color={idx%2==0?'orange':'gray'} />
							))}
						</ScrollView>
					</View>
				</View>

				<View className='mb-8'>
					<Text className="text-primary text-2xl font-latobold">Providers near you</Text>
					<Text className="text-gray-400 text-sm">Discover providers recommended for you</Text>

					<View className="flex-row mt-2 space-x-3">
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							{mockedProviders.map((provider, idx) => (
								<ProviderCard key={provider.name} name={provider.name} img_src={provider.img_src} description={provider.description} rating={provider.rating} color={idx%2==0?'gray':'blue'} />
							))}
						</ScrollView>
					</View>
				</View>

				<View>
					<Text className="text-primary text-2xl font-latobold">Majors</Text>
					<Text className="text-gray-400 text-sm">Recommendations for you</Text>

					<View className="flex-row mt-2 space-x-3">
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						>
							<SubjectCard subject="Computer Science" color="purple" />
							<SubjectCard subject="Chemistry" color="blue" />
							<SubjectCard subject="Electrical Engineering" color="orange" />
						</ScrollView>
					</View>
				</View>
			</View>

			<View style={styles.aboutUs}>
				<Text className='text-white font-latobold text-lg'>About us</Text>
				{/* <Text className='text-gray-200 text-center font-lato text-sm' style={{color: '#e5e7eb'}}>We are a team of developers who are passionate about education and technology. We aim to provide a platform for students to access used books easily and effectively.</Text> */}
				<Text className='text-gray-400 font-lato text-sm' style={{color: '#9ca3af'}}>Group name: meomeo</Text>
			</View>

			<View style={{height: 20}}>
			</View>

		</ScrollView>
	);
}

const styles = StyleSheet.create({
	aboutUs: {
		flex: 1,
		backgroundColor: '#024435',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
		marginHorizontal: 4,
		marginVertical: 8,
		borderRadius: 8,

	},
});