import Expo from 'expo';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

export default class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={30} color={tintColor} />
  }
  render() {
    const { food } = this.props.navigation.state.params
    return (
      <View style={styles.container}>

        <View style={styles.food}>
          <ImageBackground style={{width: '100%', height: '100%'}} source={{uri : food[1].photoUrl}}>
          </ImageBackground>
        </View>

        <View style={styles.detail}>
          <View style={{backgroundColor: 'white', margin: 5, width: '97%', height: '100%', alignSelf: 'center'}}>
            <Text style={styles.details}>Details</Text>

              <View style={styles.profileDetail}>
                <ScrollView>
                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Food Name :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].name}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Calorie :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].calories}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Total Fat :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].total_fat}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Saturated Fat :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].saturated_fat}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Cholestrol :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].cholesterol}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Total Carbohydrate :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].total_carbohydrate}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Sugars :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].sugars}
                  </Text>
                </View>

                <View style={styles.bio}>
                  <Text style={styles.desc}>
                    Protein :
                  </Text>
                  <Text style={styles.desc}>
                    {food[1].protein}
                  </Text>
                </View>

                <TouchableOpacity style={styles.delete}>
                  <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Delete</Text>
                </TouchableOpacity>
              </ScrollView>
              </View>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  food: {
    flex: 1,
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: 'white'
  },
  detail: {
    flex: 1,
    width: '100%'
  },
  details: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    margin: 5,
    fontSize: 20
  },
  profileDetail: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  bio: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxHeight: 50,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  desc: {
    marginLeft: 1,
    fontSize: 18
  },
  delete: {
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    width: '90%',
    marginBottom: 10
  }
})
