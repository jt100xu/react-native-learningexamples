import React from 'react';
import {
    Button,
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Learning Examples',
    };
    render() {
        const { navigate } = this.props.navigation;

        return <View style={{ flex: 1, flexDirection: 'column' }}>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => navigate('StopWatch')}>
                <Text style={styles.roundedButtonText}>Stop Watch</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => navigate('Weather')}>
                <Text style={styles.roundedButtonText}>Weather</Text>
            </TouchableHighlight>
        </View>
    }
}

const underlayColor = "honeydew";
const styles = StyleSheet.create({
    roundedButton: {
        height: 50,
        borderRadius: 11,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    roundedButtonText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
});