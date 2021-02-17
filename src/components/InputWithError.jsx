import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, Checkbox, Text } from 'react-native-paper';

const InputWithError = ({type, label, name, value, onChange, visibleError, labelError, style}) => {
  return (
    <View style={style}>
        {type === "text" &&
            <TextInput label={label} value={value}
                       mode='outlined'
                       onChangeText={text => onChange(name, text)}/>
        }
        {type === "checkbox" &&
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(name, !value)}
                />
                <Text style={{width: 370, fontSize: 16}}
                      onPress={() => onChange(name, !value)}>
                    {label}
                </Text>
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
