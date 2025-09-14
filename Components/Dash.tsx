import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import {
  Bell,
  QrCode,
  MapPin,
  Flag,
  ClipboardList,
  Home,
  Map,
  Headphones,
  User,
  Shield,
  Navigation2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import {
  scale,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { useNavigation } from "@react-navigation/native";
// Enable Tailwind style props
cssInterop(LinearGradient, { className: "style" });

export default function Dash() {
  let [fontsLoaded] = useFonts({
    Lobster: Lobster_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: verticalScale(120) }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: scale(16),
            paddingVertical: verticalScale(10),
             marginTop: verticalScale(35),  
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(28),
              color: "#030213",
              fontFamily: "Lobster",
            }}
          >
            Yatri
          </Text>
          <TouchableOpacity onPress={() => Alert.alert("Notifications")}>
            <Bell size={scale(26)} color="#030213" />
          </TouchableOpacity>
        </View>

        {/* Digital ID Card */}
        <TouchableOpacity onPress={() => Alert.alert("Tourist Digital ID")}>
          <LinearGradient
            colors={["#3b82f6", "#2563eb"]}
            style={{
              borderRadius: moderateScale(16),
              padding: scale(16),
              marginHorizontal: scale(16),
              marginBottom: verticalScale(16),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: moderateScale(20),
                    fontWeight: "bold",
                  }}
                >
                  Tourist Digital ID
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    marginTop: verticalScale(4),
                  }}
                >
                  ID: TDI-2024-8847
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: verticalScale(6),
                  }}
                >
                  <View
                    style={{
                      width: scale(8),
                      height: scale(8),
                      borderRadius: scale(4),
                      backgroundColor: "#4ade80",
                      marginRight: scale(6),
                    }}
                  />
                  <Text style={{ color: "white" }}>Verified • Active</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: scale(10),
                  borderRadius: moderateScale(12),
                }}
              >
                <QrCode size={scale(32)} color="white" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Safety Score */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CARD" as never)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: moderateScale(16),
            marginHorizontal: scale(16),
            padding: scale(16),
            marginBottom: verticalScale(16),
            borderWidth: 1,
            borderColor: "#e5e7eb",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View>
            <Text
              style={{
                color: "#030213",
                fontSize: moderateScale(18),
                fontWeight: "600",
              }}
            >
              Safety Score
            </Text>
            <Text style={{ color: "#717182", marginTop: 4 }}>
              Current location status
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Shield size={scale(26)} color="#facc15" style={{ marginRight: 8 }} />
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: moderateScale(24),
                  fontWeight: "bold",
                  color: "#f59e0b",
                }}
              >
                75
              </Text>
              <Text style={{ color: "#717182" }}>Moderate</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SOS Button */}
        <TouchableOpacity
           onPress={() => navigation.navigate("imp" as never)}
          style={{
            backgroundColor: "#ef4444",
            width: scale(140),
            height: scale(140),
            borderRadius: scale(70),
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: verticalScale(24),
            shadowColor: "#ef4444",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: moderateScale(28),
              fontWeight: "bold",
            }}
          >
            SOS
          </Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text
          style={{
            fontSize: moderateScale(18),
            fontWeight: "600",
            color: "#030213",
            marginLeft: scale(16),
            marginBottom: verticalScale(12),
             marginTop: verticalScale(3),  
          }}
        >
          Quick Actions
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginHorizontal: scale(16),
            marginBottom: verticalScale(24),
          }}
        >
          {/* Share Live */}
          <TouchableOpacity
            onPress={() => Alert.alert("Share Live Location")}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: moderateScale(16),
              padding: scale(16),
              marginHorizontal: scale(6),
              borderWidth: 1,
              borderColor: "#d1d5db",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <MapPin size={scale(28)} color="#3b82f6" />
            <Text style={{ color: "#030213", marginTop: 6, fontWeight: "500" }}>
              Share Live
            </Text>
            <Text style={{ fontSize: 12, color: "#717182" }}>Location</Text>
          </TouchableOpacity>

          {/* Report */}
          <TouchableOpacity
            onPress={() => navigation.navigate("issue" as never)}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: moderateScale(16),
              padding: scale(16),
              marginHorizontal: scale(6),
              borderWidth: 1,
              borderColor: "#d1d5db",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Flag size={scale(28)} color="#ef4444" />
            <Text style={{ color: "#030213", marginTop: 6, fontWeight: "500" }}>
              Report
            </Text>
            <Text style={{ fontSize: 12, color: "#717182" }}>Issue</Text>
          </TouchableOpacity>

          {/* View */}
          <TouchableOpacity
            onPress={() => Alert.alert("View Itinerary")}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: moderateScale(16),
              padding: scale(16),
              marginHorizontal: scale(6),
              borderWidth: 1,
              borderColor: "#d1d5db",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <ClipboardList size={scale(28)} color="#22c55e" />
            <Text style={{ color: "#030213", marginTop: 6, fontWeight: "500" }}>
              View
            </Text>
            <Text style={{ fontSize: 12, color: "#717182" }}>Itinerary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
  style={{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: Platform.OS === "android" ? verticalScale(20) : verticalScale(28),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(20),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: verticalScale(28),
  }}
>
  {/* Home (Active) */}
  <TouchableOpacity
    style={{ alignItems: "center" }}
    onPress={() => Alert.alert("Home")}
  >
    <Home size={scale(24)} color="#3b82f6" />
    <Text
      style={{
        fontSize: moderateScale(12),
        color: "#3b82f6",
        marginTop: 4,
      }}
    >
      Home
    </Text>
  </TouchableOpacity>

  {/* Map */}
  <TouchableOpacity
    style={{ alignItems: "center" }}
    onPress={()=>navigation.navigate("mrp" as never)}
   
  >
    <Map size={scale(24)} color="#717182" />
    <Text
      style={{
        fontSize: moderateScale(12),
        color: "#717182",
        marginTop: 4,
      }}
    >
      Map
    </Text>
  </TouchableOpacity>

  {/* Follow Me */}
  <TouchableOpacity
    style={{ alignItems: "center" }}
    onPress={() => Alert.alert("Follow Me")}
  >
    <Navigation2 size={scale(24)} color="#717182" />
    <Text
      style={{
        fontSize: moderateScale(12),
        color: "#717182",
        marginTop: 4,
      }}
    >
      Follow Me
    </Text>
  </TouchableOpacity>

  {/* Support */}
  <TouchableOpacity
    style={{ alignItems: "center" }}
    onPress={() => navigation.navigate("Par" as never)}
  >
    <Headphones size={scale(24)} color="#717182" />
    <Text
      style={{
        fontSize: moderateScale(12),
        color: "#717182",
        marginTop: 4,
      }}
    >
      Support
    </Text>
  </TouchableOpacity>

  {/* Profile */}
  <TouchableOpacity
    style={{ alignItems: "center" }}
    onPress={() => Alert.alert("Profile")}
  >
    <User size={scale(24)} color="#717182" />
    <Text
      style={{
        fontSize: moderateScale(12),
        color: "#717182",
        marginTop: 4,
      }}
    >
      Profile
    </Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
}
