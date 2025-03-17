pipeline{
    agent label: 'physical'

    environment{
        GOOGLE_DRIVE_FOLDER_ID = '1NSr37wYq8B245NRWQLNbv6vi7rPS0SY1'
    }
    
    stages{
        stage('Checkout'){
            steps{
                checkout scm
            }
        }
        stage('Build'){
            dir('frontend'){
                steps{
                    sh 'eas build -p android --profile preview --local --output=build-test.apk'
                }
            }
        }
        stage('Push to Google Drive'){
            steps{
                script{
                    sh 'gdrive files upload --parent $GOOGLE_DRIVE_FOLDER_ID frontend/build-test.apk'
                }
            }
        }
    }
}