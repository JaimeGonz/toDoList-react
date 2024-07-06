import { useState } from "react";
import "./App.css";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId;
  text: string;
  timestamp: number;
}

// const INITIAL_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     text: "Ducharme al terminar la clase",
//     timestamp: Date.now(),
//   },
//   {
//     id: crypto.randomUUID(),
//     text: "Ver que voy a cenar",
//     timestamp: Date.now(),
//   },
// ];

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => [...prevItems, newItem]);
    input.value = "";
  };

  const createHandleDeleteItem = (itemId: ItemId) => () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <main>
      <aside>
        <h1>Mi prueba tecnica</h1>
        <h2>Agregar y eliminar elementos de una lista</h2>
        <form
          aria-label="Formulario para agregar elementos a una lista"
          onSubmit={handleSubmit}
        >
          <label>
            Elemento a introducir:
            <input
              name="item"
              type="text"
              required
              placeholder="Ir a comprar pan"
            />
          </label>
          <button type="submit">Agregar elemento a la lista</button>
        </form>
      </aside>
      <section>
        <h2>Lista de cosas por hacer</h2>
        {items.length ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.text}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={createHandleDeleteItem(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <strong>No hay elementos en la lista.</strong>
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
