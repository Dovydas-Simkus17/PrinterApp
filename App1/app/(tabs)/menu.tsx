import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Pressable, ScrollView} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------


type Item = {
    id: string;
    name: string;
    allergens: string[];
};

export const startersItems: Item[] = [
    { id: '1', name: 'Bogdans Cheese Sticks', allergens: ["gluten", "dairy"] },
    { id: '2', name: 'Lithuania', allergens: ['dairy', 'european', 'gluten', 'soy'] },
    { id: '3', name: 'Worst Case Scenario', allergens: ['dairy', 'dovydas', 'React Native Expo Go', 'dairy again'] },
];

export const mainsItems: Item[] = [
    { id: '1', name: 'Dovydas Special', allergens: ["dovydas", "unknown"] },
    { id: '2', name: 'Goop Sandwich', allergens: ['bogdan', 'dovydas', 'gluten', 'soy', 'dairy'] },
    { id: '3', name: 'Anaphylactic Shock', allergens: ['its just an epipen bro'] },
    { id: '4', name: 'Kanes Rice', allergens: ['none'] },
    { id: '5', name: 'Nikkis Rice', allergens: ['kanes hair'] },
    { id: '6', name: '3 Shots of Vodka', allergens: ['dairy', 'Hangover'] },
    { id: '7', name: 'COFF', allergens: ['dovydas', 'bogdan', 'nikki', 'kane'] },
];
export const drinksItems: Item[] = [
    { id: '1', name: 'Tap Water', allergens: ['none'] },
    { id: '2', name: 'Nesquick Milkshake', allergens: ['dairy', 'gluten', 'egg'] },
    { id: '3', name: 'Iced Latte', allergens: ['dairy', 'gluten', 'egg', 'soy', 'dovydas', 'bogdan', 'ice'] },
];

export const categories = [
    { id: '1', name: 'Starters', items: startersItems},
    { id: '2', name: 'Mains', items: mainsItems },
    { id: '3', name: 'Drinks', items: drinksItems },
];

function Menu() {

  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [startersOpen, setStartersOpen] = useState(true);
  const [mainsOpen, setMainsOpen] = useState(true);
  const [drinksOpen, setDrinksOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
    


  const styles = makeStyles(C);

    

    const filteredStarters = startersItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMains = mainsItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredDrinks = drinksItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  

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
            <ScrollView>
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
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        </View>
                            
                    </View>
                        
                        <View style={[styles.category, { marginTop: 16 }]}>
                            <Pressable
                                onPress={() => setStartersOpen(!startersOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Starters
                                </Text>

                                <IconSymbol
                                    name={startersOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {startersOpen &&
                                filteredStarters.map((item) => (
                                    <View key={item.id} style={styles.box}>
                                    <Text style={styles.categoryHeader}>{item.name}</Text>
                                    <Text style={styles.categoryBody}>{item.allergens.join(", ")}</Text>
                                    </View>
                                ))
                            }


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
                            {mainsOpen &&
                                filteredMains.map((item) => (
                                    <View key={item.id} style={styles.box}>
                                        <Text style={styles.categoryHeader}>{item.name}</Text>
                                        <Text style={styles.categoryBody}>{item.allergens.join(", ")}</Text>
                                    </View>
                                ))
                            }


                            <Pressable
                                onPress={() => setDrinksOpen(!drinksOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Drinks
                                </Text>

                                <IconSymbol
                                    name={drinksOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {drinksOpen &&
                                filteredDrinks.map((item) => (
                                    <View key={item.id} style={styles.box}>
                                        <Text style={styles.categoryHeader}>{item.name}</Text>
                                        <Text style={styles.categoryBody}>{item.allergens.join(", ")}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
            </ScrollView>
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
        backgroundColor: C.accentLight,
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
		borderColor: C.border,
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