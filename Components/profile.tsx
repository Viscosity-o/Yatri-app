// ProfileScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { LogOut, Globe, Mic, Volume2, MapPin, Database } from "lucide-react-native";
import i18n from "../i18n"; // your i18n config file

export default function ProfileScreen() {
  const [voiceCommand, setVoiceCommand] = useState(true);
  const [tts, setTts] = useState(false);
  const [tracking, setTracking] = useState(true);

  // All 15 languages
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
    { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "ml", label: "മലയാളം (Malayalam)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
    { code: "ur", label: "اردو (Urdu)" },
    { code: "as", label: "অসমীয়া (Assamese)" },
    { code: "ne", label: "नेपाली (Nepali)" },
    { code: "si", label: "සිංහල (Sinhala)" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
           <View style={[styles.card, { marginBottom: 50, marginTop: 50 }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>Tourist User</Text>
          <Text style={styles.userId}>Tourist ID: TID-2024-789</Text>
          <Text style={styles.verified}>✔ Verified Tourist</Text>
        </View>
      </View>
    </View>
        {/* Digital ID Card */}
      <View style={[styles.card, { marginTop: -25 }]}>
  <Text style={styles.sectionTitle}>Digital ID Card</Text>
  <View style={styles.idCard}>
    <Text style={styles.idText}>Tourist ID</Text>
    <Text style={styles.idNumber}>TID-2024-789</Text>
    <Text style={styles.idText}>Name: Tourist User</Text>
    <Text style={styles.idText}>Valid Until: Dec 2024</Text>
  </View>
</View>

        {/* Language Preferences */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Language Preferences</Text>
          {languages.map((lang, index) => (
            <TouchableOpacity
              key={index}
              style={styles.langBtn}
              onPress={() => i18n.changeLanguage(lang.code)}
            >
              <Globe size={20} color="#555" />
              <Text style={styles.langText}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Accessibility */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Accessibility</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Mic size={20} color="#28a745" />
              <Text style={styles.switchText}>Voice Commands</Text>
            </View>
            <Switch
              value={voiceCommand}
              onValueChange={setVoiceCommand}
              thumbColor={voiceCommand ? "#28a745" : "#ccc"}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Volume2 size={20} color="#007bff" />
              <Text style={styles.switchText}>Text-to-Speech</Text>
            </View>
            <Switch
              value={tts}
              onValueChange={setTts}
              thumbColor={tts ? "#007bff" : "#ccc"}
            />
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <MapPin size={20} color="#ff5722" />
              <Text style={styles.switchText}>Real-time Tracking</Text>
            </View>
            <Switch
              value={tracking}
              onValueChange={setTracking}
              thumbColor={tracking ? "#ff5722" : "#ccc"}
            />
          </View>

          <TouchableOpacity style={styles.optionBtn}>
            <Database size={20} color="#555" />
            <Text style={styles.switchText}>Data & Privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, marginBottom: 5 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  userName: { fontSize: 18, fontWeight: "bold" },
  userId: { fontSize: 14, color: "#555" },
  verified: { color: "green", marginTop: 4, fontWeight: "500" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  idCard: {
    backgroundColor: "#0066ff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  idText: { color: "#fff", fontSize: 14, marginTop: 2 },
  idNumber: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  langText: { marginLeft: 10, fontSize: 15 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: { flexDirection: "row", alignItems: "center" },
  switchText: { marginLeft: 10, fontSize: 15 },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginBottom: 60,
  },
  logoutText: { color: "#fff", fontSize: 16, marginLeft: 8 },
});
