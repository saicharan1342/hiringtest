import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EditDetailsModal from "./Editmodel";

const StudentDetailModal = ({ isVisible, onClose, student, onEditSave }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false); // State to handle edit modal

  if (!student) return null; // Return null if no student data is passed

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <ScrollView>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Personal Information</Text>
                  <View style={styles.iconsContainer}>
                    {/* Edit Button */}
                    <TouchableOpacity
                      onPress={() => setEditModalVisible(true)}
                    >
                      <MaterialIcons
                        name="edit"
                        size={20}
                        color="#1A1A1A"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    {/* Add Guardian Button (placeholder) */}
                    <TouchableOpacity>
                      <MaterialIcons
                        name="person-add"
                        size={20}
                        color="#1A1A1A"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Personal Information */}
                <View style={styles.infoCard}>
                  <View style={styles.imageAndName}>
                    <Image
                      source={{ uri: student.profileImage }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.name}>{student.name}</Text>
                  </View>

                  {/* Registration No. and Date of Birth */}
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Registration No.</Text>
                      <Text style={styles.value}>
                        {student.registrationNumber}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Date of Birth</Text>
                      <Text style={styles.value}>Feb 04,2024</Text>
                    </View>
                  </View>

                  {/* Mobile and Email */}
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Mobile</Text>
                      <Text style={styles.link}>1234567890</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Email Address</Text>
                      <Text style={styles.link}>example@gmail.com</Text>
                    </View>
                  </View>
                </View>

                {/* Guardian Information */}
                <Text style={styles.sectionTitle}>Guardian Information</Text>
                <View style={styles.infoCard}>
                  <View style={styles.imageAndName}>
                    <Image
                      source={{ uri: "https://via.placeholder.com/150" }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.name}>Guardian Name</Text>
                  </View>

                  {/* Mobile and Email for Guardian */}
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Mobile</Text>
                      <Text style={styles.link}>1234567890</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.label}>Email Address</Text>
                      <Text style={styles.link}>example@email.com</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              {/* Edit Modal */}
              <EditDetailsModal
                isVisible={isEditModalVisible}
                onClose={() => setEditModalVisible(false)}
                student={student} // Pass student data to pre-fill the form
                onSave={(updatedStudent) => {
                  onEditSave(updatedStudent); // Call parent save function
                  setEditModalVisible(false);
                  onClose(); // Close detail modal after saving
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "flex-end", 
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  infoCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  imageAndName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    flex: 1,
    marginRight: 8, 
  },
  label: {
    fontSize: 12,
    color: "#9E9E9E",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  link: {
    fontSize: 14,
    color: "#007BFF", 
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
});

export default StudentDetailModal;
