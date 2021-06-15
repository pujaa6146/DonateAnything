import React, { Component } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { Button, Icon, Input, CheckBox } from "react-native-elements";
import ValidationComponent from "react-native-form-validator";
import { connect } from "react-redux";
import { registerUser } from "../redux/Actioncreators";
import { FontAwesome } from "@expo/vector-icons";
import PasswordInputText from "react-native-hide-show-password-input";
import { Alert } from "react-native";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (info) => dispatch(registerUser(info)),
  };
};

class Register extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      confirmpassword: "",
      email: "",
      ngo_or_donater: "",
      errmsg: "",
    };
  }
  async handleRegister() {
    // Call ValidationComponent validate method
    this.validate({
      name: { minlength: 3, maxlength: 20, required: true },
      password: {
        minlength: 8,
        maxlength: 12,
        required: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumber: true,
      },
      confirmpassword: { equalPassword: this.state.password },
      email: { email: true },
      ngo_or_donater: { required: true },
    });

    if (this.isFormValid() == false) {
      this.setState({ errmsg: this.getErrorMessages() });
    } else {
      this.setState({ errmsg: "" });
    }

    var signupdetails = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      ngo_or_donater: this.state.ngo_or_donater,
    };

    await this.props.registerUser(signupdetails);

    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate("Main");
    } else {
      ToastAndroid.showWithGravity(this.props.auth.errmsg, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <Input
          ref="name"
          placeholder="Name"
          leftIcon={{ type: "font-awesome", name: "user-o", color: "#FF69B4" }}
          onChangeText={(name) => {
            this.setState({ name }, () => {
              this.validate({
                name: { minlength: 3, maxlength: 20, required: true },
              });
            });
          }}
          value={this.state.name}
          containerStyle={styles.formInput}
        />
        {this.isFieldInError("name") &&
          this.getErrorsInField("name").map((errorMessage, idx) => (
            <Text key={idx} style={styles.error}>
              {errorMessage}
            </Text>
          ))}
        <Input
          ref="password"
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key", color: "#FF69B4" }}
          onChangeText={(password) => {
            this.setState({ password }, () => {
              this.validate({
                password: {
                  minlength: 8,
                  maxlength: 12,
                  required: true,
                  hasUpperCase: true,
                  hasLowerCase: true,
                  hasNumber: true,
                },
              });
            });
          }}
          value={this.state.password}
          containerStyle={styles.formInput}
          secureTextEntry={true}
        />
        {this.isFieldInError("password") &&
          this.getErrorsInField("password").map((errorMessage, idx) => (
            <Text key={idx} style={styles.error}>
              {errorMessage}
            </Text>
          ))}
        <Input
          ref="confirmpassword"
          placeholder="Confirm Password"
          leftIcon={{ type: "font-awesome", name: "key", color: "#FF69B4" }}
          onChangeText={(confirmpassword) => {
            this.setState({ confirmpassword }, () => {
              this.validate({
                confirmpassword: { equalPassword: this.state.password },
              });
            });
          }}
          value={this.state.confirmpassword}
          containerStyle={styles.formInput}
          secureTextEntry={true}
          type={this.state.hidden ? "password" : "text"}
        />
        {this.isFieldInError("confirmpassword") &&
          this.getErrorsInField("confirmpassword").map((errorMessage, idx) => (
            <Text key={idx} style={styles.error}>
              {errorMessage}
            </Text>
          ))}
        <Input
          ref="email"
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope-o", color: "#FF69B4" }}
          onChangeText={(email) => {
            this.setState({ email }, () => {
              this.validate({
                email: { email: true, required: true },
              });
            });
          }}
          value={this.state.email}
          containerStyle={styles.formInput}
        />
        {this.isFieldInError("email") &&
          this.getErrorsInField("email").map((errorMessage, idx) => (
            <Text key={idx} style={styles.error}>
              {errorMessage}
            </Text>
          ))}
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <CheckBox
            title="Donater"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.ngo_or_donater === "donater"}
            onPress={() => this.setState({ ngo_or_donater: "donater" })}
            containerStyle={styles.formCheckbox}
            checkedColor="#FF69B4"
            uncheckedColor="grey"
          ></CheckBox>
          <CheckBox
            title="NGO"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.ngo_or_donater === "ngo"}
            onPress={() => this.setState({ ngo_or_donater: "ngo" })}
            containerStyle={styles.formCheckbox}
            checkedColor="#FF69B4"
            uncheckedColor="grey"
          ></CheckBox>
        </View>
        <Text style={styles.error}>{this.state.errmsg}</Text>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleRegister()}
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
    backgroundColor: "#fadadd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  error: {
    paddingLeft: 15,
    color: "red",
  },
  formInput: {
    // margin: 5,
  },
  formCheckbox: {
    backgroundColor: null,
    borderColor: "#fadadd",
  },

  formButton: {
    paddingLeft: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
