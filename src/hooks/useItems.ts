import { useState } from "react";
import { type Item, ItemId } from "../App";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (text: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text,
      timestamp: Date.now(),
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (itemId: ItemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return {
    items,
    addItem,
    deleteItem,
  };
};
