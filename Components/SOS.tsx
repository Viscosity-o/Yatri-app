import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AlertTriangle, Shield, Users, Building2, CheckCircle2, MapPin } from "lucide-react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default function SOSActive() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: scale(16), paddingBottom: verticalScale(60) }}>
        {/* SOS ACTIVE CARD */}
        <View style={styles.sosCard}>
          <AlertTriangle size={scale(36)} color="white" />
          <Text style={styles.sosTitle}>SOS ACTIVE</Text>
          <Text style={styles.sosSubtitle}>Emergency alert has been triggered</Text>
          <TouchableOpacity style={styles.alertTime}>
            <Text style={styles.alertTimeText}>Alert sent at 9:41 AM</Text>
          </TouchableOpacity>
        </View>

        {/* Alerts Sent To */}
        <Text style={styles.sectionTitle}>Alerts Sent To:</Text>

        <View style={styles.alertCard}>
          <Shield size={scale(28)} color="#3b82f6" />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>Police Department</Text>
            <Text style={styles.alertSubtitle}>Emergency Services</Text>
          </View>
          <CheckCircle2 size={scale(22)} color="#22c55e" />
        </View>

        <View style={styles.alertCard}>
          <Users size={scale(28)} color="#22c55e" />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>Family Contacts</Text>
            <Text style={styles.alertSubtitle}>3 contacts notified</Text>
          </View>
          <CheckCircle2 size={scale(22)} color="#22c55e" />
        </View>

        <View style={styles.alertCard}>
          <Building2 size={scale(28)} color="#a855f7" />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>Tourism Department</Text>
            <Text style={styles.alertSubtitle}>Local authorities</Text>
          </View>
          <CheckCircle2 size={scale(22)} color="#22c55e" />
        </View>

        {/* Live Location */}
        <View style={styles.liveCard}>
          <View style={styles.liveHeader}>
            <Text style={styles.alertTitle}>Live Location</Text>
            <View style={styles.sharingBadge}>
              <Text style={styles.sharingText}>SHARING ON</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MapPin size={scale(20)} color="#ef4444" />
            <View style={{ marginLeft: scale(8) }}>
              <Text style={styles.alertSubtitle}>Real-time tracking active</Text>
              <Text style={styles.liveNote}>Your location is being shared with emergency contacts</Text>
            </View>
          </View>
          <Text style={styles.updateText}>• Live updating every 30 seconds</Text>
        </View>

        {/* Emergency Buttons */}
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callText}>📞 Call Emergency Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>✖ Cancel SOS Alert</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sosCard: {
    backgroundColor: "#ef4444",
    borderRadius: moderateScale(16),
    padding: scale(20),
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  sosTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "white",
    marginTop: verticalScale(8),
  },
  sosSubtitle: {
    color: "white",
    marginTop: verticalScale(4),
  },
  alertTime: {
    marginTop: verticalScale(12),
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: moderateScale(12),
  },
  alertTimeText: {
    color: "white",
    fontSize: moderateScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginBottom: verticalScale(10),
    color: "#111",
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: moderateScale(12),
    padding: scale(14),
    marginBottom: verticalScale(10),
  },
  alertText: {
    flex: 1,
    marginLeft: scale(12),
  },
  alertTitle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#111",
  },
  alertSubtitle: {
    fontSize: moderateScale(12),
    color: "#6b7280",
  },
  liveCard: {
    backgroundColor: "#f9fafb",
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  liveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  sharingBadge: {
    backgroundColor: "#22c55e",
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: moderateScale(12),
  },
  sharingText: {
    color: "white",
    fontSize: moderateScale(10),
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveNote: {
    fontSize: moderateScale(11),
    color: "#6b7280",
  },
  updateText: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(11),
    color: "#ef4444",
  },
  callBtn: {
    backgroundColor: "#ef4444",
    borderRadius: moderateScale(12),
    padding: scale(14),
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  callText: {
    color: "white",
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#374151",
    borderRadius: moderateScale(12),
    padding: scale(14),
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  cancelText: {
    color: "white",
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
});
