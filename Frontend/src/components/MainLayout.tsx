import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  useWindowDimensions, 
  TouchableOpacity, 
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { THEME } from "../constants/theme";
import { X, PanelLeft } from "lucide-react-native";

interface MainLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export const MainLayout = ({ leftPanel, centerPanel, rightPanel }: MainLayoutProps) => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    if (isDesktop) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  // Pass toggleSidebar to centerPanel if needed via cloning or context (simplified here by adding the button in MainLayout)
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[THEME.colors.background, "#F1E4D3", "#FAF4EC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {/* Desktop Sidebar */}
      {isDesktop && isSidebarVisible && (
        <View style={styles.leftPanel}>{leftPanel}</View>
      )}

      {/* Mobile Sidebar (Modal) */}
      <Modal
        visible={isMobileMenuOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMobileMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.mobileSidebar}>
            <View style={styles.mobileSidebarHeader}>
              <TouchableOpacity onPress={() => setIsMobileMenuOpen(false)}>
                <X size={24} color={THEME.colors.textPrimary} />
              </TouchableOpacity>
            </View>
            {leftPanel}
          </View>
          <TouchableOpacity 
            style={styles.modalCloseArea} 
            onPress={() => setIsMobileMenuOpen(false)} 
          />
        </View>
      </Modal>

      {/* Main Content Area */}
      <View style={styles.centerPanel}>
        {/* Toggle Button in Header Style */}
        <View style={styles.headerToggle}>
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={toggleSidebar}
          >
            <PanelLeft size={20} color={THEME.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        {centerPanel}
      </View>

      {isDesktop && rightPanel && <View style={styles.rightPanel}>{rightPanel}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: THEME.colors.background,
    position: "relative",
  },
  leftPanel: {
    width: 320,
    backgroundColor: THEME.colors.surfacePaper,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
  },
  centerPanel: {
    flex: 1,
    backgroundColor: "transparent",
  },
  rightPanel: {
    width: 300,
    backgroundColor: THEME.colors.surfacePaper,
    padding: THEME.spacing.lg,
    gap: THEME.spacing.lg,
    borderLeftWidth: 1,
    borderLeftColor: THEME.colors.border,
  },
  headerToggle: {
    position: "absolute",
    left: 20,
    top: 18,
    zIndex: 100,
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfacePaper,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: "#C8B5A2",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(88, 72, 55, 0.25)",
  },
  mobileSidebar: {
    width: 300,
    height: "100%",
    backgroundColor: THEME.colors.surfacePaper,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
  },
  mobileSidebarHeader: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  modalCloseArea: {
    flex: 1,
  },
});
