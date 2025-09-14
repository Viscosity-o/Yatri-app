// MapFrontPage.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  PanResponder,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Draggable sheet snap positions
const SHEET_MAX_HEIGHT = Math.round(SCREEN_HEIGHT * 0.78);
const SHEET_MID_HEIGHT = Math.round(SCREEN_HEIGHT * 0.42);
const SHEET_MIN_HEIGHT = Math.round(SCREEN_HEIGHT * 0.12);

export default function MapFrontPage() {
    const { t } = useTranslation();
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });

  const [markers, setMarkers] = useState([
    {
      id: "m-1",
      title: "Sample Site - Kochi",
      description: "Marine survey site",
      coordinate: { latitude: 9.9312, longitude: 76.2673 },
    },
  ]);

  const [query, setQuery] = useState("");
  const [locationGranted, setLocationGranted] = useState(false);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT - SHEET_MIN_HEIGHT)).current;
  const lastTranslateY = useRef(SCREEN_HEIGHT - SHEET_MIN_HEIGHT);

  const animateSheetTo = (toY: number) => {
    lastTranslateY.current = toY;
    Animated.spring(translateY, {
      toValue: toY,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 8,
      onPanResponderGrant: () => {
        translateY.setOffset(lastTranslateY.current);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        translateY.flattenOffset();
        const movedTo = lastTranslateY.current + gesture.dy;

        const distToMax = Math.abs(movedTo - (SCREEN_HEIGHT - SHEET_MAX_HEIGHT));
        const distToMid = Math.abs(movedTo - (SCREEN_HEIGHT - SHEET_MID_HEIGHT));
        const distToMin = Math.abs(movedTo - (SCREEN_HEIGHT - SHEET_MIN_HEIGHT));

        const minDist = Math.min(distToMax, distToMid, distToMin);

        if (minDist === distToMax) {
          animateSheetTo(SCREEN_HEIGHT - SHEET_MAX_HEIGHT);
        } else if (minDist === distToMid) {
          animateSheetTo(SCREEN_HEIGHT - SHEET_MID_HEIGHT);
        } else {
          animateSheetTo(SCREEN_HEIGHT - SHEET_MIN_HEIGHT);
        }
      },
    })
  ).current;

  useEffect(() => {
    animateSheetTo(SCREEN_HEIGHT - SHEET_MID_HEIGHT);

    // Request location permission and track
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required to track your position.");
        return;
      }
      setLocationGranted(true);

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          setRegion((prev) => ({
            ...prev,
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }));
        }
      );
    })();

    return () => Keyboard.dismiss();
  }, []);

  // --- Google Places API integration placeholder ---
  // Replace 'YOUR_GOOGLE_API_KEY_HERE' with your actual API key
  const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY_HERE";
  // You can use this key with Google Places Autocomplete, fetch requests, etc.

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE as any}
        style={styles.map}
        region={region}
        showsUserLocation={locationGranted}
        showsMyLocationButton={true}
      >
        {markers.map((m) => (
          <Marker key={m.id} coordinate={m.coordinate} title={m.title} description={m.description} />
        ))}
      </MapView>

      {/* Fixed Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#5f6368" />
          <TextInput
            placeholder="Search places, sample ID, or coordinates"
            placeholderTextColor="#6b6f76"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <TouchableOpacity style={styles.micButton} activeOpacity={0.7}>
            <Entypo name="mic" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          Google API Key: {GOOGLE_API_KEY}
        </Text>
      </View>

      {/* Draggable Sheet */}
      <Animated.View
        style={[styles.sheetContainer, { transform: [{ translateY: translateY }] }]}
        {...panResponder.panHandlers}
      >
        <SheetContent />
      </Animated.View>
    </SafeAreaView>
  );
}

const SheetContent = () => (
  <View style={styles.sheetContent}>
    <View style={styles.sheetHandleRow}>
      <View style={styles.sheetHandle} />
      <Text style={styles.sheetTitle}>Site details</Text>
    </View>

    <View style={styles.detailCard}>
      <View style={styles.siteHeader}>
        <Text style={styles.siteTitle}>Kochi Marine Survey</Text>
        <Text style={styles.siteSub}>RV Explorer • Campaign: Monsoon 2025</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricVal}>9.9312° N</Text>
          <Text style={styles.metricLabel}>Lat</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricVal}>76.2673° E</Text>
          <Text style={styles.metricLabel}>Lon</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricVal}>12 m</Text>
          <Text style={styles.metricLabel}>Depth</Text>
        </View>
      </View>

      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: "#E8F5E9" }]}>
          <Text style={{ color: "#2E7D32", fontWeight: "600" }}>QC PASS</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: "#E3F2FD" }]}>
          <Text style={{ color: "#1565C0", fontWeight: "600" }}>eDNA Ready</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: "#FFF3E0" }]}>
          <Text style={{ color: "#EF6C00", fontWeight: "600" }}>2 Images</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Open dataset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton}>
          <Text style={styles.ghostButtonText}>Navigate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.smallInfo}>
        <Text style={styles.smallHeading}>Notes</Text>
        <Text style={styles.smallText}>
          This site shows mixed benthic fauna, moderate turbidity. eDNA result pending taxonomic assignment.
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7fb" },
  map: { ...StyleSheet.absoluteFillObject },
  searchWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 14 : 8,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
   marginTop:55,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: "#1b1b1b" },
  micButton: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1a73e8",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetContainer: { position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 30 },
  sheetContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -6 },
    elevation: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sheetHandleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sheetHandle: { width: 44, height: 6, borderRadius: 3, backgroundColor: "#e0e0e0", alignSelf: "center", marginRight: 12 },
  sheetTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  detailCard: { marginTop: 6 },
  siteHeader: { marginBottom: 12 },
  siteTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  siteSub: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  metricsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  metric: { alignItems: "center", flex: 1 },
  metricVal: { fontWeight: "700", fontSize: 15, color: "#111827" },
  metricLabel: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  badgeRow: { flexDirection: "row", marginTop: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, marginRight: 8 },
  actionRow: { flexDirection: "row", marginTop: 14, justifyContent: "space-between" },
  primaryButton: { backgroundColor: "#1a73e8", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 10, flex: 1, marginRight: 8, alignItems: "center" },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  ghostButton: { borderWidth: 1, borderColor: "#d1d5db", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center", width: 110 },
  ghostButtonText: { color: "#111827", fontWeight: "700" },
  smallInfo: { marginTop: 12 },
  smallHeading: { fontWeight: "700", fontSize: 13, marginBottom: 6 },
  smallText: { color: "#374151", lineHeight: 18 },
});
