import React, { Component } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, Text, Alert,
} from 'react-native';

import FormBuilder from './js/components/FormBuilder';

export default class App extends Component {
    getFormFields = () => {
        const inputProps = {
            placeholder: '0',
            autoCapitalize: 'none',
            autoCorrect: false,
            keyboardType: 'numeric',
            returnKeyType: 'done',
        };

        const formFields = [
            [
                {
                    name: 'hourlyRate',
                    label: 'Hourly Rate',
                    type: 'text',
                    inputProps,
                },
                {
                    name: 'hoursPerWeek',
                    label: 'Hours / Week',
                    type: 'text',
                    inputProps,
                },
            ],
            [
                {
                    name: 'daysPerWeek',
                    label: 'Days / Week',
                    type: 'text',
                    inputProps,
                },
            ],
        ];

        return formFields;
    };

    /**
     * Grab user's input data and do the math.
     */
    handleSubmit = (state) => {
        // using Javascript object destructuring to
        // get user's input data from the state.
        const { hourlyRate, hoursPerWeek, daysPerWeek } = state;

        const weeksPerYear = 52;
        const hoursPerDay = Math.ceil(parseFloat(hoursPerWeek) / parseFloat(daysPerWeek));
        const weeklyIncome = Math.abs(
            parseFloat(hourlyRate) * hoursPerDay * parseFloat(daysPerWeek),
        );
        const annualIncome = Math.abs(
            parseFloat(hourlyRate) * parseFloat(hoursPerWeek) * weeksPerYear,
        );

        // show results
        Alert.alert(
            'Results',
            `\nWeekly Income: $${weeklyIncome}, \n Annual Income: $${annualIncome}`,
        );
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.screenTitle}>Salary Calculator</Text>
                <FormBuilder
                    formFieldsRows={this.getFormFields()}
                    handleSubmit={this.handleSubmit}
                    submitBtnTitle="Calculate"
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
});
