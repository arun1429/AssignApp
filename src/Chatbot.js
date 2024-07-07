import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,StyleSheet,ActivityIndicator
} from "react-native";
import Voice from 'react-native-voice';
import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Chatbot() {
  const [textValue, setText] = useState("");
  const [dataList, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
      const speechStartHandler = e => {
        console.log('speechStart successful', e);
      };
      const speechEndHandler = e => {
        setLoading(false);
        console.log('stop handler', e);
      };
      const speechResultsHandler = e => {
        const text = e.value[0];
        getFoodRecipeFromApi(text);
        stopRecording();
      };
      const startRecording = async () => {
        setLoading(true);
        try {
          await Voice.start('en-Us');
        } catch (error) {
          console.log('error', error);
        }
      };
      const stopRecording = async () => {
        try {
          await Voice.stop();
          setLoading(false);
        } catch (error) {
          console.log('error', error);
        }
      };
      
      useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        };
      }, []);
      const saveRecipeToLcoal = async () => {
        //textValue
        try {
          await AsyncStorage.setItem('saveRecipe', textValue.toString());
        } catch (e) {
          // saving error
        }
      }

  const getFoodRecipeFromApi = (foodName) => {
    setText(foodName)
    if(foodName.length >2){
     fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+foodName)
      .then(response => response.json())
      .then(data => {
        setData(data.meals)
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  return (
    <View style ={styles.container}>
      <View style={styles.topItem}>
         
      <View style={styles.editorInput} >
        <TextInput
          style={styles.textInput}
          onChangeText={getFoodRecipeFromApi}
          value={textValue}
          placeholder="Search any food recipe"
          keyboardType="text"
        ></TextInput>
        <View style={styles.viewIcons}>
              {isLoading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <TouchableOpacity onPress={startRecording} style={styles.speak}>
                   <MaterialCommunityIcons
              name={'microphone'}
              size={20}
              color={"white"}
            />
                </TouchableOpacity>
              )}
            </View>
            </View>
            <View style={styles.boxItem}>
            <TouchableOpacity
              style={styles.butttonView}
              onPress={() => {
                saveRecipeToLcoal();
              }}
            >
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
            </View>
            </View>
    <FlatList
        data={dataList}
        renderItem={({ item, index }) => (
          <View style={styles.viewSell}>
            <Text style={styles.textView}>Meal : {item.strMeal}</Text>
            <Text style={styles.textView}>Category : {item.strCategory}</Text>
            <Text style={styles.textView}>Ingredient1 : {item.strIngredient1}</Text>
            <Text style={styles.textView}>Ingredient2 : {item.strIngredient2}</Text>
            <Text style={styles.textView}>Ingredient3 : {item.strIngredient3}</Text>
            <Text style={styles.textView}>Ingredient4 : {item.strIngredient4}</Text>
            <Text style={styles.textView}>Ingredient5 : {item.strIngredient5}</Text>
            <Text style={styles.textView}>Area : {item.strArea}</Text>
            <Text style={styles.textView}>Instructions : {item.strInstructions}</Text>
          </View>
        )}
      ></FlatList>
    
    </View>
  );
}

export default Chatbot;


const styles = StyleSheet.create({
  container:{flex : 1,justifyContent : 'center',alignItems : 'center'},
  topItem: {
    height: 50,
    flexDirection:'row',
    width :"100%",
    margin:10,
    alignSelf :'center',
  },
  boxItem:{ height: 50,
    width :"30%",
   },
  editorInput: {
    height: 50,
    flexDirection:'row',
    width :"70%",
    alignSelf :'center',
    marginLeft: 12,
    borderRadius :10,
    borderWidth: 1,
  },
  textInput: {
    height: 50,
    width :"80%",
    padding: 10,
  },
  viewIcons:{ height: 50,
    width :"20%",
    justifyContent : 'center',alignItems : 'center'
   },
   butttonView :{
    backgroundColor: "black",
    height: 40,
    width: 70,
    borderRadius :10,
    marginTop :5,
    alignSelf : 'center',
    justifyContent: "center",
    alignItems : 'center',
  },
  textButton : { color: "white" },
  viewSell : {flexDirection: "column", margin: 10},
  textView : { color: "black" ,margin :2},
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width:35,
    height:35,
    borderRadius: 70,
  },
  
});
