import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import StudentDetailModal from "./StudentViewModel";

const StudentItem = ({ student, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Tracks expanded state
  const [modalVisible, setModalVisible] = useState(false); // Modal state

  // Helper function to format classes
  const formatClasses = (classes) => {
    const classList = classes.split(", ");
    if (classList.length > 2 && !isExpanded) {
      const displayedClasses = classList.slice(0, 2).join(", ");
      const remainingCount = classList.length - 2;
      return `${displayedClasses}, +${remainingCount} more`;
    }
    return classes;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isExpanded && styles.expandedContainer]}
      onPress={() => setIsExpanded(!isExpanded)}
      onLongPress={() => setModalVisible(true)}
    >
      {/* Header Section */}
      <View style={styles.headerRow}>
        <View style={styles.imageAndNameContainer}>
          <Image source={{ uri: student.profileImage }} style={styles.image} />
          <Text style={styles.name}>{student.name}</Text>
        </View>
        <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
          <View
            style={[
              styles.checkbox,
              student.isSelected && styles.checkedCheckbox,
            ]}
          >
            {student.isSelected && <Text style={styles.checkboxText}>✓</Text>}
          </View>
        </TouchableOpacity>
      </View>
      {!isExpanded && (
        <View style={styles.classesRow}>
          <Text style={styles.label}>Classes</Text>
          <Text style={styles.info}>{formatClasses(student.classes)}</Text>
        </View>
      )}
      {/* Expanded Details */}
      {isExpanded && (
        <View style={styles.expandedDetails}>
          <View style={styles.horizontalRow}>
            <View>
              <Text style={styles.label}>Registration Number</Text>
              <Text style={styles.value}>{student.registrationNumber}</Text>
            </View>
            <View>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{student.age}</Text>
            </View>
            <View>
              <Text style={styles.label}>Classes</Text>
              <Text style={styles.value}>{formatClasses(student.classes)}</Text>
            </View>
          </View>

          {/* Family Members Section */}
          <Text style={[styles.label, { marginTop: 16 }]}>Family Members</Text>
          <View style={styles.familyMembers}>
            {student.familyMembers.map((member, index) => (
              <Image
                key={index}
                source={{ uri: member.image }}
                style={styles.familyMemberImage}
              />
            ))}
          </View>
        </View>
      )}
      <StudentDetailModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        student={student}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 12, // Rounded corners
    backgroundColor: "#FFFFFF", // Light background color
    borderWidth: 1,
    borderColor: "#dcdcdc", // Subtle border color
    marginHorizontal: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600", // Semi-bold font
    color: "#1A1A1A", // Darker text color
    fontFamily: "Avenir Next",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#D6D6D6", // Light gray border
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkboxText: {
    fontSize: 16,
    color: "#FFFFFF", // White checkmark
  },
  expandedDetails: {
    marginTop: 16,
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E", // Subtle gray color for labels
    fontFamily: "Avenir Next",
  },
  value: {
    fontSize: 14,
    color: "#1A1A1A", // Darker text color
    fontWeight: "500",
    fontFamily: "Avenir Next",
  },
  familyMembers: {
    flexDirection: "row",
    marginTop: 8,
  },
  familyMemberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  classesRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    fontSize: 14,
    color: "#1A1A1A", // Darker color for info text
    fontWeight: "500",
    fontFamily: "Avenir Next",
  },
});

export default StudentItem;
