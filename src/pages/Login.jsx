import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

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
      let returnData = {registred: false};
      if(returnData.registred){
          navigation.navigate("Confirm");
      }else {
          navigation.navigate("Register");
      }
  }

  return (
    <View style={styles.container}>
        <Headline style={styles.header}>GymkhanAR</Headline>
        <InputWithError type={"text"}
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
