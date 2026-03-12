import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------

function Index() {

  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
  

  const styles = makeStyles(C);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.background }}>
    <View style={styles.screen}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Order</Text>
        </View>
      </View>

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── Text area ── */}
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <TextInput
          style={styles.textBox}
          multiline
          placeholder="Text Input"
          placeholderTextColor={C.placeholder}
          textAlignVertical="top"
          autoCapitalize="sentences"
          selectionColor={C.accent}
          scrollEnabled={true}
        />
      {/* </TouchableWithoutFeedback> */}
    </View>
    </SafeAreaView>
  );
}

export default Index;

// ----------------------- StyleSheet -----------------------

const makeStyles = (C: typeof Colors.light) => StyleSheet.create({
  
  screen: {
    flex: 1,
    backgroundColor: C.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: C.text,
    letterSpacing: -0.5,
    fontFamily: 'Georgia',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 28,
  },

  // Text Box
  textBox: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 12,
    fontSize: 17,
    lineHeight: 28,
    color: C.text,
    fontFamily: 'Georgia',
  },



});

// ----------------------- /// -----------------------