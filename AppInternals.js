import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

function AppInternals() {
  String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length) str = padString + str;
    return str;
  };
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={{ textAlign: "center" }}>
          Rudimentary app for setting Arduino's time
        </Text>
      </View>
      <View style={styles.body}>
        <View>
          <Button
            color="green"
            onPress={showTimepicker}
            title="Show time picker!"
          />
          <View style={{ padding: 10 }} />
          <Button
            color="green"
            onPress={showDatepicker}
            title="Show date picker!"
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            let mins = date.getMinutes();
            let hours = date.getHours();
            mins = padDigits(mins, 2);
            hours = padDigits(hours, 2);
            //let msg = `${hours}:${mins}`;
            let year = date.getFullYear().toString();
            year = padDigits(year, 4);
            let month = date.getMonth() + 1;
            month = month.toString();
            month = padDigits(month, 2);
            let day_ = date.getDate().toString();
            day_ = padDigits(day_, 2);

            let url = `http://192.168.1.99/Time=${year}${month}${day_}${hours}${mins}`;
            axios.get(url);
          }}
          style={styles.sendButton}
        >
          <Text style={{ fontSize: 20 }}>Set time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: "gold",
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export { AppInternals };
