import React from 'react';
import PropTypes from 'prop-types';
import {
    View, TextInput, Text, StyleSheet,
} from 'react-native';

/**
 * A component which renders a TextInput with a label above it.
 * Note: This component can easily be written as a stateless function
 *      since it only includes the `render()` function and nothing else
 *      (see FormButton component as an example).
 */
class FormTextInput extends React.Component {
    render() {
        const { labelText, ...inputProps } = this.props;

        return (
            <View style={styles.inputWrapper}>
                {labelText && <Text style={styles.label}>{labelText}</Text>}
                <TextInput style={styles.textInput} blurOnSubmit {...inputProps} />
            </View>
        );
    }
}

FormTextInput.propTypes = {
    labelText: PropTypes.string,
};

FormTextInput.defaultProps = {
    labelText: null,
};

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    textInput: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#3F4EA5',
    },
    label: {
        color: '#FFF',
        marginBottom: 5,
    },
});

export default FormTextInput;
