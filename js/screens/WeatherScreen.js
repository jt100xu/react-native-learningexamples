import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    DataSource,
    Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

const weatherDataUrl = "https://api.myjson.com/bins/xrhib";

export default class WeatherScreen extends React.Component {
    static navigationOptions = {
        title: 'Weather',
    };
    _ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
        }
    }

    componentDidMount() {
        this._getWeatherData()
    }

    _getWeatherData() {
        let _self = this;
        return fetch(weatherDataUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    weatherData: responseJson,
                })
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <Swiper style={styles.wrapper}
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{ backgroundColor: '#ccc', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#aaa', width: 6, height: 6, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: 100,
                    }} loop>
                    {this.state.weatherData.map((weather, key) => {
                        return <View key={key} style={styles.weatherSlide}>
                            <View style={styles.mainInfo}>
                                <Text>{weather.place}</Text>
                                <View style={styles.weatherTempGroup}>
                                    <Text>{Math.floor((weather.lowTemp + weather.highTemp) / 2)}&deg;C</Text>
                                    <Image style={styles.weatherIcon} source={{ uri: weather.icon }} />
                                </View>
                                <Text>{weather.status}</Text>
                            </View>
                            <View style={styles.tempInfo}>
                                <Text style={styles.tempInfoItem}>{weather.dry}</Text>
                                <View style={styles.tempInfoItemSep} />
                                <Text style={styles.tempInfoItem}>{weather.lowTemp}&deg;C - {weather.highTemp}&deg;C</Text>
                                <View style={styles.tempInfoItemSep} />
                                <Text style={styles.tempInfoItem}>{weather.wind}</Text>
                            </View>
                            <ListView style={styles.nextDaysListView} dataSource={this._ds.cloneWithRows(weather.nextDays)} renderRow={(nextDayItem) => {
                                return <View style={styles.nextDaysItem}>
                                    <Image style={styles.nextDaysItemIcon} source={{ uri: nextDayItem.icon }} />
                                    <Text style={styles.nextDaysItemStatus}>{nextDayItem.status}</Text>
                                    <Text style={styles.nextDaysItemStatus}>{nextDayItem.lowTemp}&deg;C - {nextDayItem.highTemp}&deg;C</Text>
                                </View>
                            }}></ListView>
                            <Text style={styles.weatherDescription}>{weather.description}</Text>
                        </View>
                    })}
                </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
    },
    weatherSlide: {
        flex: 1,
        backgroundColor: 'beige',
        flexDirection: 'column',
    },
    mainInfo: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    tempInfo: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'beige',
        flexDirection: 'row',
    },
    tempInfoItem: {
        flex: 1,
        fontSize: 10,
        fontWeight: "100",
        color: "#222",
        textAlign: 'center',
    },
    tempInfoItemSep: {
        backgroundColor: "#eee",
        width: 3,
        borderRadius: 1,
        height: 20,
    },
    nextDaysListView: {
        flex: 1,
        padding: 10,
    },
    nextDaysItem: {
        margin: 3,
        flexDirection: 'row',
        backgroundColor: "#eee",
        padding: 5,
        alignItems: 'center',
    },
    nextDaysItemStatus: {
        flex: 1,
        fontSize: 10,
        fontWeight: "100",
        color: "#222",
        textAlign: 'center',
    },
    weatherTempGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherIcon: {
        width: 30,
        height: 30,
    },
    nextDaysItemIcon: {
        width: 15,
        height: 15,
    },
    weatherDescription: {
        flex: 1,
        fontSize: 20,
        fontWeight: "100",
        color: "#111",
    },
}
