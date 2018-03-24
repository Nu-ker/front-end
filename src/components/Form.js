import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Picker
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {Select, Option} from "react-native-chooser";

export default class Home extends React.Component {
  constructor() {
    super()
    this.state={
      weight:'',
      height:'',
      age:'',
      sex:'',
      activity:'',
      weightTarget:'',
      value: "Select Gender",
      valueActivity: 'Activity'
    }
  }
  componentWillMount(){
    // console.log(this.props.navigation.state.params.dataLogin);
  }
  handleSubmit= async ()=>{
    console.log(this.state);
    let user = await axios.post('https://us-central1-nu-ker-fox.cloudfunctions.net/User',{
      photoUrl:this.props.navigation.state.params.dataLogin.photoUrl,
      email:this.props.navigation.state.params.dataLogin.email,
      name: this.props.navigation.state.params.dataLogin.name,
      weight: this.state.weight,
      height: this.state.height,
      age: this.state.age,
      sex: this.state.sex,
      activity: this.state.activity,
    },{
      headers:{
        uid:this.props.navigation.state.params.dataLogin.id
      }
    })
    if(user.data.msg === "SUCCESS POST"){
      AsyncStorage.setItem('uid', this.props.navigation.state.params.dataLogin.id)
      this.props.navigation.navigate('DashBoard')
    }
  }

  onSelectGender(value, label) {
    this.setState({
      ...this.state,
      value: value,
      sex : value
    });
  }

  onSelectActivity(value, label) {
    this.setState({
      ...this.state,
      activity: value,
      valueActivity: label
    })
  }

  render () {
    return (
      <ImageBackground style={styles.back} source={require('../assets/tes.jpg')}>
        <Text style={styles.judul}>Please Fill The Form</Text>
        <ScrollView style={styles.wrap}>
          <TextInput placeholderTextColor="#d8e7ff" placeholder="Your age" keyboardType="phone-pad" style={styles.input}
          onChangeText={(age) => this.setState({
            ...this.state,
            age
          })}
          value={this.state.age}/>
        <TextInput placeholderTextColor="#d8e7ff" placeholder="Your Weight (kg)" keyboardType="phone-pad" style={styles.input}
          onChangeText={(weight) => this.setState({
            ...this.state,
            weight
          })}
          value={this.state.weight}/>
        <TextInput placeholderTextColor="#d8e7ff" placeholder="Your Height (cm)" keyboardType="phone-pad" style={styles.input}
          onChangeText={(height) => this.setState({
            ...this.state,
            height
          })}
          value={this.state.height}/>

          <Select
            onSelect = {this.onSelectGender.bind(this)}
            defaultText={this.state.value}
            textStyle={{color: 'white'}}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            transparent={true}
            indicator="down"
            indicatorColor="white"
            optionListStyle = {{backgroundColor : "rgba(0, 0, 0, 0.8)", height: 80}}
          >
            <Option styleText={{color: 'white'}} value={"Male"}>Male</Option>
            <Option styleText={{color: 'white'}} value={"Female"}>Female</Option>
          </Select>

          <Select
            onSelect = {this.onSelectActivity.bind(this)}
            defaultText={this.state.valueActivity}
            textStyle={{color: 'white'}}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            transparent={true}
            indicator="down"
            indicatorColor="white"
            optionListStyle = {{backgroundColor : "rgba(0, 0, 0, 0.8)", height: 200}}
          >
            <Option styleText={{color: 'white'}} value={"1.2"}>Sedentary</Option>
            <Option styleText={{color: 'white'}} value={"1.375"}>Lightly</Option>
            <Option styleText={{color: 'white'}} value={"1.55"}>Active</Option>
            <Option styleText={{color: 'white'}} value={"1.725"}>Very Active</Option>
            <Option styleText={{color: 'white'}} value={"1.9"}>Extreme</Option>
          </Select>

          <TextInput placeholderTextColor="#d8e7ff" placeholder="Weight Target" keyboardType="phone-pad" style={styles.input}
          onChangeText={(weightTarget) => this.setState({
            ...this.state,
            weightTarget
          })}
          value={this.state.weightTarget}/>

          <TouchableHighlight onPress={() => this.handleSubmit()} style={styles.next}>
            <Text style={styles.text}>NEXT</Text>
          </TouchableHighlight>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    height: '100%'
  },
  input: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    margin: 8,
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  wrap: {
    width: '100%',
    height: '100%'
  },
  judul: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30
  },
  next: {
    backgroundColor: '#00c6a2',
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
