import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function YourItinerary() {
  const activities = [
    {
      time: "09:00 AM",
      title: "City Walking Tour",
      subtitle: "Tourist Information Center",
      status: "Confirmed",
      icon: <FontAwesome5 name="walking" size={20} color="#1E90FF" />,
    },
    {
      time: "01:00 PM",
      title: "Lunch at Local Restaurant",
      subtitle: "Traditional Cuisine House",
      status: "Confirmed",
      icon: <MaterialIcons name="restaurant" size={22} color="#32CD32" />,
    },
    {
      time: "03:30 PM",
      title: "Museum Visit",
      subtitle: "National Heritage Museum",
      status: "Confirmed",
      icon: <Ionicons name="location" size={20} color="#6A5ACD" />,
    },
    {
      time: "07:00 PM",
      title: "Cultural Show",
      subtitle: "Cultural Center Auditorium",
      status: "Pending",
      icon: <Ionicons name="home" size={20} color="#FFA500" />,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>My Itinerary</Text>
      </View>

      {/* Single Tab - Your Itinerary */}
      <View style={styles.tabRow}>
        <Text style={[styles.tab, styles.activeTab]}>Your Itinerary</Text>
      </View>

      {/* Section Header with Badge */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Activities</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{activities.length} Activities</Text>
        </View>
      </View>

      {/* Activities */}
      {activities.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.time}>{item.time}</Text>
          <View style={styles.row}>
            <View style={styles.iconCircle}>{item.icon}</View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {/* Status */}
              <View
                style={[
                  styles.statusBox,
                  item.status === "Confirmed" ? styles.confirmed : styles.pending,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === "Confirmed" ? { color: "green" } : { color: "orange" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Text style={styles.link}>View on Map</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.link}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },

  tabRow: { flexDirection: "row", marginBottom: 10 },
  tab: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
    paddingBottom: 5,
    marginRight: 20,
  },
  activeTab: {
    color: "#1E90FF",
    borderBottomWidth: 2,
    borderBottomColor: "#1E90FF",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  badge: {
    backgroundColor: "#E6F0FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  badgeText: { fontSize: 12, color: "#1E90FF", fontWeight: "600" },

  card: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  time: { fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#1E90FF" },
  row: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 5 },

  statusBox: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  confirmed: { backgroundColor: "#E6FFE6" },
  pending: { backgroundColor: "#FFF5E6" },
  statusText: { fontSize: 12, fontWeight: "600" },

  actions: { flexDirection: "row", justifyContent: "space-between" },
  link: { color: "#1E90FF", fontSize: 13, marginRight: 15 },
});
