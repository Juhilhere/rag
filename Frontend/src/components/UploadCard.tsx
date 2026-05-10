import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Upload, FilePlus } from "lucide-react-native";
import { THEME } from "../constants/theme";

interface UploadCardProps {
  onPress: () => void;
  isUploading: boolean;
  fileName?: string | null;
}

export const UploadCard = ({ onPress, isUploading, fileName }: UploadCardProps) => (
  <View style={styles.container}>
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      disabled={isUploading}
    >
      {isUploading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color={THEME.colors.accent} />
          <Text style={styles.loadingText}>Analyzing your sources...</Text>
        </View>
      ) : (
        <>
          <View style={styles.iconCircle}>
            <FilePlus size={32} color={THEME.colors.accent} />
          </View>
          <Text style={styles.title}>
            Add sources to get started
          </Text>
          <Text style={styles.subtitle}>
            Upload PDFs or Doc files to create your intelligent notebook.
          </Text>
          <View style={styles.button}>
            <Upload size={18} color={THEME.colors.surfacePaper} />
            <Text style={styles.buttonText}>Upload from computer</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    padding: 20,
  },
  card: {
    backgroundColor: THEME.colors.surfacePaper,
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: "#C6B19B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 2,
  },
  loadingState: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    fontWeight: "500",
    fontFamily: THEME.fonts.bodyMedium,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: THEME.colors.textPrimary,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: THEME.fonts.heading,
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    fontFamily: THEME.fonts.body,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: THEME.colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: THEME.colors.surfacePaper,
    fontSize: 15,
    fontWeight: "500",
    fontFamily: THEME.fonts.bodyMedium,
  },
});
