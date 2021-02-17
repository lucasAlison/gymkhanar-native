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

const Team = () => {
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
          history.push("/user/confirm");
      }else {
          history.push("/user/register");
      }
  }

  return (
    <View>
        <View style={styles.container}>
            <Button mode="contained" onPress={onPressConfirm}>Confirmar</Button>
        </View>
    </View>
  );
}

export default Team;
