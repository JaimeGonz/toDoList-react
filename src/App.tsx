import "./App.css";
import { Item } from "./components/Item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
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
  const { items, addItem, deleteItem } = useItems();

  useSEO({
    title: `(${items.length}) Prueba tecnica React`,
    description: "Agregar y eliminar elementos de una lista",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    addItem(input.value);
    input.value = "";
  };

  const createHandleDeleteItem = (id: ItemId) => () => {
    deleteItem(id);
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
              <Item
                key={item.id}
                {...item}
                handleClick={createHandleDeleteItem(item.id)}
              />
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
