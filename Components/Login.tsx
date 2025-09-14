import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();

  // State
  const [digitalId, setDigitalId] = useState("");
  const [password, setPassword] = useState("");
  const [forgotMode, setForgotMode] = useState(false); // forgot password toggle
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Refs for OTP inputs
  const otpRefs = useRef<Array<TextInput | null>>([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // OTP animation
  useEffect(() => {
    if (showOTP) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [showOTP]);

  // Handle Login
  const handleLogin = () => {
    if (!digitalId.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both Digital ID and Password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // For demo: login directly without OTP
      navigation.navigate("Dash" as never);
    }, 1200);
  };

  // Handle Forgot → Send OTP
  const handleForgot = () => {
    if (!digitalId.trim()) {
      Alert.alert("Error", "Please enter your Digital ID");
      return;
    }
    setShowOTP(true);
  };

  // Verify OTP
  const handleVerifyOtp = (enteredOtp: string) => {
    setOtpLoading(true);

    setTimeout(() => {
      setOtpLoading(false);
      if (enteredOtp === "123456") {
        Alert.alert("Success", "OTP verified!", [
          { text: "OK", onPress: () => navigation.navigate("Dash" as never) },
        ]);
      } else {
        Alert.alert("Error", "Invalid OTP. Try again.");
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
      }
    }, 1200);
  };

  // Render OTP Inputs
  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <TextInput
        key={index}
        ref={(ref) => {
          otpRefs.current[index] = ref;
        }}
        style={[styles.otpInput, digit && styles.otpInputFilled]}
        value={digit}
        onChangeText={(text) => {
          const newOtp = [...otp];
          newOtp[index] = text;
          setOtp(newOtp);
          if (text && index < 5) otpRefs.current[index + 1]?.focus();
          if (index === 5 && text) handleVerifyOtp(newOtp.join(""));
        }}
        keyboardType="number-pad"
        maxLength={1}
        selectTextOnFocus
      />
    ));
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1974&q=80",
      }}
      style={styles.background}
    >
      <LinearGradient
        colors={["rgba(3, 2, 19, 0.85)", "rgba(3, 2, 19, 0.95)"]}
        style={styles.gradient}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>G</Text>
                </View>
                <Text style={styles.title}>Tourist Digital ID</Text>
                <Text style={styles.subtitle}>Secure Authentication Portal</Text>
                <Text style={styles.govText}>Government of India</Text>
              </View>

              {!forgotMode && !showOTP ? (
                // -------- LOGIN CARD --------
                <BlurView intensity={30} style={styles.card}>
                  <Text style={styles.cardTitle}>Secure Login</Text>

                  {/* Digital ID */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Digital ID Number</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={digitalId}
                        onChangeText={setDigitalId}
                        placeholder="Enter your Digital ID"
                        placeholderTextColor="#717182"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputIcon}>🔢</Text>
                    </View>
                  </View>

                  {/* Password */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        placeholderTextColor="#717182"
                        secureTextEntry
                      />
                      <Text style={styles.inputIcon}>🔒</Text>
                    </View>
                  </View>

                  {/* Sign In */}
                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Sign In</Text>
                    )}
                  </TouchableOpacity>

                  {/* Links */}
                  <View style={styles.footerLinks}>
                    <TouchableOpacity onPress={() => setForgotMode(true)}>
                      <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.helpText}>Need help?</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              ) : null}

              {forgotMode && !showOTP ? (
                // -------- FORGOT PASSWORD → ENTER ID --------
                <BlurView intensity={30} style={styles.card}>
                  <Text style={styles.cardTitle}>Forgot Password</Text>
                  <Text style={styles.otpSubtitle}>
                    Please enter your Digital ID to receive OTP
                  </Text>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={digitalId}
                      onChangeText={setDigitalId}
                      placeholder="Enter your Digital ID"
                      placeholderTextColor="#717182"
                      keyboardType="numeric"
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleForgot}
                  >
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setForgotMode(false)}>
                    <Text style={styles.backText}>← Back to Login</Text>
                  </TouchableOpacity>
                </BlurView>
              ) : null}

              {showOTP && (
                // -------- OTP SCREEN --------
                <Animated.View
                  style={[
                    styles.card,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                  ]}
                >
                  <Text style={styles.stepText}>Step 2 of 2</Text>
                  <Text style={styles.cardTitle}>Enter Verification Code</Text>
                  <Text style={styles.otpSubtitle}>
                    Enter the 6-digit code sent to your registered contact
                  </Text>

                  <View style={styles.otpContainer}>{renderOtpInputs()}</View>

                  <TouchableOpacity
                    style={[styles.button, otpLoading && styles.buttonDisabled]}
                    onPress={() => handleVerifyOtp(otp.join(""))}
                    disabled={otpLoading}
                  >
                    {otpLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Verify Code</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowOTP(false);
                      setForgotMode(false);
                    }}
                  >
                    <Text style={styles.backText}>← Back to Login</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  gradient: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },

  header: { alignItems: "center", marginBottom: 32 },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#030213",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#a1a1b0", marginBottom: 4 },
  govText: { fontSize: 14, color: "#717182" },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: { fontSize: 20, fontWeight: "600", color: "#030213", textAlign: "center", marginBottom: 24 },
  stepText: { fontSize: 14, color: "#717182", textAlign: "center", marginBottom: 8 },

  inputContainer: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: "500", color: "#030213", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: { flex: 1, height: 48, fontSize: 16, color: "#030213" },
  inputIcon: { fontSize: 20, marginLeft: 8 },

  button: {
    height: 48,
    backgroundColor: "#030213",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  footerLinks: { flexDirection: "row", justifyContent: "space-between" },
  linkText: { color: "#2563eb", fontWeight: "500" },
  helpText: { color: "#717182" },

  otpSubtitle: { fontSize: 14, color: "#717182", textAlign: "center", marginBottom: 20 },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#030213",
  },
  otpInputFilled: { borderColor: "#030213", backgroundColor: "#eef2ff" },

  backText: { color: "#717182", textAlign: "center", marginTop: 12 },
});

export default Login;
