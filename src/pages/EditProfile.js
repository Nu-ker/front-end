import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Picker, TouchableHighlight, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import axios from 'axios'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state={
      weight:props.navigation.state.params.user.weight,
      height:props.navigation.state.params.user.height,
      age:props.navigation.state.params.user.age,
      sex:props.navigation.state.params.user.sex,
      activity:props.navigation.state.params.user.activity,
    }
  }

  static navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="person" size={30} color={tintColor}/>
  }
  handleSubmit= async ()=>{
    let self = this
    AsyncStorage.getItem('uid',(err,result)=>{
      if(result){
        axios.put('https://us-central1-nu-ker-fox.cloudfunctions.net/User',{
        photoUrl:self.props.navigation.state.params.user.photoUrl,
        email:self.props.navigation.state.params.user.email,
        name: self.props.navigation.state.params.user.name,
        weight: self.state.weight,
        height: self.state.height,
        age: self.state.age,
        sex: self.state.sex,
        activity: self.state.activity,
      },{
        headers:{
          uid:result
        }
      })
      .then(()=>{
        this.props.navigation.goBack()
      })
      .catch(err=>{
        console.log(err);
      })
      }
  })
  }
  render () {
    return (
      <ScrollView style={styles.wrap}>
          <TextInput placeholder="Your age" keyboardType="default" style={styles.input}
          onChangeText={(age) => this.setState({
            ...this.state,
            age
          })}
          value={this.state.age}/>
          <TextInput placeholder="Your Weight (kg)" keyboardType="default" style={styles.input}
          onChangeText={(weight) => this.setState({
            ...this.state,
            weight
          })}
          value={this.state.weight}/>
          <TextInput placeholder="Your Height (cm)" keyboardType="default" style={styles.input}
          onChangeText={(height) => this.setState({
            ...this.state,
            height
          })}
          value={this.state.height}/>
          <Picker
            style={{width: '90%', alignSelf:'center'}}
            selectedValue={this.state.sex}
            onValueChange={(itemValue, itemIndex) => this.setState({
              ...this.state,
              sex:itemValue})}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <Picker
            style={{width: '90%', alignSelf:'center'}}
            selectedValue={this.state.activity}
            onValueChange={(itemValue, itemIndex) => this.setState({
              ...this.state,
              activity:itemValue
            })}>
            <Picker.Item label="Sedentary" value="1.2" />
            <Picker.Item label="Lightly Active" value="1.375" />
            <Picker.Item label="Active" value="1.55" />
            <Picker.Item label="Very Active" value=" 1.725" />
            <Picker.Item label="Extreme" value="1.9" />
          </Picker>

          <TouchableHighlight onPress={() => this.handleSubmit()} style={styles.next}>
            <Text style={styles.text}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'azure'
  },
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    width: '90%',
    height: 40,
    margin: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  next: {
    backgroundColor: 'lightblue',
    width: '90%',
    height: 35,
    marginTop: 10,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 5,
    textAlign: 'center'
  }
})
