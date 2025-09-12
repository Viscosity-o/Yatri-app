import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ---------------- SCORE CARD -----------------
const ScoreCard = ({
  title,
  subtitle,
  score,
  icon,
  color,
  details,
}: {
  title: string;
  subtitle: string;
  score: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  details: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand}>
      <View style={styles.card}>
        <MaterialIcons name={icon} size={26} color={color} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.score}>{score}</Text>
      </View>
      {expanded && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailsText}>{details}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ---------------- ANOMALY CARD -----------------
const AnomalyCard = ({
  title,
  subtitle,
  level,
  color,
  icon,
}: {
  title: string;
  subtitle: string;
  level: string;
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}) => (
  <View style={styles.card}>
    <MaterialIcons name={icon} size={26} color={color} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <View style={[styles.badge, { backgroundColor: color + "20" }]}>
      <Text style={[styles.badgeText, { color }]}>{level}</Text>
    </View>
  </View>
);

// ---------------- RECOMMENDATION CARD -----------------
const RecommendationCard = ({
  title,
  subtitle,
  icon,
  color,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}) => (
  <View style={styles.card}>
    <MaterialIcons name={icon} size={26} color={color} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default function SafetyDetails() {
  return (
    <ScrollView style={styles.container}>
      {/* Current Location */}
      <View style={styles.mainCard}>
        <Text style={styles.sectionTitle}>Current Location</Text>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={28} color="#3B82F6" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.locationTitle}>Downtown District</Text>
            <Text style={styles.locationSubtitle}>
              123 Main Street, Tourist Zone
            </Text>
            <Text style={styles.locationDesc}>
              Well-patrolled area with high security presence and emergency
              services nearby
            </Text>
            <Text style={styles.updated}>● Last updated 2 minutes ago</Text>
          </View>
        </View>
      </View>

      {/* Overall Score */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Safety Score Breakdown</Text>
        <Text style={styles.overallScore}>85 OVERALL</Text>
      </View>

      {/* Expandable Score Cards */}
      <ScoreCard
        title="Crime Rate"
        subtitle="Low"
        score="92"
        icon="gpp-good"
        color="#10B981"
        details="This area has very low reported incidents of theft or assault in the last 6 months."
      />
      <ScoreCard
        title="Emergency Services"
        subtitle="Available"
        score="88"
        icon="local-hospital"
        color="#06B6D4"
        details="Nearest hospital is 1.2 km away and average ambulance response time is 5 minutes."
      />
      <ScoreCard
        title="Tourist Activity"
        subtitle="High"
        score="78"
        icon="people"
        color="#F59E0B"
        details="High tourist presence may lead to occasional crowding but generally safe."
      />
      <ScoreCard
        title="Transportation"
        subtitle="Good"
        score="82"
        icon="directions-bus"
        color="#3B82F6"
        details="Frequent buses, metro, and taxis available nearby with good reliability."
      />

      {/* Current Anomalies */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
        Current Anomalies
      </Text>
      <AnomalyCard
        title="Traffic Congestion"
        subtitle="Heavy traffic reported on Main St"
        level="Low"
        color="#F59E0B"
        icon="traffic"
      />
      <AnomalyCard
        title="Large Crowd Event"
        subtitle="Festival gathering in Central Park"
        level="Medium"
        color="#F97316"
        icon="groups"
      />

      {/* Safety Recommendations */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
        Safety Recommendations
      </Text>
      <RecommendationCard
        title="Stay Alert"
        subtitle="Keep emergency contacts easily accessible"
        icon="security"
        color="#6B7280"
      />
      <RecommendationCard
        title="Avoid Large Crowds"
        subtitle="Consider alternative routes during festival hours"
        icon="directions-walk"
        color="#8B5CF6"
      />
      <RecommendationCard
        title="Share Location"
        subtitle="Keep live location sharing active with trusted contacts"
        icon="share-location"
        color="#3B82F6"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 40,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 19,
    color: "#111827",
    
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  locationSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  locationDesc: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
  updated: {
    fontSize: 11,
    color: "#059669",
    marginTop: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  overallScore: {
    fontWeight: "700",
    color: "#10B981",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  score: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  detailsBox: {
    backgroundColor: "#F9FAFB",
    borderLeftWidth: 3,
    borderLeftColor: "#3B82F6",
    padding: 12,
    marginBottom: 19,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 18,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
