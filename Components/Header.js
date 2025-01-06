import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ onBackPress, onSearchPress, onFilterPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Adjust StatusBar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={Platform.OS === "android"}
      />
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Title Section */}
        <View style={styles.titleWrapper}>
          <Text style={styles.emoji}>🎓</Text>
          <Text style={styles.title}>Student List</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onSearchPress} style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFilterPress} style={styles.actionButton}>
            <Text style={styles.actionIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    width: 30,
    alignItems: "center",
  },
  backIcon: {
    fontSize: 20,
    color: "#333",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 16,
  },
  actionIcon: {
    fontSize: 20,
    color: "#333",
  },
});

export default Header;
