import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
export default class WeatherScreen extends React.Component {
    static navigationOptions = {
        title: 'Weather',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Swiper style={styles.wrapper}
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{ backgroundColor: '#fff', borderColor: '#333', borderWidth: 1, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#333', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        justifyContent: 'center'
                    }}
                >
                    <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/1.jpg')} />
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/2.jpg')} />
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/3.jpg')} />
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/4.jpg')} />
                    </View>
                </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
}