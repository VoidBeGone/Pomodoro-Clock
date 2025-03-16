

import React from 'react';
import type {JSX, PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useState, useEffect } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';

function App() : JSX.Element{
  const isDarkMode = useColorScheme() === 'dark';
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [timeInitial, setTimeInitial] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timePopUp, setTimePopUp] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");

  const formatTime = (time: number) => {
    setHours(String(Math.floor(time / 3600)).padStart(2, "0"));
    setMinutes(String(Math.floor((time % 3600) / 60)).padStart(2, "0"));
    setSeconds(String(time % 60).padStart(2, "0"));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      clearInterval(timer)};
  }, [isRunning, timeLeft]);

  useEffect(() => {
    formatTime(timeLeft);
  }, [timeLeft]);
  const setTime = () =>{
    setIsRunning(false);
    setTimePopUp(true);
  }

  const changeTime = () =>{
    const time = (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + (parseInt(seconds))
    setTimeLeft(time)
    formatTime(timeLeft)
    setTimeInitial(time)
    setTimePopUp(false)
  }


  return(
    <View style = {styles.container}>
      <View style = {styles.column1}>
          <Text style = {styles.column1Text}>Pomodoro</Text>
      </View>
      <View style = {styles.column2}>
        <View style = {styles.column2Top}>
          <Text style = {styles.column2Text}>Time Remaining</Text>
          <Text style = {styles.column2Timer}>{hours}:{minutes}:{seconds}</Text>
        </View>

        <ProgressBar progress={(timeInitial - timeLeft)/timeInitial} color="grey" style = {{width: 320, height:50, borderRadius: 50, }}/>
        <View style = {styles.column2Bottom}>
          <TouchableOpacity style={styles.startStop} onPress={()=> setIsRunning(!isRunning)}>
              <Text style ={{fontSize : 30}}>{isRunning ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startStop} onPress = {() => setTime()}>
              <Text style ={{fontSize : 30}}>Set Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.column3}>
        <Text style = {styles.column3Text}>YOU GOT THIS KEEP GOING</Text>
      </View>
      
      {timePopUp && <View style = {{zIndex: 2, position:"absolute", justifyContent:"center", alignItems:"center", width:"100%", height:"100%"}}>
          <View style = {{width:"100%", height: 500, backgroundColor:"white", borderRadius: 50, alignItems:"center"}}>
            <Text style = {{margin:20, fontSize: 30}}>Set Time</Text>
            <Text style={{textAlign:"center"}}>Hours</Text>
            <TextInput value={hours} onChangeText={setHours} keyboardType="numeric" style={{ marginBottom:10, fontSize: 20, width: '80%', textAlign: 'center' }}/>
            <Text style={{textAlign:"center"}}>Minutes</Text>
            <TextInput value={minutes} onChangeText={setMinutes} keyboardType="numeric" style={{ marginBottom:10, fontSize: 20, width: '80%', textAlign: 'center' }}/>
            <Text style={{textAlign:"center"}}>Seconds</Text>
            <TextInput value={seconds} onChangeText={setSeconds} keyboardType="numeric" style={{ marginBottom:10, fontSize: 20, width: '80%', textAlign: 'center' }}/>
            <TouchableOpacity style = {{backgroundColor:"black", marginTop:150, padding: 20, borderRadius: 20}} onPress = {() => changeTime()}>
              <Text style={{color:"white", fontSize:20}}>Set Time</Text>
            </TouchableOpacity>
          </View>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    flex:1,
    alignItems: 'center',
    padding:20,
    paddingTop:50,
    width: '100%',
    backgroundColor:'black'
  },
  column1:{
    flex: 1, backgroundColor:"none", width: '100%', alignItems:'center',justifyContent:'center', zIndex: 1
  },
  column1Text:{
    fontSize:80, color: "lightblue"
  },
  column2:{
    flex: 3, backgroundColor:"none", width: '100%', alignItems:"center", zIndex: 1
  },
  column2Top:{
    flex:2, alignItems:"center"
  },
  column2Text:{
    flex: 1,fontSize:50, color: "white"
  },
  column2Timer:{
    flex: 1, fontSize:50, color: "white"
  },
  column2Bottom:{
    flex:2, width:"100%", justifyContent:"center", alignItems: "center"
  },
  progressBar:{
    backgroundColor: "blue", width: "100%", height: 50, borderRadius:50
  },
  startStop:{
    backgroundColor:"white", margin: 10, padding: 10, width: "50%",  justifyContent:"center", alignItems:"center", borderRadius: 50
  },
  column3:{
    flex: 1, backgroundColor:"none", width:'100%', justifyContent:'center', zIndex: 1
  },
  column3Text:{
    fontSize:20, alignSelf: 'center', color:"white"
  }
})

export default App;