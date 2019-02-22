import React, { Component } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text, Keyboard, Alert,
} from 'react-native';

import FormTextInput from './js/components/FormTextInput';
import FormButton from './js/components/FormButton';

export default class App extends Component {
    constructor(props) {
        super(props);

        // define the initial state, so we can use it later
        // when we'll need to reset the form
        this.initialState = { hourlyRate: '', hoursPerWeek: '' };

        this.state = this.initialState;
    }

    /**
     * Grab user's input data and do the math.
     */
    handleSubmit = () => {
        // using Javascript object destructuring to
        // get user's input data from the state.
        const { hourlyRate, hoursPerWeek } = this.state;

        // hide the keyboard
        // NOTE: the keyboard seems to show up after being dismissed
        //       when using the Alert react native component.
        //       Not a big deal at the moment (this is fine 😜).
        Keyboard.dismiss();

        // make sure we have some numeric values to work with
        if (!parseFloat(hourlyRate) || !parseFloat(hoursPerWeek)) {
            Alert.alert('Input error', 'Please input some positive numeric values.');
            return;
        }

        // do the Math
        const annualIncome = Math.abs(parseFloat(hourlyRate) * parseFloat(hoursPerWeek) * 52);

        // show results
        Alert.alert(
            'Your input and result',
            `$/hour: ${hourlyRate},\n Hours/week: ${hoursPerWeek}, \n Annual Income: $${annualIncome}`,
        );
    };

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(this.initialState);
    };

    render() {
        const { hourlyRate, hoursPerWeek } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.screenTitle}>Salary Calculator</Text>
                <FormTextInput
                    placeholder="$0"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hourlyRate: text })}
                    value={hourlyRate}
                    labelText="Hourly Rate"
                />
                <FormTextInput
                    placeholder="0"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hoursPerWeek: text })}
                    value={hoursPerWeek}
                    labelText="Hours / week"
                />
                <FormButton onPress={this.handleSubmit}>Calculate</FormButton>
                <FormButton onPress={this.resetForm}>Reset</FormButton>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});
