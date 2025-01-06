import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const EditDetailsModal = ({ isVisible, onClose, onSave, student }) => {
  const [photo, setPhoto] = useState("https://via.placeholder.com/100");
  const [firstName, setFirstName] = useState(student?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(student?.name?.split(" ")[1] || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [familyMembers, setFamilyMembers] = useState(student?.familyMembers || []);

  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    image: "https://via.placeholder.com/40",
  });

  const [showNewMemberFields, setShowNewMemberFields] = useState(false);

  // Populate fields if editing an existing student
  useEffect(() => {
    if (student) {
      setPhoto(student.photo || "https://via.placeholder.com/100");
      setFirstName(student.firstName || "");
      setLastName(student.lastName || "");
      setPhoneNumber(student.phoneNumber || "");
      setEmail(student.email || "");
      setDob(student.dob || "");
      setSelectedClass(student.class || "");
      setFamilyMembers(student.familyMembers || []);
    } else {
      // Clear fields for adding a new student
      setPhoto("https://via.placeholder.com/100");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setDob("");
      setSelectedClass("");
      setFamilyMembers([]);
    }
  }, [student]);

  // Add family member
  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, newMember]);
    setNewMember({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      image: "https://via.placeholder.com/40",
    });
    setShowNewMemberFields(false); // Hide the new member fields after adding
  };

  // Remove family member
  const removeFamilyMember = (index) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const handleSave = () => {
    const studentData = {
      photo,
      firstName,
      lastName,
      phoneNumber,
      email,
      dob,
      class: selectedClass,
      familyMembers,
    };
    onSave(studentData);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {student ? "Edit Student Details" : "Add New Student"}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Student Photo */}
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.studentPhoto} />
            </View>

            {/* Input Fields */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Rahul"
                value={firstName}
                onChangeText={setFirstName}
              />

              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Shaw"
                value={lastName}
                onChangeText={setLastName}
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: 1234567890"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: example@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Aug 22, 1998"
                value={dob}
                onChangeText={setDob}
              />

              <Text style={styles.label}>Select Class</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Class 1"
                value={selectedClass}
                onChangeText={setSelectedClass}
              />
            </View>

            {/* Family Members Section */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              Family Members
            </Text>
            {familyMembers.map((member, index) => (
              <View key={index} style={styles.familyMember}>
                <View style={styles.familyMemberDetails}>
                  <Image
                    source={{
                      uri: member.image || "https://via.placeholder.com/40",
                    }}
                    style={styles.familyMemberImage}
                  />
                  <View>
                    <Text style={styles.familyMemberText}>
                      {member.firstName} {member.lastName}
                    </Text>
                    <Text style={styles.familyMemberText}>{member.email}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFamilyMember(index)}>
                  <AntDesign name="delete" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            ))}

            {familyMembers.length > 0 && !showNewMemberFields && (
              <TouchableOpacity
              style={styles.addFamilyMemberButton}
              onPress={() => setShowNewMemberFields(true)}
            >
              <Icon name="person-add" size={20} color="#000" style={styles.icon} />
              <Text style={styles.addFamilyMemberText}>Add More</Text>
            </TouchableOpacity>
            )}

            {/* Add New Family Member Fields */}
            {(familyMembers.length === 0 || showNewMemberFields) && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex: Divya"
                  value={newMember.firstName}
                  onChangeText={(text) =>
                    setNewMember({ ...newMember, firstName: text })
                  }
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex: Shaw"
                  value={newMember.lastName}
                  onChangeText={(text) =>
                    setNewMember({ ...newMember, lastName: text })
                  }
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex: 1234567890"
                  keyboardType="numeric"
                  value={newMember.phoneNumber}
                  onChangeText={(text) =>
                    setNewMember({ ...newMember, phoneNumber: text })
                  }
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex: example@email.com"
                  keyboardType="email-address"
                  value={newMember.email}
                  onChangeText={(text) =>
                    setNewMember({ ...newMember, email: text })
                  }
                />

                <TouchableOpacity
                  style={styles.addMemberButton}
                  onPress={addFamilyMember}
                >
                  <Text style={styles.addMemberButtonText}>Save Details</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Footer Buttons */}
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
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
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  studentPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: "#f0f0f0", // Placeholder background
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  familyMember: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  familyMemberDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  familyMemberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0", // Placeholder background
    marginRight: 12,
  },
  familyMemberText: {
    fontSize: 14,
    color: "#333",
  },
  addFamilyMemberButton: {
    marginVertical: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8, 
  },
  addFamilyMemberText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  addMemberButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    alignItems: "center",
    marginTop: 8,
    width: "50%",
    marginLeft: "auto", 
  },
  addMemberButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 12,
    width: "48%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default EditDetailsModal;
