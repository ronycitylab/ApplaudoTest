import * as React from 'react';

import { StyleSheet, Text, View, ScrollView, Dimensions, Button,
            TouchableOpacity, ActivityIndicator, Alert, Platform, TextInput,
            FlatList, Image, Picker, RefreshControl, AsyncStorage, StatusBar, } from 'react-native';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';

import globalVars from '../globalVars';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class HomeScreen extends React.Component {

  constructor(){

    super();
    this.state = {
      
      dataFull: [],
      data: [],

    };
  
  }

  componentDidMount(){

    // console.log( globalVars.url );
    this.getDataKitsuAPI();

  }

  getDataKitsuAPI = () => {

    var url = globalVars.url;

    fetch(url, {
      headers: {
        "Accept": "application/vnd.api+json",
        'Content-Type': 'application/vnd.api+json',
      },
      method: 'GET',
    }).then(response => response.json())
      .then(responseJson => {

        let arrayTemp = responseJson.data;
        let arrTmp = [];

        arrayTemp.map( (item, index) => {

          let attr = item.attributes;
          let titulos = attr.titles;
          // console.log( titulos.en_jp );
          let obj = {};
          obj.attributes = attr;
          obj.titulo = titulos.en_jp;

          arrTmp.push(obj);

        });
        
        this.setState({ data: arrTmp, dataFull: arrTmp }, () => {  });

      }).catch((error) => {
        console.log(error);
      });

  }

  filtro = (textSearch) => {

        const newData = this.state.dataFull.filter(function (item) {
            const itemData = item.titulo.toUpperCase();
            const textData = textSearch.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });

  };

  navigateToDetail = (item) => {

    this.props.navigation.navigate( 'Detail', { post: item } );

  }


  render(){

    let Items = null;

    if( this.state.data.length > 1 ){

      Items = this.state.data.map((item, index) => {

          let attributes = ( item.attributes != null && item.attributes != undefined ) ? item.attributes : 'ND';
          let imagesItem = ( attributes.coverImage != null && attributes.coverImage != undefined )  ? attributes.coverImage : 'ND';
          let imageCover = ( imagesItem.original != null && imagesItem.original != undefined ) ? imagesItem.original : ( ( imagesItem.large != null && imagesItem.large != undefined ) ? imagesItem.large : 'ND' );
          let titles = ( attributes.titles != null && attributes.titles != undefined ) ? attributes.titles : 'ND';
          // console.log( item.titulo );

          if( attributes != 'ND' && imagesItem != 'ND' && imageCover != 'ND' && titles != 'ND' ){

            // console.log( titles );
            return(
              
              <TouchableOpacity 
                style={ styles.viewItem }
                onPress={ () => { this.navigateToDetail(item); }}
                key={index}
                >
                <Image
                    style={ styles.imgItem }
                    source={{
                        uri: imageCover
                    }} />
                <Text style={{ marginHorizontal: 5, }}>{ titles.en ? titles.en : titles.en_jp }</Text>
              </TouchableOpacity>

            );

          }else{ return null; }

      });

    }else{

      Items = null;
    
    }

    if( this.state.data.length < 1 ){

      return(

            <View style={ styles.container }>
              
              <StatusBar backgroundColor={ globalVars.fondoPrincipal } barStyle="light-content" />
              <Text style={{ fontSize: 20, fontWeight: '400' }}>Applaudo Test</Text>
              <View style={{ width: '90%', height: 0.7, backgroundColor: '#000', marginTop: 5, marginBottom: 10 }}></View>

              <ActivityIndicator size="large" color="#000" />
            </View>
      );

    }

    return(

            <View style={ styles.container }>
              
              <StatusBar backgroundColor={ globalVars.fondoPrincipal } barStyle="light-content" />
              <Text style={{ fontSize: 20, fontWeight: '400' }}>Applaudo Test</Text>
              <View style={{ width: '90%', height: 0.7, backgroundColor: '#000', marginTop: 5, marginBottom: 10 }}></View>

              <View style={ styles.searchContainer }>
                <AntDesign name="search1" size={24} color="#000" style={{ paddingHorizontal: 5  }} />
                <TextInput
                                    style={ styles.searchInput }
                                    placeholder='buscar'
                                    placeholderTextColor="#000"
                                    onChangeText={ (text) => this.filtro(text) }
                                />
              </View>

              <View style={ styles.scrollContainer }>

                <Text style={{ marginLeft: '5%', fontSize: 17 }}>Anime</Text>
                <ScrollView
                  horizontal={true}
                  style={ styles.scrollStyles }
                  contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}
                  decelerationRate="fast"
                  pagingEnabled
                >
                   { Items }
                </ScrollView>

              </View>
            
            </View>

    );

  }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0, 68, 140, 1.0)',
        paddingTop: Platform.OS === 'ios' ? 50 : 25,
        backgroundColor: '#FFF'
    },

    searchContainer: {
      width: '100%',
      height: 50,
      paddingHorizontal: '5%',
      // borderColor: '#000',
      // borderWidth: 1,
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },

    searchInput: {
      borderWidth: '#000',
      borderWidth: 1,
      width: screenWidth - 70,
      paddingLeft: 20,
      borderRadius: 3
    },

    scrollContainer: {
      height: 225,
      width: '100%',
      paddingHorizontal: '5%',
      marginTop: 25
    },

    scrollStyles: {
      height: '100%',
    },

    viewItem: {
      width: screenWidth/2.46,
      height: '100%',
      marginLeft: 10,
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
          padding: 10,
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 1,
    },

    imgItem: {
      width: '100%',
      height: '70%',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2
    }

});
