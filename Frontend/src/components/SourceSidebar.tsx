import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FileText, Plus, BookOpen } from "lucide-react-native";
import { THEME } from "../constants/theme";

interface SourceSidebarProps {
  fileName?: string;
  onAddSource: () => void;
}

export const SourceSidebar = ({ fileName, onAddSource }: SourceSidebarProps) => (
  <View style={styles.sidebar}>
    <View style={styles.sectionHeader}>
      <BookOpen size={18} color={THEME.colors.accent} />
      <Text style={styles.sectionTitle}>Sources</Text>
    </View>

    <ScrollView style={styles.sourceList}>
      <View style={styles.sourceItem}>
        <FileText size={20} color={THEME.colors.textMuted} />
        <View style={styles.sourceInfo}>
          <Text style={styles.sourceName} numberOfLines={1}>
            {fileName}
          </Text>
          <Text style={styles.sourceStatus}>Indexed</Text>
        </View>
      </View>
    </ScrollView>

    <TouchableOpacity style={styles.addSourceBtn} onPress={onAddSource}>
      <Plus size={18} color={THEME.colors.surfacePaper} />
      <Text style={styles.addSourceText}>Add Source</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: THEME.colors.surfacePaper,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: "#C6B19B",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    color: THEME.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: THEME.fonts.bodyBold,
  },
  sourceList: {
    flex: 1,
  },
  sourceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: THEME.colors.surface,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    color: THEME.colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: THEME.fonts.bodyMedium,
  },
  sourceStatus: {
    color: THEME.colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    fontFamily: THEME.fonts.mono,
  },
  addSourceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: THEME.colors.accent,
    padding: 14,
    borderRadius: 16,
    marginTop: 10,
  },
  addSourceText: {
    color: THEME.colors.surfacePaper,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: THEME.fonts.bodyMedium,
  },
});
