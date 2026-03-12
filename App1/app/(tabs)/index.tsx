import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// ----------------------- Data -----------------------

type Item = {
	id: string;
	name: string;
	allergens: string[];
};

const items: Item[] = [
	{ id: '1', name: 'Club Sandwich', allergens: [] },
	{ id: '2', name: 'Goop Sandwich', allergens: ['dairy', 'dovydas', 'gluten', 'soy', 'bogdand'] },
];

// ----------------------- Item List Display -----------------------
function ItemRow({ item, styles }: { item: Item; styles: ReturnType<typeof makeStyles> }) {
	return (
		<View style={styles.itemRow}>
			{/* Name */}
			<Text style={styles.itemName}>{item.name}</Text>
			{/* Allergens Loop */}
			{item.allergens.length > 0 && (
				<View style={styles.allergyRow}>
					{item.allergens.map((i) => (
						<View key={i} style={styles.allergyChip}>
							<Text style={styles.allergyText}>{i}</Text>
						</View>
					))}
				</View>
			)}
			{/* Add Button */}
			<TouchableOpacity style={styles.addButton}>
				<Text style={styles.addButtonText}> + </Text>
			</TouchableOpacity>
		</View>
	);
}

// ----------------------- Page -----------------------

function Index() {

	// styling
	const colorScheme = useColorScheme();
	const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
	const styles = makeStyles(C);


	// main
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: C.background }}>
			<View style={styles.screen}>

				{/* ── Header ── */}
				<View style={styles.header}>
				<Text style={styles.headerText}>Order</Text>
				</View>

				{/* ── Divider ── */}
				<View style={styles.divider} />

				{/* ── Item List ── */}
				<FlatList

					data={items}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}

					renderItem={({ item }) => (
						<ItemRow item={item} styles={styles} />
					)}

				/>

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

	// List
	listContent: {
		paddingHorizontal: 28,
		paddingTop: 8,
		paddingBottom: 32,
	},
	itemDivider: {
		height: 1,
		backgroundColor: C.border,
	},
	itemRow: {
		paddingVertical: 14,
		gap: 6,
	},
	itemName: {
		fontSize: 16,
		fontWeight: '500',
		color: C.text,
		fontFamily: 'Georgia',
	},

	// allergy boxes
	allergyRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	allergyChip: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: C.accentLight,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: C.border,
	},
	allergyText: {
		fontSize: 10,
		color: C.inkMuted,
		fontWeight: '500',
		textTransform: 'capitalize',
		fontFamily: 'sans-serif',
	},

	// add button
	addButton: {
		position: 'absolute',
		right: 0,
		top: '50%',
		transform: [{ translateY: -12 }],
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: C.accent,
	},
	addButtonText: {
		color: C.text,
		fontSize: 16,
		fontWeight: '700',
		textAlign: 'center',
		lineHeight: 24,
	},

});

// ----------------------- /// -----------------------