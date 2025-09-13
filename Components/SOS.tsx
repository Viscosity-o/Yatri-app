import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera} from "expo-camera";

import {
  AlertTriangle,
  Shield,
  Users,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Audio } from "expo-av";
// Define types for Camera ref
type CameraType = {
  recordAsync: (options: {
    maxDuration: number;
    quality: string;
  }) => Promise<{ uri: string }>;
  stopRecording: () => void;
} | null;

export default function SOSActive() {
  const cameraRef = useRef<CameraType>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
         const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

        // Microphone (Audio) permission
        const { status: audioStatus } = await Audio.requestPermissionsAsync();

        // Media Library permission
        const mediaPerm = await MediaLibrary.requestPermissionsAsync();
        const mediaStatus = mediaPerm.status
        
        setHasPermission(
          cameraStatus === "granted" && 
          audioStatus === "granted" && 
          mediaStatus === "granted"
        );
      } catch (error) {
        console.error("Permission error:", error);
        setHasPermission(false);
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const setupRecording = async () => {
      if (hasPermission && !isRecording) {
        await startRecording();
      }
    };

    setupRecording();

    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [hasPermission]);

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      
      const video = await cameraRef.current.recordAsync({
        maxDuration: 60,
        quality: "720p",
      });

      await MediaLibrary.createAssetAsync(video.uri);
      Alert.alert("Recording saved", "Video saved to gallery.");
    } catch (e) {
      console.warn("Recording error:", e);
      Alert.alert("Error", "Could not start or save the recording.");
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  // While permissions are loading
  if (hasPermission === null) {
    return <View />;
  }

  // If permissions are not granted, show a button to request them
  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera, microphone, and storage access are needed for SOS recording.
        </Text>
        <Button onPress={() => setHasPermission(null)} title="Grant Permissions" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Hidden camera for recording - Using a different approach */}
     

      <ScrollView
        contentContainerStyle={{
          padding: scale(16),
          paddingBottom: verticalScale(60),
        }}
      >
        {/* SOS ACTIVE CARD */}
        <View style={styles.sosCard}>
          <AlertTriangle size={scale(36)} color="white" />
          <Text style={styles.sosTitle}>SOS ACTIVE</Text>
          <Text style={styles.sosSubtitle}>
            Emergency alert has been triggered
          </Text>
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
              <Text style={styles.alertSubtitle}>
                Real-time tracking active
              </Text>
              <Text style={styles.liveNote}>
                Your location is being shared with emergency contacts
              </Text>
            </View>
          </View>
          <Text style={styles.updateText}>
            • Live updating every 30 seconds
          </Text>
        </View>

        {/* Emergency Buttons */}
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callText}>📞 Call Emergency Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={stopRecording}>
          <Text style={styles.cancelText}>✖ Cancel SOS Alert</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hiddenCamera: {
    width: 1,
    height: 1,
    position: "absolute",
    top: -1000,
    overflow: "hidden",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  permissionText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
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