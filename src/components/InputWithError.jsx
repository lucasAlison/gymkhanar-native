import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, Checkbox, Text } from 'react-native-paper';

const InputWithError = ({type, label, name, value, onChange, visibleError, labelError}) => {
  return (
    <View>
        {type === "text" &&
            <TextInput label={label} value={value}
                       onChangeText={text => onChange(name, text)}/>
        }
        {type === "checkbox" &&
            <View>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(name, !value)}
                />
                <Text>{label}</Text>
            </View>
        }
        {labelError != undefined &&
            <HelperText type="error" visible={visibleError}>
                {labelError}
            </HelperText>
        }
    </View>
  );
}

export default InputWithError;
