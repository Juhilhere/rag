import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Settings, Share2, User } from "lucide-react-native";
import { THEME } from "../constants/theme";

export const Header = () => (
  <View style={styles.header}>
    <View style={styles.left}>
      <Text style={styles.title}>RagDocs</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Experimental</Text>
      </View>
    </View>
    <View style={styles.right}>
      <TouchableOpacity style={styles.iconBtn}>
        <Share2 size={20} color={THEME.colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn}>
        <Settings size={20} color={THEME.colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBtn}>
        <User size={20} color={THEME.colors.surfacePaper} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: THEME.colors.surfacePaper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    color: THEME.colors.textPrimary,
    fontFamily: THEME.fonts.heading,
  },
  badge: {
    backgroundColor: THEME.colors.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: THEME.colors.accent,
  },
  badgeText: {
    fontSize: 11,
    color: THEME.colors.accent,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: THEME.fonts.bodyMedium,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
