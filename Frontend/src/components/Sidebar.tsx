import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { 
  MessageSquare, 
  Files,
  CloudUpload, 
  Zap,
} from "lucide-react-native";
import { THEME } from "../constants/theme";

export const Sidebar = ({ onTopicPress, onAdd, currentFile }: { onTopicPress: (topic: string) => void; onAdd: () => void; currentFile?: string | null }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Brand & Context */}
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Zap size={18} color={THEME.colors.surfacePaper} />
        </View>
        <View>
          <Text style={styles.brandText}>RagDocs</Text>
          <Text style={styles.brandSub}>RESEARCH SUITE</Text>
        </View>
      </View>

      {/* Primary Navigation */}
      <View style={styles.section}>
        <Text style={styles.upperKicker}>NAVIGATION</Text>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.activeLine} />
          <MessageSquare size={16} color={THEME.colors.accent} />
          <View>
            <Text style={[styles.navText, styles.navTextActive]}>Interactive Chat</Text>
            <Text style={styles.navSub}>CURRENT SESSION</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Source Management */}
      <View style={styles.section}>
        <Text style={styles.upperKicker}>SOURCE MANAGEMENT</Text>
        
        {currentFile ? (
          <View style={styles.sourceControl}>
            <View style={styles.sourceCard}>
              <View style={styles.sourceIconBox}>
                <Files size={14} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sourceName} numberOfLines={1}>{currentFile}</Text>
                <Text style={styles.sourceStatus}>ACTIVE • GROUNDED</Text>
              </View>
            </View>

            <View style={styles.topicContainer}>
              <Text style={styles.topicHeading}>PROMPTS FOUND</Text>
              <View style={styles.topicGrid}>
                {["System Architecture", "Security Protocols", "Compliance"].map((topic) => (
                  <TouchableOpacity key={topic} style={styles.topicChip} onPress={() => onTopicPress(topic)}>
                    <Text style={styles.topicText}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadTrigger} onPress={onAdd}>
            <View style={styles.uploadIconBox}>
              <CloudUpload size={20} color={THEME.colors.accent} />
            </View>
            <Text style={styles.uploadPrompt}>Ingest New Source</Text>
            <Text style={styles.uploadLimit}>PDF/TXT • UP TO 50MB</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "transparent",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 48,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 16,
    fontWeight: "900",
    color: THEME.colors.textPrimary,
    letterSpacing: -0.5,
    fontFamily: THEME.fonts.bodyBold,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: "800",
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
    fontFamily: THEME.fonts.mono,
  },
  section: {
    marginBottom: 40,
  },
  upperKicker: {
    fontSize: 10,
    fontWeight: "800",
    color: THEME.colors.textMuted,
    letterSpacing: 2,
    marginBottom: 20,
    fontFamily: THEME.fonts.mono,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: THEME.colors.accentLight,
  },
  activeLine: {
    position: "absolute",
    left: 0,
    width: 3,
    height: 20,
    backgroundColor: THEME.colors.accent,
    borderRadius: 2,
  },
  navText: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.textSecondary,
    fontFamily: THEME.fonts.bodyMedium,
  },
  navTextActive: {
    color: THEME.colors.textPrimary,
    fontWeight: "700",
    fontFamily: THEME.fonts.bodyBold,
  },
  navSub: {
    fontSize: 9,
    fontWeight: "800",
    color: THEME.colors.accent,
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: THEME.fonts.mono,
  },
  sourceControl: {
    gap: 24,
  },
  sourceCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: THEME.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sourceIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: THEME.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  sourceName: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
    fontFamily: THEME.fonts.bodyBold,
  },
  sourceStatus: {
    fontSize: 9,
    fontWeight: "800",
    color: THEME.colors.textMuted,
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: THEME.fonts.mono,
  },
  topicContainer: {
    gap: 12,
  },
  topicHeading: {
    fontSize: 10,
    fontWeight: "800",
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
    fontFamily: THEME.fonts.mono,
  },
  topicGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicChip: {
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  topicText: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.textSecondary,
    fontFamily: THEME.fonts.bodyMedium,
  },
  uploadTrigger: {
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.surfacePaper,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadPrompt: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
    marginBottom: 4,
    fontFamily: THEME.fonts.bodyBold,
  },
  uploadLimit: {
    fontSize: 10,
    fontWeight: "600",
    color: THEME.colors.textMuted,
    letterSpacing: 0.5,
    fontFamily: THEME.fonts.mono,
  },
});
