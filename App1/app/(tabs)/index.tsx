import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useState} from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { categories } from './menu';

// ----------------------- Data -----------------------

type Item = {
    id: string;
    name: string;
    allergens: string[];
};

type Category = {
	id: string;
	name: string;
	items: Item[];
};

// ----------------------- Item List Display -----------------------

function ItemRow({ item, styles }: { item: Item; styles: ReturnType<typeof makeStyles> }) {

	// Popup
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.itemRow}>


			{/* ── Popup ── */}
				<Modal

					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {setModalVisible(!modalVisible);}}>

					{/* displayed content */}
					<View style={styles.centeredView}>
						<View style={styles.modalView}>

							{/* Item */}
							<Text style={styles.headerText}>{item.name}</Text>

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

							{/* Notes input */}
							<TextInput
								style={styles.notesInput}
								placeholder="Add a note..."
								multiline
							/>

							{/* Add Button */}
							<View style={{ width: '100%', alignItems: 'flex-end' }}>
								<TouchableOpacity
									style={styles.modalButton}
									onPress={() => setModalVisible(false)}
								>
									<Text style={styles.addButtonText}>Save</Text>
								</TouchableOpacity>
							</View>

						</View>
					</View>
				</Modal>


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
				<Text style={styles.addButtonText} onPress={() => setModalVisible(true)}>
					+ 
				</Text>
			</TouchableOpacity>
		</View>
	);
}

function CategoryList({ category, styles }: { category: Category; styles: ReturnType<typeof makeStyles> }) {
	return (
		<View style={styles.itemRow}>
			{/* Name */}
			<View style={styles.header}>
					<View>
						<Text style={styles.headerText}>{category.name}</Text>
					</View>
				</View>
			{/* FlatList the items */}
			<FlatList
				data={category.items}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}

				renderItem={({ item }) => (
					<ItemRow item={item} styles={styles} />
				)}

			/>
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
				<	Text style={styles.headerText}>Order</Text>
				</View>

				{/* ── Divider ── */}
				<View style={styles.divider} />

				


				{/* ── Category List ── */}
				{categories.map((category) => (
					<CategoryList key={category.id} category={category} styles={styles} />
				))}

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
		marginVertical: 8,
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
		borderRadius: 5,
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
		borderRadius: 10,
		backgroundColor: C.accent,
	},
	addButtonText: {
		color: C.text,
		fontSize: 16,
		fontWeight: '700',
		textAlign: 'center',
		lineHeight: 24,
	},

	// Modal
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	// Replace modalView style
	modalView: {
		backgroundColor: C.surface,
		margin: 10,
		padding: 35,
		width: '92%',
		height: '30%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: C.accent,
	},
	// Modal button
	modalButton: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: C.accent,
		backgroundColor: C.accent,
		padding: 10,
		fontFamily: 'sans-serif',
	},
	// Modal input
	notesInput: {
		marginVertical: 28,
		borderWidth: 3,
		borderRadius: 5,
		borderColor: C.accent,
		padding: 10,
		color: C.text,
		fontFamily: 'Georgia',
		fontSize: 14,
		minHeight: 60,
		textAlignVertical: 'top',
	},

});

// ----------------------- /// -----------------------