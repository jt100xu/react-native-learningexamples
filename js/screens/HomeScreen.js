import React from 'react';
import {
    Button,
    View,
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to Learning Examples',
    };
    render() {
        const { navigate } = this.props.navigation;

        return <View style={{ flex: 1, flexDirection: 'column' }}>
            <Button style={{ flex: 1, height: 50, backgroundColor: 'powderblue' }}
                title='Stop Watch'
                onPress={() => navigate('StopWatch')} />
        </View>
    }
}