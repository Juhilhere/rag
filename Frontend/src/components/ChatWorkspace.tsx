// v2.1.0 - Editorial Redesign
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { Send } from "lucide-react-native";
import { THEME } from "../constants/theme";
import { MessageBubble } from "./MessageBubble";
import { ThinkingBubble } from "./ThinkingBubble";

export const ChatWorkspace = ({
  messages,
  question,
  setQuestion,
  onAsk,
  isThinking,
  scrollViewRef,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={[styles.headerLeft, { marginLeft: 50 }]}>
          <Text style={styles.notebookTitle}>Research Notebook #1</Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Welcome Section */}
        <View style={styles.editorialHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.kicker}>
              {(() => {
                const hour = new Date().getHours();
                if (hour < 12) return "MORNING SESSION";
                if (hour < 17) return "AFTERNOON SESSION";
                return "EVENING SESSION";
              })()}
            </Text>
            <Text style={styles.editorialTitle}>
              Researching with{"\n"}
              <Text style={{ color: THEME.colors.accent }}>RagDocs Intelligence</Text>
            </Text>
            <Text style={styles.editorialSub}>
              Your workspace for deep document exploration. Every insight here is grounded, cited, and analyzed through the lens of human inquiry.
            </Text>
          </View>

          {/* Quick Guide Cards */}
          <View style={styles.guideContainer}>
            <View style={styles.guideCard}>
              <View style={[styles.guideDot, { backgroundColor: THEME.colors.accent }]} />
              <Text style={styles.guideText}>Upload a source to begin mapping the knowledge.</Text>
            </View>
            <View style={styles.guideCard}>
              <View style={[styles.guideDot, { backgroundColor: "#7A9B84" }]} />
              <Text style={styles.guideText}>Ask questions to trigger the RAG extraction engine.</Text>
            </View>
            <View style={styles.guideCard}>
              <View style={[styles.guideDot, { backgroundColor: "#C2A15F" }]} />
              <Text style={styles.guideText}>Verified citations ensure 100% factual grounding.</Text>
            </View>
          </View>
        </View>

        {/* Message Thread */}
        <View style={styles.thread}>
          {messages.map((msg: any) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isThinking && <ThinkingBubble />}
        </View>
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
        style={styles.inputArea}
      >
        <View style={[
          styles.inputContainer,
          isFocused && { borderColor: THEME.colors.accent, shadowOpacity: 0.3 }
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Ask another question about your document..."
            placeholderTextColor={THEME.colors.textMuted}
            value={question}
            onChangeText={setQuestion}
            multiline
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !question.trim() && styles.sendBtnDisabled]}
            onPress={() => onAsk()}
            disabled={!question.trim() || isThinking}
          >
            <Send size={18} color={THEME.colors.surfacePaper} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  topBar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    backgroundColor: THEME.colors.surfacePaper,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notebookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
    fontFamily: THEME.fonts.mono,
    letterSpacing: 0.6,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: THEME.spacing.lg,
    maxWidth: Platform.OS === "web" ? 900 : "100%",
    alignSelf: "center",
    width: "100%",
  },
  editorialHeader: {
    paddingVertical: 48,
    paddingHorizontal: THEME.spacing.xl,
    backgroundColor: THEME.colors.surfacePaper,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: "#C6B19B",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 8,
  },
  headerContent: {
    marginBottom: 40,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "900",
    color: THEME.colors.accent,
    letterSpacing: 2,
    marginBottom: 16,
    fontFamily: THEME.fonts.bodyBold,
  },
  editorialTitle: {
    fontSize: 46,
    fontWeight: "400",
    color: THEME.colors.textPrimary,
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: 20,
    fontFamily: THEME.fonts.heading,
  },
  editorialSub: {
    fontSize: 18,
    lineHeight: 28,
    color: THEME.colors.textSecondary,
    maxWidth: 600,
    fontFamily: THEME.fonts.body,
  },
  guideContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 20,
  },
  guideCard: {
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 280,
    flex: 1,
    shadowColor: "#D2C2B2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  guideDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  guideText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: THEME.fonts.bodyMedium,
  },
  thread: {
    paddingHorizontal: THEME.spacing.xl,
    paddingBottom: 100,
    paddingTop: THEME.spacing.lg,
  },
  inputArea: {
    padding: Platform.OS === "web" ? THEME.spacing.xl : THEME.spacing.md,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surfacePaper,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 12,
    shadowColor: "#C6B19B",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: THEME.colors.textPrimary,
    maxHeight: 100,
    fontFamily: THEME.fonts.body,
    ...(Platform.OS === "web" && { outlineStyle: "none" } as any),
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    backgroundColor: THEME.colors.surfaceSecondary,
  },
});
