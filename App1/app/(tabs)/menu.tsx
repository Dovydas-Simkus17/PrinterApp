import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------

function Menu() {

  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [mainsOpen, setMainsOpen] = useState(true);
  const [sidesOpen, setSidesOpen] = useState(true);


  const styles = makeStyles(C);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.background }}>

        <View style={styles.screen}>
            

            {/* ── Header ── */}
            <View style={styles.header}>
                <View>
                <Text style={styles.headerText}>Menu</Text>
                </View>
            </View>

            {/* ── Divider ── */}
            <View style={styles.divider} />

            {/* ── Main area ── */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ marginHorizontal: 28, marginTop: 24 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ color: C.text, fontSize: 16, fontFamily: 'Georgia'}}>Add Category + </Text>
                        {/* Search Box */}
                        <View style={styles.searchContainer}>
                        <IconSymbol
                            size={18}
                            name="magnifyingglass"
                            color={C.placeholder}
                            style={styles.searchIcon}
                        />

                        <TextInput
                            style={styles.textBox}
                            placeholder="Search..."
                            placeholderTextColor={C.placeholder}
                            selectionColor={C.accent}
                        />
                        </View>
                            
                    </View>
                        
                        <View style={[styles.category, { marginTop: 16 }]}>
                            <Pressable
                                onPress={() => setMainsOpen(!mainsOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Mains
                                </Text>

                                <IconSymbol
                                    name={mainsOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {mainsOpen && (
                                <>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                </>
                            )}
                            <Pressable
                                onPress={() => setSidesOpen(!sidesOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Sides
                                </Text>

                                <IconSymbol
                                    name={sidesOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {sidesOpen && (
                                <>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                    <View style={[styles.box, {backgroundColor: C.placeholder}]}>
                                        <Text style={[styles.categoryHeader]}>Club Sandwich</Text>
                                        <Text style={[styles.categoryBody]}>Club Sandwich</Text>
                                    </View>
                                </>
                            )}
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
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
    subheaderText: {
        fontSize: 20,
        fontWeight: '700',
        color: C.text,
        letterSpacing: -0.5,
        fontFamily: 'Georgia',
    },

    category: {
        margin: 20
    },

    // Divider
    divider: {
        height: 1,
        backgroundColor: C.border,
        marginHorizontal: 28,
    },

    searchContainer: {
        position: "relative",
        width: 180,
        marginLeft: "auto",
        justifyContent: "center",
    },

    textBox: {
        height: 36,
        paddingLeft: 34,   // space for the icon
        paddingRight: 10,
        borderBottomColor: C.border,
        borderBottomWidth: 1,
        color: C.text,
    },

    searchIcon: {
        position: "absolute",
        left: 10,
        zIndex: 1,
    },

    box: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
    },

    //Text Styles

    categoryHeader: {
        fontSize: 16,
        fontFamily: 'Georgia',
        fontWeight: '700',
        padding: 10, 
        color: C.text, 
    },

    categoryBody: {
        fontSize: 16,
        fontFamily: 'Georgia',
        paddingLeft: 30, 
        color: C.text, 

    }


});

// ----------------------- /// -----------------------