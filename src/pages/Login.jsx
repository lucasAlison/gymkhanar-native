import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from "react-router-native";
import { Button } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
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
      let returnData = {registred: false};
      if(returnData.registred){
          history.push("/confirm");
      }else {
          history.push("/register");
      }
  }

  return (
    <View>
        <View style={styles.container}>
            <InputWithError type={"text"}
                            label={"E-mail"}
                            name={"email"}
                            value={data.email}
                            onChange={onChangeForm}
                            visibleError={!data.email || !data.email.includes("@")}
                            labelError={"Email invalido"}
            />
            <InputWithError type={"text"}
                            label={"Código da gincana"}
                            name={"code"}
                            value={data.code}
                            onChange={onChangeForm}
                            visibleError={!data.code}
                            labelError={"Código invalido"}
            />
            <Button mode="contained" onPress={onPressConfirm}>Confirmar</Button>
        </View>
    </View>
  );
}

export default Login;
