import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Icon, Input, CheckBox } from "react-native-elements";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      radioButton: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o", color: "#FF69B4" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key", color: "#FF69B4" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="First Name"
          leftIcon={{ type: "font-awesome", name: "user-o", color: "#FF69B4" }}
          onChangeText={(lastname) => this.setState({ firstname })}
          value={this.state.firstname}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Last Name"
          leftIcon={{ type: "font-awesome", name: "user-o", color: "#FF69B4" }}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope-o", color: "#FF69B4" }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          containerStyle={styles.formInput}
        />
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <CheckBox
            title="Donater"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.radioButton === "Donater"}
            onPress={() => this.setState({ radioButton: "Donater" })}
            containerStyle={styles.formCheckbox}
            checkedColor="#FF69B4"
            uncheckedColor="grey"
          ></CheckBox>
          <CheckBox
            title="NGO"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.radioButton === "NGO"}
            onPress={() => this.setState({ radioButton: "NGO" })}
            containerStyle={styles.formCheckbox}
            checkedColor="#FF69B4"
            uncheckedColor="grey"
          ></CheckBox>
        </View>

        <View style={styles.formButton}>
          <Button
            // onPress={() => this.handleRegister()}
            title="Register"
            icon={<Icon name="user-plus" type="font-awesome" size={24} color="white" />}
            buttonStyle={{
              backgroundColor: "#FF1493",
              borderRadius: 25,
              width: "80%",
              height: 50,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },

  formInput: {
    // margin: 5,
  },
  formCheckbox: {
    backgroundColor: null,
  },

  formButton: {
    paddingLeft: 60,
  },
});
