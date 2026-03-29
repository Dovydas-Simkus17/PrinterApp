import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Platform, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useState} from 'react';
import { Colors } from '@/app/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useBLE }from '@/hooks/useBLE'
import { categories } from './menu';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { scan, sendCommand } = useBLE();

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

type CartEntry = {
	item: Item;
	note: string;
};


// ----------------------- Item List Display -----------------------

function ItemRow({ item, styles, onAdd }: { item: Item; styles: ReturnType<typeof makeStyles>; onAdd: (note: string) => void }) {
	
	// Popup
	const [modalVisible, setModalVisible] = useState(false);
	const [note, setNote] = useState('');

	const handleSave = () => {
		onAdd(note);
		setNote('');
		setModalVisible(false);
	};


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
							value={note}
							onChangeText={setNote}
							multiline
						/>

						{/* Save Button */}
						<View style={{ width: '100%', alignItems: 'flex-end' }}>
							<TouchableOpacity
								style={styles.modalButton}
								onPress={handleSave}
							>
								<Text style={styles.addButtonText}>Save</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			</Modal>


			
			{/* Add Button */}
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				{/* Name */}
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
					<Text style={styles.addButtonText}>+</Text>
				</TouchableOpacity>
			</View>
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
			
		</View>
	);
}

function CategoryList({ category, styles, onAdd }: { category: Category; styles: ReturnType<typeof makeStyles>; onAdd: (item: Item, note: string) => void }) {
	return (
		<View style={styles.itemRow}>

			{/* Name */}
			<View style={styles.header}>
					<Text style={styles.headerText}>{category.name}</Text>
				</View>

			{/* FlatList the items */}
			<FlatList
				data={category.items}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}

				renderItem={({ item }) => (
					<ItemRow item={item} styles={styles} onAdd={(note) => onAdd(item, note)} />
				)}

			/>
		</View>
	);
}



// ----------------------- Cart Modal -----------------------

function CartModal({ visible, cart, onClose, onRemove, onPrint, orderNo, setOrderNo, styles }: {
	visible: boolean;
	cart: CartEntry[];
	onClose: () => void;
	onRemove: (index: number) => void;
	onPrint: () => void;
	orderNo: string;
	setOrderNo: (orderNo: string) => void;
	styles: ReturnType<typeof makeStyles>;
}) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.centeredView}>
				<View style={[styles.modalView, { height: '60%' }]}>

					{/* Name */}
					<Text style={styles.headerText}>Cart</Text>
					<View style={styles.itemDivider} />

					{/* Order Number */}
					<TextInput
						style={styles.orderNumberInput}
						placeholder="Order Number..."
						value={orderNo}
						onChangeText={setOrderNo}
						multiline={false}
					/>

					{/* FlatList the items */}
					<FlatList
						data={cart}
						keyExtractor={(_, i) => String(i)}
						ItemSeparatorComponent={() => <View style={styles.itemDivider} />}

						renderItem={({ item: entry, index }) => (
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<Text style={styles.itemName}>{entry.item.name}</Text>
									<TouchableOpacity style={styles.addButton} onPress={() => onRemove(index)}>
										<Text style={styles.addButtonText}>-</Text>
									</TouchableOpacity>
								</View>
								{entry.note ? <Text style={styles.itemNote}>{entry.note}</Text> : null}
							</View>
						)}
					/>
					
					{/* buttons */}
					<View style={{ width: '100%', alignItems: 'flex-end', marginTop: 12 }}>
						<TouchableOpacity style={[styles.modalButton, {alignItems: 'flex-start'}]} onPress={onClose}>
							<Text style={styles.addButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
					<View style={{ width: '100%', alignItems: 'flex-end', marginTop: 12 }}>
						<TouchableOpacity style={styles.modalButton} onPress={onPrint}>
							<Text style={styles.addButtonText}>Print</Text>
						</TouchableOpacity>
					</View>

				</View>
			</View>
		</Modal>
	);
}



// ----------------------- Page -----------------------

function Index() {

	// styling
	const colorScheme = useColorScheme();
	const C = colorScheme === 'dark' ? Colors.dark : Colors.light;
	const styles = makeStyles(C);

	// Popup
	const [cart, setCart] = useState<CartEntry[]>([]);
	const [cartVisible, setCartVisible] = useState(false);
	const [orderNo, setOrderNo] = useState('');

	const addToCart = (item: Item, note: string) => {
		setCart((prev) => [...prev, { item, note }]);
	};
	const removeFromCart = (index: number) => {
		setCart((prev) => prev.filter((_, i) => i !== index));
	};
	const printCart = async () => {
		if (cart.length === 0) return;

		try {
			const lines = cart.map((entry, i) => {
				const note = entry.note ? `\n   Note: ${entry.note}` : '';
				return `${i + 1}. ${entry.item.name}${note}`;
			}).join('\n');

			const content = `Order ${orderNo}\n${'-'.repeat(30)}\n${lines}`;

			// generated by claude on 2026-03-13 at 7:45:00 PM ish - added platform-specific file handling for web vs native
			if (Platform.OS === 'web') {
				const blob = new Blob([content], { type: 'text/plain' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'order.txt';
				a.click();
				URL.revokeObjectURL(url);
			} else {
				const path = `${FileSystem.cacheDirectory}order.txt`;
				await FileSystem.writeAsStringAsync(path, content, {
					encoding: FileSystem.EncodingType.UTF8,
				});
				await Sharing.shareAsync(path);
			}
		} catch (e) {
			console.error('Failed to save order:', e);
		}
	};


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

				<ScrollView>
					{/* ── Category List ── */}
					{categories.map((category) => (
						<CategoryList key={category.id} category={category} styles={styles} onAdd={addToCart} />
					))}
				</ScrollView>
				<View>
					{/* ── Cart Modal ── */}
					<CartModal 
						visible={cartVisible} 
						cart={cart} onClose={() => setCartVisible(false)} 
						onRemove={removeFromCart} 
						onPrint={printCart} 
						orderNo={orderNo} 
						setOrderNo={setOrderNo} 
						styles={styles} 
					/>

					{/* ── Floating Cart Button ── */}
					<TouchableOpacity style={styles.cartButton} onPress={() => setCartVisible(true)}>
						
						{/* put icon in later */}
						<Text style={styles.headerText}> ☰ </Text>

					</TouchableOpacity>
				</View>

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
		marginVertical: 8,
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
		width: 24,
		height: 24,
		borderRadius: 10,
		backgroundColor: C.placeholder,
		justifyContent: 'center',
		alignItems: 'center',
	},	
	addButtonText: {
		color: C.text,
		fontSize: 16,
		fontWeight: '700',
		fontFamily: 'Georgia',
		textAlign: 'center',
	},

	// Modal
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		backgroundColor: C.surface,
		margin: 10,
		padding: 35,
		width: 350,
		height: 320,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: C.accent,
	},
	modalButton: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: C.accent,
		backgroundColor: C.placeholder,
		padding: 10,
		alignItems: 'flex-end',
		justifyContent: 'center',
		flexDirection: 'row',
		width: 80,
	},
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

	// Floating cart button
	cartButton: {
		position: 'absolute',
		bottom: 32,
		right: 28,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: C.placeholder,
		justifyContent: 'center',
		alignItems: 'center',
		
	},

	// Cart 
	itemNote: {
		fontSize: 12,
		color: C.inkMuted,
	},
	orderNumberInput: {
		marginVertical: 20,
		borderBottomWidth: 1,
		borderColor: C.border,
		color: C.text,
		fontFamily: 'Georgia',
		fontSize: 14,
		minHeight: 40,
		width: 130,
	},

});

// ----------------------- /// -----------------------