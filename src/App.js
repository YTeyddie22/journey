import { useState } from "react";
import "./App.css";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "Phone", quantity: 1, packed: true },
];

function App() {
	//Lifting up state
	const [item, setItem] = useState([]);

	function handleAddItem(item) {
		setItem((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItem((items) => items.filter((item) => item.id !== id));
	}

	function handleUpdateItem(id) {
		setItem((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}
	return (
		<div className="App">
			<Logo />
			<Form onAddHandler={handleAddItem} />
			<PackList
				items={item}
				onDeleteItem={handleDeleteItem}
				onUpdateItem={handleUpdateItem}
			/>
			<Stats items={item} />
		</div>
	);
}

function Logo() {
	return <h1>🌴 Far Away 👜</h1>;
}
function Form({ onAddHandler }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function submitHandler(e) {
		e.preventDefault();
		if (!description) return;

		const newItem = {
			quantity,
			description,
			packed: false,
			id: Date.now(),
		};

		onAddHandler(newItem);

		setDescription("");
		setQuantity(1);
	}
	return (
		<form className="add-form" onSubmit={submitHandler}>
			<h3>What do you need for your trip?</h3>
			<select
				name=""
				id=""
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}>
				{Array.from({ length: 20 }, (_, index) => index + 1).map(
					(num) => (
						<option value={num} key={num}>
							{num}
						</option>
					)
				)}
			</select>

			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function Item({ item, onDeleteItem, onUpdateItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onUpdateItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function PackList({ items, onDeleteItem, onUpdateItem }) {
	return (
		<div className="list">
			<ul>
				{items.map((item, _) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onUpdateItem={onUpdateItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Stats({ items }) {
	const numItems = items.length;
	const packedItems = items.filter((item) => item.packed).length;
	const percentage = Math.round((packedItems / numItems) * 100);

	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? `You have everything to go, Bye Bye!`
					: `You have ${numItems} items on your list and you packed ${packedItems}. (${
							percentage ? percentage : "0"
					  }%)`}
			</em>
		</footer>
	);
}

export default App;
