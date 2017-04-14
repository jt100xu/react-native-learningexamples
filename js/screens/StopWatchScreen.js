import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
} from 'react-native';

export default class StopWatchScreen extends React.Component {
    static navigationOptions = {
        title: 'Stop Watch',
    };
    static propTypes = {
        records: React.PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            recordDataSource: ds.cloneWithRows([this.props.records])
        };
    }

    render() {
        return <View style={styles.stopWatchContainer}>
            {/*Watch Face*/}
            <View style={styles.watchFaceContainer}>
                <Text style={styles.watchFaceSectionTime}>00:00:00</Text>
                <Text style={styles.watchFaceTotalTime}>00:00:00</Text>
            </View>

            {/*Watch Control*/}
            <View style={styles.watchControlContainer}>
                <TouchableHighlight style={styles.whiteCircleButton} underlayColor={underlayColor} onPress={() => { }}>
                    <Text style={styles.whiteCircleButtonText}>Reset</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.whiteCircleButton} underlayColor={underlayColor} onPress={() => { }}>
                    <Text style={styles.whiteCircleButtonText}>Start</Text>
                </TouchableHighlight>
            </View>

            {/*Watch Record*/}
            <ListView
                style={{ flex: 1 }}
                dataSource={this.state.recordDataSource}
                renderRow={(rowData) => {
                    return <View>
                        <Text>{rowData} abc</Text>
                    </View>
                }}
            />
        </View>
    }
}

const underlayColor = "#ffd";
const styles = StyleSheet.create({
    stopWatchContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'powderblue',
    },
    watchFaceContainer: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    watchFaceSectionTime: {
        fontSize: 20,
        fontWeight: "100",
        color: "#555",
        textAlign: 'right',
        paddingRight: 20,
    },
    watchFaceTotalTime: {
        fontSize: 40,
        fontWeight: "100",
        color: "#222",
        textAlign: 'center',
    },
    watchControlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: "#ddd",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    whiteCircleButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    whiteCircleButtonText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
});