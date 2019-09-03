/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import { Icon, Item, Input } from 'native-base';
import styles from '../styles';

// type Props = {};
// type State = {
//     showInput: boolean,
//     addressQuery: string,
//     predictions: Array<any>
// }
export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            addressQuery: '',
            predictions: []
        };
    }

    onShowInputPress = () => {
        console.log('show input');
        this.setState({ showInput: true });
    }


    onOpenAutocompletePress = () => {
        RNGooglePlaces.openAutocompleteModal({
            initialQuery: 'vestar',
            locationRestriction: {
                latitudeSW: 6.3670553,
                longitudeSW: 2.7062895,
                latitudeNE: 6.6967964,
                longitudeNE: 4.351055
            }
        }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport', 'addressComponents'])
            .then((place) => {
                console.log(place);
            })
            .catch(error => console.log(error.message));
    }

    onQueryChange = (text) => {
        this.setState({ addressQuery: text });
        RNGooglePlaces.getAutocompletePredictions(this.state.addressQuery, {
            country: 'NG'
        })
            .then((places) => {
                console.log(places);
                this.setState({ predictions: places });
            })
            .catch(error => console.log(error.message));
    }

    onSelectSuggestion(placeID) {
        console.log(placeID);
        // getPlaceByID call here
        RNGooglePlaces.lookUpPlaceByID(placeID)
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));

        this.setState({
            showInput: false,
            predictions: []
        });
    }

    onGetCurrentPlacePress = () => {
        RNGooglePlaces.getCurrentPlace()
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));
    }

    onGetPlaceByIDPress = () => {
        RNGooglePlaces.lookUpPlaceByID('ChIJhRTXUeeROxARmk_Rp3PtIvI')
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));
    }

    keyExtractor = item => item.placeID;

    renderItem = ({ item }) => {
        return (
            <View style={styles.listItemWrapper}>
                <TouchableOpacity style={styles.listItem}
                    onPress={() => this.onSelectSuggestion(item.placeID)}>
                    <View style={styles.avatar}>
                        {/* <Image style={styles.listIcon} source={require('./assets/icon-home.png')} /> */}
                    </View>
                    <View style={styles.placeMeta}>
                        <Text style={styles.primaryText}>{item.primaryText}</Text>
                        <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flexGrow: 1 }}>
                {this.state.showInput && <View>
                    <View style={styles.inputWrapper}>
                        <Item style={[{ backgroundColor: "white" }, styles.cardShadow]} regular>
                            <Input
                                ref={input => this.pickUpInput = input}
                                style={styles.input}
                                onChangeText={this.onQueryChange}
                                placeholder={'Current Location'}
                                placeholderTextColor='#9BABB4'
                                autoFocus
                            />
                            <TouchableOpacity>
                                <Icon style={{ color: "#bbb", fontSize: 40 }} type='Ionicons' name='ios-close' />
                            </TouchableOpacity>
                        </Item>
                    </View>

                    <View style={styles.list}>
                        <FlatList
                            data={this.state.predictions}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>
                </View>}

                {!this.state.showInput && <View>
                    <TouchableOpacity style={styles.inputLauncher} onPress={this.onShowInputPress}>
                        <Text style={{ color: '#70818A' }}>Where to?</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         padding: 12,
//         paddingTop: 45
//     },

// });