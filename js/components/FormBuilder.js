import React from 'react';
import PropTypes from 'prop-types';
import {
    View, StyleSheet, Keyboard, Alert,
} from 'react-native';

import FormTextInput from './FormTextInput';
import FormButton from './FormButton';

/**
 * A component which renders a form based on a given list of fields.
 */
class FormBuilder extends React.Component {
    /* eslint-disable no-param-reassign */
    constructor(props) {
        super(props);

        const formFields = this.getFormFields();

        // dynamically construct our initial state by using
        // each form field's name as an object property.
        const formFieldNames = formFields.reduce((obj, field) => {
            obj[field.name] = '';
            return obj;
        }, {});

        // define the initial state, so we can use it later on
        // when we'll need to reset the form
        this.initialState = {
            ...formFieldNames,
        };

        this.state = this.initialState;
    }
    /* eslint-enable no-param-reassign */

    /**
     * Extract our form fields from each row
     * and compose one big list of field objects.
     */
    getFormFields = () => {
        const { formFieldsRows } = this.props;
        const formFields = [];

        formFieldsRows.forEach((formFieldsRow) => {
            formFields.push(...formFieldsRow);
        });

        return formFields;
    };

    /**
     * Check if all fields have been filled out.
     */
    /* eslint-disable react/destructuring-assignment */
    hasValidFormData = () => {
        const formFields = this.getFormFields();
        const isFilled = formFields.every(field => !!this.state[field.name]);
        return isFilled;
    };
    /* eslint-enable react/destructuring-assignment */

    /**
     * Attempt to submit the form if all fields have been
     * properly field out.
     */
    attemptFormSubmission = () => {
        const { handleSubmit } = this.props;

        if (!this.hasValidFormData()) {
            return Alert.alert('Input error', 'Please input all required fields.');
        }

        return handleSubmit(this.state);
    };

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(this.initialState);
    };

    /* eslint-disable react/destructuring-assignment */
    renderTextInput = ({ name, label, inputProps }) => (
        <FormTextInput
            {...inputProps}
            value={this.state[name].toString()}
            onChangeText={(value) => {
                this.setState({ [name]: value });
            }}
            labelText={label}
            key={name}
        />
    );
    /* eslint-enable react/destructuring-assignment */

    render() {
        const { submitBtnTitle, formFieldsRows } = this.props;

        return (
            <View>
                {/* eslint-disable react/no-array-index-key */}
                {formFieldsRows.map((formFieldsRow, i) => (
                    <View style={styles.row} key={`r-${i}`}>
                        {formFieldsRow.map(field => this.renderTextInput(field))}
                    </View>
                ))}
                {/* eslint-enable react/no-array-index-key */}

                <FormButton onPress={this.attemptFormSubmission}>{submitBtnTitle}</FormButton>
                <FormButton onPress={this.resetForm}>Reset</FormButton>
            </View>
        );
    }
}

FormBuilder.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitBtnTitle: PropTypes.string,
    formFieldsRows: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                label: PropTypes.string,
                type: PropTypes.string,
                inputProps: PropTypes.object,
            }),
        ),
    ).isRequired,
};

FormBuilder.defaultProps = {
    submitBtnTitle: 'Submit',
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default FormBuilder;
