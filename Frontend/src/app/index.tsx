import React, { useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import { InstrumentSerif_400Regular } from "@expo-google-fonts/instrument-serif";
import { SpaceMono_400Regular } from "@expo-google-fonts/space-mono";
import * as DocumentPicker from "expo-document-picker";

import { THEME } from "../constants/theme";
import { MainLayout } from "../components/MainLayout";
import { Sidebar } from "../components/Sidebar";
import { ChatWorkspace } from "../components/ChatWorkspace";
import { uploadDocument, askQuestion } from "../services/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  sources?: any[];
  timestamp?: string;
}

export default function Index() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    InstrumentSerif_400Regular,
    SpaceMono_400Regular,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={THEME.colors.accent} />
      </View>
    );
  }

  const handleAddSource = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "text/csv"],
      });

      if (!result.canceled) {
        const pickedFile = result.assets[0];
        setCurrentFile(pickedFile.name);

        setIsThinking(true);
        const uploadRes = await uploadDocument(pickedFile);
        const nextCollectionName = uploadRes?.data?.collectionName;

        if (!nextCollectionName) {
          throw new Error("Upload succeeded but collectionName was missing in response.");
        }

        setCollectionName(nextCollectionName);
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setIsThinking(false);
    }
  };

  const handleAsk = async (q?: string) => {
    const questionToAsk = q || question;
    if (!questionToAsk.trim() || isThinking) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: Date.now().toString(),
      text: questionToAsk,
      sender: "user",
      timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsThinking(true);

    // Scroll to end
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const response = await askQuestion(questionToAsk, collectionName || "");
      
      const botMessageId = (Date.now() + 1).toString();
      const fullText = response.answer;
      
      // Initialize empty bot message
      setMessages(prev => [...prev, {
        id: botMessageId,
        text: "",
        sender: "bot",
        sources: response.source || [],
      }]);

      // Stream text
      let currentText = "";
      const words = fullText.split(" ");
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => prev.map(m => m.id === botMessageId ? { ...m, text: currentText } : m));
        await new Promise(resolve => setTimeout(resolve, 30));
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }

    } catch (err) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process that. Please ensure your document is indexed correctly.",
        sender: "bot",
        sources: [],
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleTopicPress = (topic: string) => {
    const q = `Can you explain the "${topic}" section of this document?`;
    setQuestion(q);
    // Use the functional version of setQuestion or a temporary variable to call handleAsk
    setTimeout(() => handleAsk(q), 0);
  };

  return (
    <View style={styles.container}>
      <MainLayout
        leftPanel={<Sidebar onTopicPress={handleTopicPress} onAdd={handleAddSource} currentFile={currentFile} />}
        centerPanel={
          <ChatWorkspace 
            messages={messages}
            question={question}
            setQuestion={setQuestion}
            onAsk={handleAsk}
            isThinking={isThinking}
            scrollViewRef={scrollViewRef}
          />
        }
        rightPanel={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});
