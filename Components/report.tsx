import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function ReportIssue() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const issueTypes = [
    { id: "safety", label: "Safety Concern", icon: "shield-checkmark" },
    { id: "infra", label: "Infrastructure", icon: "business" },
    { id: "service", label: "Tourist Service", icon: "people" },
    { id: "medical", label: "Medical Emergency", icon: "medkit" },
    { id: "lost", label: "Lost/Stolen Items", icon: "flag" },
    { id: "transport", label: "Transportation", icon: "bus" },
    { id: "accommodation", label: "Accommodation", icon: "home" },
    { id: "other", label: "Other", icon: "help-circle" },
  ];

  const priorities = [
    { id: "urgent", label: "Urgent" },
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ];

  const handleSend = () => {
    console.log("Issue Type:", selectedIssue);
    console.log("Priority:", selectedPriority);
    console.log("Description:", description);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={styles.headerText}>Report Issue</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Issue Type */}
        <Text style={styles.sectionTitle}>Issue Type</Text>
        <View style={styles.grid}>
          {issueTypes.map((issue) => (
            <TouchableOpacity
              key={issue.id}
              style={[
                styles.gridItem,
                selectedIssue === issue.id && styles.selectedItem,
              ]}
              onPress={() => setSelectedIssue(issue.id)}
            >
              <Ionicons
                name={issue.icon as any}
                size={24}
                color={selectedIssue === issue.id ? "white" : "#7b2cbf"}
              />
              <Text
                style={[
                  styles.gridLabel,
                  selectedIssue === issue.id && { color: "white" },
                ]}
              >
                {issue.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority */}
        <Text style={styles.sectionTitle}>Priority</Text>
        <View style={styles.priorityRow}>
          {priorities.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.priorityButton,
                selectedPriority === p.id && styles.selectedPriority,
              ]}
              onPress={() => setSelectedPriority(p.id)}
            >
              <Text
                style={[
                  styles.priorityText,
                  selectedPriority === p.id && { color: "white" },
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Describe the Issue */}
        <Text style={styles.sectionTitle}>Describe the issue</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type your issue here..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerText: { fontSize: 18, fontWeight: "600", marginLeft: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#7b2cbf",
  },
  gridLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  priorityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  priorityButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  selectedPriority: {
    backgroundColor: "#7b2cbf",
    borderColor: "#7b2cbf",
  },
  priorityText: {
    fontSize: 14,
    color: "black",
  },
  textArea: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#7b2cbf",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
