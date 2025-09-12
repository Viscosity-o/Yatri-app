import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define a type for a single chat message, including a timestamp
type Message = {
  text: string;
  fromUser: boolean;
  timestamp: Date;
};

// API Key and URL for the Gemini API
// IMPORTANT: Please replace this empty string with your actual API key
const API_KEY = "";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" + API_KEY;

export default function SupportScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I am Yatri, your safety assistant. How can I help you stay safe and informed today?",
      fromUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, fromUser: true, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsSending(true);

    // Check for emergency keywords and prioritize the response
    const emergencyKeywords = ["help", "sos", "emergency", "danger", "lost"];
    const isEmergency = emergencyKeywords.some(keyword => userMessage.text.toLowerCase().includes(keyword));

    if (isEmergency) {
      const emergencyResponse = "It sounds like you need immediate help. Please contact local authorities or emergency services. For immediate assistance, dial 100 for police or 108 for medical services. Your safety is our top priority. We are also notifying your emergency contacts if you have shared them with the app.";
      const botEmergencyMessage: Message = { text: emergencyResponse, fromUser: false, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, botEmergencyMessage]);
      setIsSending(false);
      return;
    }

    // Define the system instruction to constrain the chatbot's persona and scope
    const systemInstruction = {
      parts: [
        {
          text: "You are Yatri, an AI assistant for a tourist safety app. Your purpose is to provide safety advice, emergency guidance, and answer questions about travel and the app's features. Respond concisely and do not engage in topics unrelated to tourist safety or travel. If a user asks about an unrelated topic, politely state that you can only help with travel-related inquiries."
        }
      ]
    };

    try {
      const payload = {
        contents: [
          {
            parts: [{ text: userMessage.text }],
          },
        ],
        systemInstruction: systemInstruction,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that. Please try again.";
      const botMessage: Message = { text: botResponse, fromUser: false, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        text: "There was an error connecting to the chatbot. Please check your network connection.",
        fromUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const renderMessage = (item: Message, index: number) => {
    // Format timestamp for display
    const formattedTime = item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
      <View
        key={index}
        style={[
          styles.chatBubble,
          item.fromUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={item.fromUser ? styles.userChatText : styles.botChatText}>{item.text}</Text>
        <Text style={[styles.timestamp, item.fromUser ? styles.userTimestamp : styles.botTimestamp]}>{formattedTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>yatri</Text>
      </View>

      {/* Chat Area (scrollable) */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeBox}>
          <View style={styles.botIcon}>
            <Ionicons name="chatbubble-ellipses" size={28} color="white" />
          </View>
          <Text style={styles.welcomeTitle}>Welcome to yatri Support</Text>
          <Text style={styles.welcomeText}>
            We're here to help you with any questions about your travel
            experience. How can we assist you today?
          </Text>
        </View>

        {/* Dynamic Chat Messages */}
        {messages.map((item, index) => renderMessage(item, index))}

        {isSending && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#7b2cbf" />
            <Text style={styles.typingText}>Bot is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputBar}
      >
        <TextInput
          placeholder="Type your message..."
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          editable={!isSending}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={isSending}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#e63946",
    marginLeft: 10,
  },
  chatArea: {
    flex: 1,
  },
  welcomeBox: { alignItems: "center", marginBottom: 25 },
  botIcon: {
    backgroundColor: "#7b2cbf",
    padding: 18,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  chatBubble: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#7b2cbf",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
  },
  userChatText: {
    fontSize: 14,
    lineHeight: 20,
    color: "white",
  },
  botChatText: {
    fontSize: 14,
    lineHeight: 20,
    color: "black",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  botTimestamp: {
    color: '#888',
    textAlign: 'left',
  },
  inputBar: {
    marginBottom: 35,
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#7b2cbf",
    padding: 10,
    borderRadius: 25,
    marginLeft: 8,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  typingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#888",
  },
});