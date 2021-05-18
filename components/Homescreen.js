import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Linking } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Homescreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
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

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

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
});
