//@ts-nocheck

export const AppwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ticklab.learn-react-native',
    project: '678e3c000013e931868b',
    databaseId: '678e44c6000b3372a666',
    userCollectionId: '678e44cd001ab37a9102',
    videoCollectionId: '678e44d2000ea87b241e',
    storageId: '678e47ac001cebaf5fb1'
}

import { Client, Account, ID, Avatars, Databases, Models, Query } from 'react-native-appwrite';
import React, { useState } from 'react';

let client: Client;
let account: Account;
let avatars: Avatars;
let databases: Databases;


client = new Client();
client
    .setEndpoint(AppwriteConfig.endpoint)
    .setProject(AppwriteConfig.project)   // Your Project ID
    .setPlatform(AppwriteConfig.platform);   // Your package name / bundle identifier

account = new Account(client);
avatars = new Avatars(client);
databases = new Databases(client);

// const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [name, setName] = useState('');

async function login(email: string, password: string) {
    console.log(email, password);
    try {
        const loggedInUser = await account.createEmailPasswordSession(email, password)
        console.log('Logged in user:', loggedInUser);
        return loggedInUser;
    }
    catch (error) {
        console.error('Error logging in:', error);
    }
    // setLoggedInUser(await account.get());
}

async function register(email: string, password: string, username: string) {
    // account.create(ID.unique(), email, password, name);
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error('Fail to create new account');
        console.log('Account created successfully:', newAccount);

        avatarUrl = avatars.getInitials(username);
        console.log('Generated avatar URL:', avatarUrl);

        await databases.createDocument(
            AppwriteConfig.databaseId,
            AppwriteConfig.userCollectionId,
            ID.unique(),
            {
                username: username,
                email: email,
                avatar: avatarUrl,
                userId: newAccount.$id
            }
        );

        console.log('User document created successfully:', newUser);

    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}

async function getAccount() {
    try {
        const currentAccount = await account.get()
        return currentAccount
    }
    catch (error) {
        console.error("Error getting account :", error)
        throw Error("Cannot get account")
    }
}

async function getCurrentUser() {
    try {
        const currentUser = await getAccount()
        const currentUserInfo = await databases.listDocuments(
            AppwriteConfig.databaseId,
            AppwriteConfig.userCollectionId,
            [Query.equal("userId", currentUser.$id)]
        )

        if (!currentUserInfo) {
            console.log("Cannot get user from database")
            return null;
        }
        // get the first user in list of returned users
        else {
            console.log("In getCurrentUser: ", currentUser, currentUserInfo)
            return currentUserInfo.documents    // this is important
        }
    }
    catch (error) {
        console.log("Error getting current user in getCurrentUser: ", error)
        throw Error('Cannot get current user.')
    }
}

async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            AppwriteConfig.databaseId,
            AppwriteConfig.videoCollectionId
        )

        return posts.documents
    }
    catch (error) {
        console.log(error)
        throw Error("Cannot fetch videos, error from getAllPosts(): ", error)
    }
}

export { login, register, getCurrentUser, getAllPosts };
