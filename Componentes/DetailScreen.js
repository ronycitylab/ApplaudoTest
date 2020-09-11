import * as React from 'react';

import { StyleSheet, Text, View, ScrollView, Dimensions, Button,
            TouchableOpacity, ActivityIndicator, Alert, Linking, WebView,
            FlatList, Image, Picker, RefreshControl, AsyncStorage, StatusBar } from 'react-native';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default class DetailScreen extends React.Component {

  constructor(props){

    super(props);
    this.state = {



    };

  }

  componentDidMount(){

    // console.log( this.props.route.params.post );
    this.setVars();

  }

  setVars = () => {

    let attributes = this.props.route.params.post.attributes;
    let imagesItem = attributes.posterImage;
    let imageCover = imagesItem.large;
    let titles = attributes.titles;
    let canonicalTitle = attributes.canonicalTitle;
    let Type = attributes.subtype;
    let numberEpisodes = attributes.episodeCount;
    let startDate = attributes.startDate;
    let endDate = attributes.endDate;
    let Genres = attributes.ageRatingGuide;
    let AverageRating = attributes.averageRating;
    let AgeRating = attributes.ageRating;
    let EpisodeDuration = attributes.episodeLength;
    let AiringStatus = attributes.status;
    let synopsis = attributes.synopsis;
    let youtubeID = attributes.youtubeVideoId;

    this.setState({ 
                    imagenAnime: imageCover,
                    mainTitle: titles.en_jp,
                    canonicalTitle: canonicalTitle,
                    Type: Type,
                    numberEpisodes: numberEpisodes,
                    startDate: startDate,
                    endDate: endDate,
                    Genres: Genres,
                    AverageRating: AverageRating,
                    AgeRating: AgeRating,
                    EpisodeDuration: EpisodeDuration,
                    AiringStatus: AiringStatus,
                    synopsis: synopsis,
                    uriTrailer: 'https://www.youtube.com/watch?v=' + youtubeID,
                  }, () => { });


  }

  _redirectLink = async () => {

    const supported = await Linking.canOpenURL(this.state.uriTrailer);
    if (supported) {
      
      await Linking.openURL(this.state.uriTrailer);

    } else {

      Alert.alert(`No se puede dirigir a: ${this.state.uriTrailer}`);

    }

  }



  render(){

    return(

            <View style={ styles.container }>

              <ScrollView
                  style={ styles.scrollStyles }
                  contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 5 }}
                >
              
                  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', height: screenHeight/2.4,
                                  alignItems: 'center', alignContent: 'center', paddingHorizontal: 20, }}>

                    <TouchableOpacity style={{ width: '50%', height: '100%' }}
                                      onPress={ () => { this._redirectLink(); }}>
                      <Image  style={{ width: '100%', height: '100%',
                                       borderRadius: 3, }} 
                              source={{ uri: this.state.imagenAnime }} />
                    </TouchableOpacity>
                    <View style={{ width: '50%', height: '100%', paddingHorizontal: 10 }}>
                      <Text style={ styles.labelField }>Main Title</Text>
                      <Text>{ this.state.mainTitle }</Text>
                      <View style={{ height: 1, width: '100%', marginTop: 10 }}></View>
                      <Text style={ styles.labelField }>Canonical Title</Text>
                      <Text>{ this.state.canonicalTitle }</Text>
                      <View style={{ height: 1, width: '100%', marginTop: 10 }}></View>
                      <Text style={ styles.labelField }>Type</Text>
                      <Text>{ this.state.Type }, { this.state.numberEpisodes }</Text>
                      <View style={{ height: 1, width: '100%', marginTop: 10 }}></View>
                      <Text style={ styles.labelField }>Year</Text>
                      <Text>{ this.state.startDate } till { this.state.endDate }</Text>
                    </View>

                  </View>

                  <View style={{ width: '100%', justifyContent: 'center', paddingVertical: 15,
                                  alignItems: 'flex-start', alignContent: 'center', paddingHorizontal: 20, }}>

                    <Text style={ styles.labelField }>Genres</Text>
                    <Text>{ this.state.Genres }</Text>

                    <View style={{ height: 1, width: '100%', marginTop: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center',
                                  alignItems: 'center', alignContent: 'center', }}>

                      <View style={{ width: '50%' }}>
                        <Text style={ styles.labelField }>Average Rating</Text>
                        <Text>{ this.state.AverageRating }</Text>
                      </View>
                      <View style={{ width: '50%' }}>
                        <Text style={ styles.labelField }>Age Rating</Text>
                        <Text>{ this.state.AgeRating }</Text>
                      </View>

                    </View>

                    <View style={{ height: 1, width: '100%', marginTop: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center',
                                  alignItems: 'center', alignContent: 'center', }}>

                      <View style={{ width: '50%' }}>
                        <Text style={ styles.labelField }>Episode Duration</Text>
                        <Text>{ this.state.EpisodeDuration }</Text>
                      </View>
                      <View style={{ width: '50%' }}>
                        <Text style={ styles.labelField }>Airing Status</Text>
                        <Text>{ this.state.AiringStatus }</Text>
                      </View>

                    </View>

                  </View>

                  <View style={{ width: '100%', justifyContent: 'center', paddingVertical: 15,
                                  alignItems: 'flex-start', alignContent: 'center', paddingHorizontal: 20, }}>

                    <Text style={ styles.labelField }>Synopsis</Text>
                    <Text>{ this.state.synopsis }</Text>

                  </View>

                  <TouchableOpacity 
                      style={{ width: '60%', height: 40, borderRadius: 4,
                                backgroundColor: '#C0392B', justifyContent: 'center', 
                                alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                marginTop: 20, marginBottom: 30 }}
                      onPress={ () => { this._redirectLink(); }}>

                      <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19 }}> Trailer in youtube </Text>

                  </TouchableOpacity>

              </ScrollView>
            
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

    labelField: {
      fontSize: 18,
      fontWeight: '800',

    },

    scrollStyles: {

    }

});