import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from "react-router-native";
import { Button, Headline } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

const styles = StyleSheet.create({
  container: {
      padding: 20
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    paddingTop: 50
  },
  button: {
    width: 150,
    //alignSelf: 'flex-end'
    alignSelf: 'center'
  }
});

const Login = () => {
  const formDataModel = {
      email: null,
      code: null,
  };

  let history = useHistory();

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = () => {
      let returnData = {registred: true};
      if(returnData.registred){
          history.push("/user/confirm");
      }else {
          history.push("/user/register");
      }
  }

  return (
    <View>
        <Headline style={styles.header}>GymkhanarAR</Headline>
        <View style={styles.container}>
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
    </View>
  );
}

export default Login;
