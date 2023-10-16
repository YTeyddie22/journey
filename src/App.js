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
	return (
		<div className="App">
			<Logo />
			<Form onAddHandler={handleAddItem} />
			<PackList items={item} />
			<Stats />
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
		console.log(newItem);
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

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}

function PackList({ items }) {
	return (
		<div className="list">
			<ul>
				{items.map((item, _) => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>You have X items on your list and you packed X(X%)</em>
		</footer>
	);
}

export default App;
