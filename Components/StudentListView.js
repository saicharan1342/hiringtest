import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Appbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import StudentItem from "./StudentItem";
import { students as initialStudents, classNames } from "./StudentListViewModel";
import EditDetailsModal from "./Editmodel";

const StudentListView = () => {
  const [students, setStudents] = useState(
    initialStudents.map((student) => ({ ...student, isSelected: false }))
  );
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const availableClasses = classNames;

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle Filter
  const handleFilter = (className) => {
    setFilterQuery(className);
    setShowFilterModal(false); // Close modal after selecting
  };

  // Filtered and searched student list
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterQuery
      ? student.classes.toLowerCase().includes(filterQuery.toLowerCase())
      : true;

    return matchesSearch && matchesFilter;
  });

  // Toggle "Select All" checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setStudents(
      students.map((student) => ({
        ...student,
        isSelected: newSelectAll,
      }))
    );
  };

  // Toggle individual student checkbox
  const handleToggleStudent = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? { ...student, isSelected: !student.isSelected }
        : student
    );

    const areAllSelected = updatedStudents.every((student) => student.isSelected);
    setSelectAll(areAllSelected);
    setStudents(updatedStudents);
  };

  // Delete selected students
  const handleDeleteSelected = () => {
    const remainingStudents = students.filter((student) => !student.isSelected);
    setStudents(remainingStudents);
    setSelectAll(false); // Reset "Select All" checkbox
  };

  // Check if any student is selected
  const isAnySelected = students.some((student) => student.isSelected);

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content
          title="🧑🏻‍🎓 Student List"
          titleStyle={{ fontSize: 18, fontWeight: "bold" }}
        />
        {showSearchBar ? (
          <Appbar.Action
            icon="close"
            onPress={() => {
              setShowSearchBar(false);
              setSearchQuery("");
            }}
          />
        ) : (
          <Appbar.Action icon="magnify" onPress={() => setShowSearchBar(true)} />
        )}
        <Appbar.Action icon="filter-variant" onPress={() => setShowFilterModal(true)} />
      </Appbar.Header>

      {/* Search Bar */}
      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      {/* Universal Checkbox Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>All Students</Text>
          <View style={styles.countContainer}>
            <Text style={styles.count}>{filteredStudents.length}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {isAnySelected && (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.invite}>Invite</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSelectAll} style={styles.selectAllContainer}>
            <View style={[styles.checkbox, selectAll && styles.checkedCheckbox]}>
              {selectAll && <Text style={styles.checkboxText}>✓</Text>}
            </View>
          </TouchableOpacity>
          {isAnySelected && (
            <TouchableOpacity onPress={handleDeleteSelected} style={styles.deleteButton}>
              <AntDesign name="delete" size={20} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Student List */}
      <ScrollView>
        {filteredStudents.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onToggle={() => handleToggleStudent(student.id)}
          />
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Class</Text>
            <FlatList
              data={availableClasses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.classOption}
                  onPress={() => handleFilter(item)}
                >
                  <Text style={styles.classText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowEditModal(true)}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <EditDetailsModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={(studentData) => {
          setStudents([...students, { ...studentData, id: students.length + 1 }]);
          setShowEditModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  countContainer: {
    marginLeft: 8,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllContainer: {
    padding: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkboxText: {
    color: "#fff",
    fontSize: 18,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#000",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  invite: {
    color: "#007BFF",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  classOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  classText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StudentListView;
