import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------

function Index() {

  // styling
  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = makeStyles(C);


  // render
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
  
});

// ----------------------- /// -----------------------