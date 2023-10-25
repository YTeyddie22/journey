import { useState } from "react";
import Logo from "./Components/Logo";
import Stats from "./Components/Stats";
import PackList from "./Components/PackList";
import Form from "./Components/Form";
import "./App.css";

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

	function handleDeleteAllItems() {
		const confirmed = window.confirm(
			"Are you sure you want all items deleted?"
		);

		if (confirmed) setItem([]);
	}
	return (
		<div className="App">
			<Logo />
			<Form onAddHandler={handleAddItem} />
			<PackList
				items={item}
				onDeleteItem={handleDeleteItem}
				onUpdateItem={handleUpdateItem}
				onDeleteAllItems={handleDeleteAllItems}
			/>
			<Stats items={item} />
		</div>
	);
}

export default App;
