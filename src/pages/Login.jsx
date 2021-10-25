import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import InputWithError from '../components/InputWithError';
import api from '../services/api';

const styles = StyleSheet.create({
  container: {
      padding: 20
  },
  header: {
    fontSize: 45,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  button: {
    width: 150,
    //alignSelf: 'flex-end'
    alignSelf: 'center'
  }
});

const Login = ({ navigation }) => {
  const formDataModel = {
      email: null,
      code: null,
  };

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = () => {
    api.get(`gymkhanas/code/${data.code}`)
    .then((response) => {
      data.gymkhana = response.data;
            
      if (response && response.data && response.data.id) {
        api.get(`users/email/${data.email}`)
        .then((response) => {
          if (response && response.data && response.data.id) {
            data.participant = response.data;
            setData(data);
            navigation.navigate("Confirm", data);
          }      
        }).catch(() => {          
          setData(data);
          navigation.navigate("Register", data);
        });
      }
    }).catch(() => {
      Alert.alert('Não encontramos gincanas com este código');
    });        
    
    // let returnData = {registred: false};
    // if(returnData.registred){
    //     navigation.navigate("Confirm");
    // }else {
    //     navigation.navigate("Register");
    // }
  }

  return (
    <View style={styles.container}>
        <Headline style={styles.header}>GymkhanAR</Headline>
        <InputWithError type={"text"}
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        label={"E-mail"}
                        name={"email"}
                        value={data.email}
                        onChange={onChangeForm}
                        visibleError={!data.email || !data.email.includes("@")}
                        labelError={"Email invalido"}
                        style={{paddingBottom: 15}}
        />
        <InputWithError type={"text"}
                        label={"Código da gincana"}
                        name={"code"}
                        value={data.code}                        
                        onChange={onChangeForm}
                        visibleError={!data.code}
                        labelError={"Código invalido"}
                        style={{paddingBottom: 15}}
        />
        <Button mode="contained" onPress={onPressConfirm} style={styles.button}>
            Confirmar
        </Button>
    </View>
  );
}

export default Login;
