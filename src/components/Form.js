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
  Picker 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state={
      weight:'',
      height:'',
      age:'',
      sex:'',
      activity:'',
      weightTarget:''
    }
  }
  componentWillMount(){
    console.log(this.props.navigation.state.params.dataLogin);
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
      this.props.navigation.navigate('DashBoard')
    }
  }
  render () {
    return (
      <ImageBackground style={styles.back} source={require('../assets/tes.jpg')}>
        <Text style={styles.judul}>Please Fill The Form</Text>
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

          <TextInput placeholder="Weight Target" keyboardType="default" style={styles.input}
          onChangeText={(weightTarget) => this.setState({
            ...this.state,
            weightTarget
          })}
          value={this.state.weightTarget}/>

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
    borderWidth: 1,
    width: '90%',
    height: 40,
    margin: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  wrap: {
    width: '100%',
    height: '100%',
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
