import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import { Button, Header } from '@rneui/base';
import alert from '../components/AlertComponent';
import { theme } from '../theme';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const LandingPage = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const navigateToInfo = async () => {
    const url = 'https://www.un.org/es/climatechange/paris-agreement';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const [loaded] = useFonts({
    BrunoAce: require('../../assets/fonts/BrunoAce-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          leftComponent={
            <View style={styles.headerLogAndAppName}>
              <Image source={require('../../assets/favicon.png')} style={styles.logo} />
              <Text style={styles.appName}>Coper</Text>
            </View>
          }
          rightComponent={
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              buttonStyle={styles.getStartedButton}
              titleStyle={styles.buttonText}
            />
          }
          containerStyle={styles.headerContainer}
        />
        <ImageBackground source={require('../../assets/images/landscape-1.png')} style={styles.backgroundImage}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.heading}>Welcome to Coper!</Text>
                <Text style={styles.description}>
                    Join our community dedicated to environmental care and sustainability.
                </Text>
            </View>
        </ImageBackground>
        <View style={styles.answerContainer}>
          <View style={styles.section}>
            <Text style={styles.subheading}>What is Carbon Footprint?</Text>
            <Text style={styles.description}>
              Carbon footprint is a measure of the greenhouse gases emitted by a person, company, or activity. It is important to
              measure and reduce our carbon footprint to mitigate climate change.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheading}>The Importance of Environmental Care</Text>
            <Text style={styles.description}>
              Our app allows you to track your carbon footprint and participate in sustainable activities. Together, we can make a
              difference and contribute to protecting our planet.
            </Text>
          </View>
        </View>
        <View style={styles.functionsContainer}>
          <View style={styles.section}>
            <Text style={styles.subheading}>App Features</Text>
            <Text style={styles.description}>
              - Calculate your carbon footprint and get recommendations to reduce it.
            </Text>
            <Text style={styles.description}>- View your emissions history and track your progress over time.</Text>
            <Text style={styles.description}>
              - Join groups and participate in activities related to the environment.
            </Text>
            <Text style={styles.description}>- Create your own groups and activities to promote sustainability.</Text>
          </View>
          <Image source={require('../../assets/other/nature.svg')} style={styles.environmentImage} />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>&copy; Coper</Text>
          <View style={styles.socialLinksContainer}>
            <Ionicons
                name='logo-github'
                size={30}
                color='white'
                onPress={() => Linking.openURL('https://github.com/MyNameIsClown')}
                style={{padding: 10}}
            />
            <Ionicons
                name='logo-linkedin'
                size={30}
                color='white'
                onPress={() => Linking.openURL('https://www.linkedin.com/in/victor-carrasco-artacho-299995174/')}
                style={{padding: 10}}
            />
            <Ionicons
                name='logo-google-playstore'
                size={30}
                color='white'
                onPress={() => Linking.openURL('https://play.google.com/store/apps/developer?id=Clown+Industries&hl=es_419&gl=US')}
                style={{padding: 10}}
            />
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
  },
  headerLogAndAppName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontFamily: 'BrunoAce',
    fontSize: 40,
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  getStartedButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  backgroundImage: {
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  answerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  functionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#1ABC9C',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  environmentImage: {
    width: 200,
    height: 200,
    marginLeft: 20,
  },
  footerContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  socialLinksContainer: {
    flexDirection: 'row',
  },
  socialLink: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LandingPage;
