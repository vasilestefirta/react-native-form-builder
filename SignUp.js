import React, { Component } from 'react';
import {
    StyleSheet, KeyboardAvoidingView, SafeAreaView, Text, Alert,
} from 'react-native';

import FormBuilder from './js/components/FormBuilder';

export default class SignUp extends Component {
    getFormFields = () => {
        const formFields = [
            [
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                    },
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                    },
                },
            ],
            [
                {
                    name: 'email',
                    label: 'Email',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        keyboardType: 'email-address',
                    },
                },
            ],
            [
                {
                    name: 'skills',
                    label: 'Skills',
                    type: 'text',
                    inputProps: {
                        autoCorrect: false,
                        multiline: true,
                        numberOfLines: 4,
                        blurOnSubmit: false,
                    },
                },
            ],
            [
                {
                    name: 'password',
                    label: 'Password',
                    type: 'text',
                    inputProps: {
                        secureTextEntry: true,
                    },
                },
            ],
        ];

        return formFields;
    };

    /**
     * Grab user's input data.
     */
    handleSubmit = (state) => {
        const {
            firstName, lastName, email, skills, password,
        } = state;

        Alert.alert(
            'Your info',
            `First Name: ${firstName}\n Last Name: ${lastName}\n Email: ${email}\n Skills: ${skills} \n Password: ${password}`,
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Text style={styles.screenTitle}>Sign Up</Text>
                    <FormBuilder
                        formFieldsRows={this.getFormFields()}
                        handleSubmit={this.handleSubmit}
                        submitBtnTitle="Sign Up"
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3F4EA5',
    },
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
