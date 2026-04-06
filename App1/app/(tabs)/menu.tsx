import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Pressable, ScrollView} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Colors } from '@/hooks/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Page -----------------------


type Item = {
    id: string;
    name: string;
    allergens: string[];
};

export const afternoonTeaItems: Item[] = [
    { id: '1', name: 'Savoury scone', allergens: ['Savoury'] },
    { id: '2', name: 'Quiche', allergens: ['Savoury'] },
    { id: '3', name: 'Sausage roll', allergens: ['Savoury'] },
    { id: '4', name: 'Selection of Sandwiches', allergens: ['Savoury'] },
    { id: '5', name: 'Rock cake', allergens: ['Sweet'] },
    { id: '6', name: 'French Madeleine', allergens: ['Sweet'] },
    { id: '7', name: 'Macaron', allergens: ['Sweet'] },
    { id: '8', name: 'Cupcake', allergens: ['Sweet'] },
    { id: '9', name: 'Tea / Coffe Pot', allergens: ['Drinks'] },
];

export const mainsItems: Item[] = [
    { id: '1', name: 'Soup', allergens: [] },
    { id: '2', name: 'Quiche', allergens: [] },
    { id: '3', name: 'Sandwich', allergens: [] },
    { id: '4', name: 'Toastie', allergens: [] },
    { id: '5', name: 'Panini', allergens: [] },
    { id: '6', name: '3 Cheese Toastie', allergens: ['cheddar', 'mozzarella','hard cheese'] },
    { id: '7', name: 'Chicken Fajita Wrap', allergens: ['chicken','roast pepper','red onion','cheese'] },
    { id: '8', name: 'Poached Eggs', allergens: ['Bagel / Sourdough', 'addOns: beans, mushrooms, bacon, avocado'] },
    { id: '9', name: 'Open Sourdough Bread Brie and Cranberry Sandwich', allergens: ['dovydas', 'bogdan', 'nikki', 'kane'] },
    { id: '10', name: 'Home Made Granola', allergens: ["granola with Greek yogurt","seasonal fruit","maple syrup"] },
];
export const specialsItems: Item[] = [
    { id: '1', name: 'Egg, cheese and bacon loaded bagel', allergens: [] },
    { id: '2', name: 'Pulled pork bagel', allergens: [] },

];
export const addOnsItems: Item[] = [
    { id: '1', name: 'Fillings', allergens: ['Sweet Chili Chicken','BBQ Chicken',"cheese","tuna","chicken mayo","BLT","ham"] },
    { id: '2', name: 'AddOns', allergens: ['onion', 'sweetcorn', 'pineapple'] },
    { id: '3', name: 'Iced Latte', allergens: ['dairy', 'gluten', 'egg', 'soy', 'dovydas', 'bogdan', 'ice'] },
];
export const drinksItems: Item[] = [
    { id: '1', name: 'Tap Water', allergens: ['none'] },
    { id: '2', name: 'Nesquick Milkshake', allergens: ['dairy', 'gluten', 'egg'] },
    { id: '3', name: 'Iced Latte', allergens: ['dairy', 'gluten', 'egg', 'soy', 'dovydas', 'bogdan', 'ice'] },
];

export const categories = [
    { id: '1', name: 'Mains', items: mainsItems },
    { id: '2', name: 'Specials', items: specialsItems },
    { id: '3', name: 'Drinks', items: drinksItems },
    { id: '4', name: 'Add Ons', items: addOnsItems },
    { id: '5', name: 'Afternoon Tea', items: afternoonTeaItems },
];

function Menu() {

  const colorScheme = useColorScheme();
  const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [afternoonTeasOpen, setAfternoonTeasOpen] = useState(true);
  const [specialsOpen, setSpecialsOpen] = useState(true);
  const [addOnsOpen, setAddOnsOpen] = useState(true);
  const [mainsOpen, setMainsOpen] = useState(true);
  const [drinksOpen, setDrinksOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
    


  const styles = makeStyles(C);

    

    const filteredAfternoonTea = afternoonTeaItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMains = mainsItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredDrinks = drinksItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAddOns = addOnsItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSpecials = specialsItems.filter(item =>
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
                            <Pressable
                                onPress={() => setSpecialsOpen(!specialsOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Specials
                                </Text>

                                <IconSymbol
                                    name={specialsOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {specialsOpen &&
                                filteredSpecials.map((item) => (
                                    <View key={item.id} style={styles.box}>
                                        <Text style={styles.categoryHeader}>{item.name}</Text>
                                        <Text style={styles.categoryBody}>{item.allergens.join(", ")}</Text>
                                    </View>
                                ))
                            }
                            <Pressable
                                onPress={() => setAddOnsOpen(!addOnsOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Add-Ons
                                </Text>

                                <IconSymbol
                                    name={addOnsOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {addOnsOpen &&
                                filteredAddOns.map((item) => (
                                    <View key={item.id} style={styles.box}>
                                        <Text style={styles.categoryHeader}>{item.name}</Text>
                                        <Text style={styles.categoryBody}>{item.allergens.join(", ")}</Text>
                                    </View>
                                ))
                            }

                            <Pressable
                                onPress={() => setAfternoonTeasOpen(!afternoonTeasOpen)}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}
                            >
                                <Text style={[styles.subheaderText, { paddingVertical: 10 }]}>
                                    Afternoon Teas
                                </Text>

                                <IconSymbol
                                    name={afternoonTeasOpen ? "chevron.down" : "chevron.right"}
                                    size={18}
                                    color={C.text}
                                />
                            </Pressable>
                            {afternoonTeasOpen &&
                                filteredAfternoonTea.map((item) => (
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