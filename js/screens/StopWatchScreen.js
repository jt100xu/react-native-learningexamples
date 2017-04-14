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
    _ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    constructor(props) {
        super(props);

        this.state = {
            recordDataSource: this._ds.cloneWithRows(['No records']),
            initialTime: -1,
            totalTime: 0,
            lastTotalTime: 0,
            watchState: 'reset',
            rightButtonText: 'Start',
            leftButtonText: 'Reset',
            totalTimeText: '00:00:00',
        };
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        this._resetWatch();
        clearInterval(this._watchInterval)
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    _resetWatch() {
        this._records = null;
        this.setState({
            recordDataSource: this._ds.cloneWithRows(['No records']),
            initialTime: -1,
            totalTime: 0,
            lastTotalTime: 0,
            watchState: 'reset',
            rightButtonText: 'Start',
            leftButtonText: 'Reset',
            totalTimeText: '00:00:00',
        })
    }

    _convertTo2char(num) {
        return num < 10 ? '0' + num : num;
    }

    _convertTimeToString(time) {
        return this._convertTo2char(Math.floor(time / 1000 / 60)) + ':' +
            this._convertTo2char(Math.floor(time / 1000 % 60)) + ':' +
            this._convertTo2char(Math.floor(time % 1000 / 10));
    }

    onNavigationStateChange(prevState, newState) {
        alert('prevState: ' + prevState)
        alert('newState: ' + newState)
    }

    _watchTictac() {
        let time = this.state.lastTotalTime + Date.now() - this.state.initialTime;
        this.setState({
            totalTimeText: this._convertTimeToString(time),
        })
        this.setState({
            totalTime: time,
        })
    }

    _onPressRightButton() {
        switch (this.state.watchState) {
            case 'reset':
                this._records = new Array();
            case 'pause':
                this.setState({
                    initialTime: Date.now(),
                    watchState: 'tictac',
                    rightButtonText: 'Pause',
                    leftButtonText: 'Rec',
                })
                this._watchInterval = setInterval(() => { this._watchTictac() }, 10);
                break;
            case 'tictac':
                this.setState({
                    watchState: 'pause',
                    rightButtonText: 'Resume',
                    leftButtonText: 'Reset',
                    lastTotalTime: this.state.totalTime,
                })
                clearInterval(this._watchInterval)
                break;
        }
    }

    _onPressLeftButton() {
        switch (this.state.watchState) {
            case 'pause':
                this._resetWatch()
                clearInterval(this._watchInterval)
                break;
            case 'tictac':
                //todo record
                this._records.push(this.state.totalTime);
                this.setState({
                    recordDataSource: this._ds.cloneWithRows(this._records)
                })
                break;
        }
    }

    render() {
        return <View style={styles.stopWatchContainer}>
            {/*Watch Face*/}
            <View style={styles.watchFaceContainer}>
                <Text style={styles.watchFaceTotalTime}>{this.state.totalTimeText}</Text>
            </View>

            {/*Watch Control*/}
            <View style={styles.watchControlContainer}>
                <TouchableHighlight style={styles.whiteCircleButton} underlayColor={underlayColor} onPress={() => { this._onPressLeftButton() }}>
                    <Text style={styles.whiteCircleButtonText}>{this.state.leftButtonText}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.whiteCircleButton} underlayColor={underlayColor} onPress={() => { this._onPressRightButton() }}>
                    <Text style={styles.whiteCircleButtonText}>{this.state.rightButtonText}</Text>
                </TouchableHighlight>
            </View>

            {/*Watch Record*/}
            <ListView
                style={styles.recordContainer}
                dataSource={this.state.recordDataSource}
                renderRow={(rowData) => {
                    return <View style={styles.recordItem}>
                        <Text style={styles.whiteCircleButtonText}>{typeof rowData === 'string' ? rowData : this._convertTimeToString(rowData)}</Text>
                    </View>
                }}
            />
        </View>
    }
}

const underlayColor = "honeydew";
const styles = StyleSheet.create({
    stopWatchContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    watchFaceContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        padding: 30,
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
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        padding: 10,
    },
    whiteCircleButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    whiteCircleButtonText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
    recordContainer: {
        flex: 1,
        padding: 10,
    },
    recordItem: {
        padding: 5,
    },
});