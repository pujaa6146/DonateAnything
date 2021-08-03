import React, { Component, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Button,
  flex,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  Picker,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import { Icon, Card } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { logoutUser } from "../redux/Actioncreators";
import * as MailComposer from "expo-mail-composer";
import ValidationComponent from "react-native-form-validator";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (refreshToken) => dispatch(logoutUser(refreshToken)),
  };
};

class Main extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      date: new Date(),
      show: false,
      mode: "date",
      location: "",
      ngolocation: "",
      showAgent: false,
      errmsg: "",
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleAgent = this.handleAgent.bind(this);
  }

  handleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleAgent() {
    this.setState({ showAgent: !this.state.showAgent });
  }

  async handleLogout() {
    await this.props.logoutUser(this.props.auth.token.refresh.token);
    if (this.props.auth.isAuthenticated == false) {
      this.props.navigation.navigate("Home");
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let coords = {
          latitude: position.coords.latitude.valueOf(),
          longitude: position.coords.longitude.valueOf(),
        };
        console.log(coords);
        let response = await Location.reverseGeocodeAsync(coords);
        let address = "fetching address...";
        console.log(response);
        for (let item of response) {
          address = `${item.name}, ${item.street}, ${item.district}, ${item.city}, ${item.region}, ${item.country} - ${item.postalCode}`;
        }
        this.setState({ location: address, ngolocation: address });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 80000, maximumAge: 10000 }
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["cspujaa@gmail.com"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  }

  async handleDonateDetails() {
    this.validate({
      location: { required: true },
      DT_Picker: { required: true },
    });
    var checkedItems =
      this.state.checked1 || this.state.checked2 ? true : false;

    if (this.isFormValid() && checkedItems == true) {
      this.setState({ errmsg: "" });
      Alert.alert("An NGO agent will collect your items shortly!");
    } else {
      var newerrmsg = this.getErrorMessages();
      if (checkedItems == false) {
        newerrmsg = newerrmsg + "\nPlease select donate item type.";
      }
      this.setState({ errmsg: newerrmsg });
    }
  }

  async handleNGODetails() {
    this.validate({
      location: { required: true },
    });
    var checkedItems =
      this.state.checked1 || this.state.checked2 ? true : false;

    if (this.isFormValid() && checkedItems == true) {
      this.setState({ errmsg: "" });
      Alert.alert(
        "Hey There!",
        "The Donater details will appear here",
        [
          {
            text: "SEND MAIL",
            onPress: this.sendMail,
          },
          {
            text: "DONT SEND",
            onPress: () => console.log("No button clicked"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      var newerrmsg = this.getErrorMessages();
      if (checkedItems == false) {
        newerrmsg = newerrmsg + "\nPlease select NGO item type.";
      }
      this.setState({ errmsg: newerrmsg });
    }
  }

  render() {
    // const showNgoAlert = () => {

    // };

    return (
      <ImageBackground
        resizeMode="cover"
        style={styles.container}
        source={require("./img/donatebg.jpg")}
      >
        <StatusBar style="auto" />
        <View style={styles.logout}>
          <Button
            onPress={() => this.handleLogout()}
            title="Logout"
            color="#FFB6C1"
          />
        </View>

        <View style={styles.logocontainer}>
          <Image
            style={styles.logo}
            source={require("./img/logoremovebg.png")}
          />
          <Text style={styles.title}>DonateAnything</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            top: 20,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            {this.props.auth.isAuthenticated ? this.props.auth.user.name : ""}
          </Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>&#44;</Text>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            {this.props.auth.isAuthenticated
              ? this.props.auth.user.ngo_or_donater
              : ""}
          </Text>
        </View>
        <View style={styles.bodyup}>
          <Text style={styles.think}>Love all.Serve all.</Text>
          <Text style={styles.think}>Help ever.Hurt never.</Text>

          <View style={styles.donatebutton}>
            <TouchableOpacity
              disabled={
                this.props.auth.isAuthenticated &&
                this.props.auth.user.ngo_or_donater == "donater"
                  ? false
                  : true
              }
              onPress={() => {
                this.getLocation();
                this.handleModal();
              }}
              style={styles.button1}
            >
              <Text>Donate</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ngobutton}>
            <TouchableOpacity
              disabled={
                this.props.auth.isAuthenticated &&
                this.props.auth.user.ngo_or_donater == "ngo"
                  ? false
                  : true
              }
              onPress={() => {
                this.getLocation();
                this.handleAgent();
              }}
              style={styles.button2}
            >
              <Text>NGO Agent</Text>
            </TouchableOpacity>
          </View>
          <Modal animationType={"fade"} visible={this.state.showModal}>
            <View style={styles.formrow}>
              <Text style={styles.title}>Donate Details</Text>
              <MaterialIcons
                style={styles.closeicon}
                name="close"
                size={30}
                onPress={this.handleModal}
              />
            </View>
            <View style={styles.formrow}>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="location-on" size={24} color="black" />
                <Text style={{ paddingLeft: 10 }}>Pickup where?</Text>
              </View>
              <TextInput
                style={{ borderBottomWidth: 1 }}
                textContentType="location"
                placeholder="Get the pickup location"
                ref="location"
              >
                {this.state.location}
              </TextInput>
            </View>

            <View style={styles.formrow}>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="praying-hands" size={20} color="black" />
                <Text style={{ paddingLeft: 10 }}>Donate Item(s)</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  value={this.state.checked1}
                  onValueChange={() =>
                    this.setState({ checked1: !this.state.checked1 })
                  }
                  tintColors={{ true: "pink", false: "DarkPink" }}
                />
                <Text>Food</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  value={this.state.checked2}
                  onValueChange={() =>
                    this.setState({ checked2: !this.state.checked2 })
                  }
                  tintColors={{ true: "pink", false: "DarkPink" }}
                />
                <Text>Dress</Text>
              </View>
            </View>

            <View style={styles.formrow}>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="calendar-alt" size={20} color="black" />
                <Text style={{ paddingLeft: 10 }}>Preferred Date and Time</Text>
              </View>
              <TouchableOpacity
                // style={styles.formItem}
                style={{
                  padding: 7,
                  borderColor: "pink",
                  borderWidth: 2,
                  flexDirection: "row",
                }}
                ref="DT_Picker"
                onPress={() => this.setState({ show: true, mode: "date" })}
              >
                <Icon type="font-awesome" name="calendar" color="pink" />
                <Text>
                  {" " + Moment(this.state.date).format("DD-MMM-YYYY h:mm A")}
                </Text>
              </TouchableOpacity>
              {this.state.show && (
                <DateTimePicker
                  value={this.state.date}
                  mode={this.state.mode}
                  minimumDate={new Date()}
                  minuteInterval={30}
                  onChange={(event, date) => {
                    if (date === undefined) {
                      this.setState({ show: false });
                    } else {
                      this.setState({
                        show: this.state.mode === "time" ? false : true,
                        mode: "time",
                        date: new Date(date),
                      });
                    }
                  }}
                />
              )}
            </View>
            <Text style={styles.error}>{this.state.errmsg}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onPress={() => {
                  this.handleDonateDetails();
                }}
                title="Submit"
                color="pink"
              />
            </View>
          </Modal>
          <Modal animationType={"fade"} visible={this.state.showAgent}>
            <View style={styles.agent}>
              <Text style={styles.title}>NGO Details</Text>
              <MaterialIcons
                style={styles.closeicon}
                name="close"
                size={30}
                onPress={this.handleAgent}
              />
            </View>
            <View style={styles.agent}>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="location-on" size={24} color="black" />
                <Text style={{ paddingLeft: 10 }}>Your Location</Text>
              </View>
              <TextInput
                style={{ borderBottomWidth: 1 }}
                textContentType="location"
                placeholder="Enter the location"
              >
                {this.state.ngolocation}
              </TextInput>
            </View>
            <View style={styles.agent}>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="praying-hands" size={20} color="black" />
                <Text style={{ paddingLeft: 10 }}>Select Items</Text>
              </View>

              <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                <CheckBox
                  value={this.state.checked1}
                  onValueChange={() =>
                    this.setState({ checked1: !this.state.checked1 })
                  }
                  tintColors={{ true: "pink", false: "DarkPink" }}
                />
                <Text>Food</Text>
              </View>
              <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                <CheckBox
                  value={this.state.checked2}
                  onValueChange={() =>
                    this.setState({ checked2: !this.state.checked2 })
                  }
                  tintColors={{ true: "pink", false: "DarkPink" }}
                />
                <Text>Dress</Text>
              </View>
            </View>
            <Text style={styles.error}>{this.state.errmsg}</Text>
            <View style={styles.agent}>
              <Button
                onPress={() => {
                  this.handleNGODetails();
                }}
                title="Submit"
                color="pink"
              />
            </View>
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "sans-serif-condensed",
  },
  logo: {
    height: 120,
    width: 150,
    borderRadius: 40,
  },
  logocontainer: {
    position: "absolute",
    top: 40,
    alignItems: "center",
  },
  bodyup: {
    width: 300,
    height: 350,
    alignItems: "center",
    top: 30,
  },
  think: {
    fontSize: 25,
    marginTop: 5,
    fontFamily: "notoserif",
    fontStyle: "italic",
  },
  donatebutton: {
    flexDirection: "column",
    top: 40,
    paddingRight: 180,
  },
  ngobutton: {
    top: -60,
    paddingLeft: 200,
  },
  button1: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "pink",
  },
  button2: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "pink",
  },
  formrow: {
    // left: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  closeicon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  agent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  logout: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  error: {
    paddingLeft: 15,
    color: "red",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
