import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Linking, Modal } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Homescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showForgtpwd: false,
    };
    this.handleForgtpwd = this.handleForgtpwd.bind(this);
  }
  handleForgtpwd() {
    this.setState({ showForgtpwd: !this.state.showForgtpwd });
  }
  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.logohome}>
          <Image style={styles.image} source={require("./img/logoremovebg.png")} />
          <Text style={styles.tagline}>DonateAnything</Text>
        </View>

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email."
            placeholderTextColor="#003f5c"
            onChangeText={(email) => this.setState({ email: email })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password: password })}
          />
        </View>

        <TouchableOpacity onPress={this.handleForgtpwd}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <Modal animationType={"fade"} visible={this.state.showForgtpwd}>
          <MaterialIcons style={styles.closeicon} name="close" size={30} onPress={this.handleForgtpwd} />
          <View style={styles.formrow}>
            <Text style={styles.title}>Reset your password</Text>
            <View>
              <Text style={{ marginBottom: 50 }}>Enter your registered e-mail</Text>
              <TextInput style={{ borderBottomWidth: 1 }} placeholder="Enter the registered e-mail"></TextInput>
            </View>
            <View style={{ paddingLeft: 60 }}>
              <Button
                // onPress={() => this.handleRegister()}
                title="Send"
                buttonStyle={{
                  backgroundColor: "#FF1493",
                  borderRadius: 25,
                  width: "80%",
                  height: 50,
                }}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate("Main")}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text>Not a user?</Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }} onPress={() => this.props.navigation.navigate("Register")}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  // logohome: {
  //   flex: 1,
  // },

  image: {
    // marginBottom: 100,
    height: 200,
    width: 150,
    borderRadius: 5,
  },
  tagline: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "blue",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  closeicon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
  },
  formrow: {
    flex: 1,
    justifyContent: "space-around",
  },
  mailid: { justifyContent: "space-between" },
});
