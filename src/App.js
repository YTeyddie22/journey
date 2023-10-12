import "./App.css";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "Phone", quantity: 1, packed: true },
];

function App() {
	return (
		<div className="App">
			<Logo />
			<Form />
			<PackList />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🌴 Far Away 👜</h1>;
}
function Form() {
	return (
		<div className="add-form">
			<h3>What do you need for your trip?</h3>
		</div>
	);
}

function Item({ item }) {
	console.log(item);

	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}

function PackList() {
	return (
		<div className="list">
			<ul>
				{initialItems.map((item, index) => (
					<Item item={item} />
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
