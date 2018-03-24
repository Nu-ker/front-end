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
          <TextInput placeholder="Your age" keyboardType="phone-pad" style={styles.input}
          onChangeText={(age) => this.setState({
            ...this.state,
            age
          })}
          value={this.state.age}/>
        <TextInput placeholder="Your Weight (kg)" keyboardType="phone-pad" style={styles.input}
          onChangeText={(weight) => this.setState({
            ...this.state,
            weight
          })}
          value={this.state.weight}/>
        <TextInput placeholder="Your Height (cm)" keyboardType="phone-pad" style={styles.input}
          onChangeText={(height) => this.setState({
            ...this.state,
            height
          })}
          value={this.state.height}/>

          <Select
            onSelect = {this.onSelectGender.bind(this)}
            defaultText={this.state.value}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF", height: 80}}
          >
            <Option value={"Male"}>Male</Option>
            <Option value={"Female"}>Female</Option>
          </Select>

          <Select
            onSelect = {this.onSelectActivity.bind(this)}
            defaultText={this.state.valueActivity}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            backdropStyle = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF", height: 200}}
          >
            <Option value={"1.2"}>Sedentary</Option>
            <Option value={"1.375"}>Lightly</Option>
            <Option value={"1.55"}>Active</Option>
            <Option value={"1.725"}>Very Active</Option>
            <Option value={"1.9"}>Extreme</Option>
          </Select>

          <TextInput placeholder="Weight Target" keyboardType="default" style={styles.input}
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
    padding: 10
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
