import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------

function Menu() {

  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;


  const styles = makeStyles(C);

  return (
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

    </View>
  );
}

export default Menu;

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