import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("<App />", () => {
  //   test("should render", () => {
  //     render(<App />);
  //     expect(screen.getByText("Mi prueba tecnica")).toBeDefined();
  //   });

  test("Should add and remove an item", async () => {
    const user = userEvent.setup();
    render(<App />);
    // Buscar el input
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();

    // Buscar el formulario
    const form = screen.getByRole("form");
    expect(form).toBeDefined();
    const button = form.querySelector("button");
    expect(button).toBeDefined();

    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    await user.click(button!);

    // Ver que el elemento se agrega a la lista
    const list = screen.getByRole("list");
    expect(list).toBeDefined();
    expect(list.childNodes.length).toBe(1);

    screen.debug(list);

    // Ver que el elemento se elimina de la lista
    const itemToDelete = screen.getByText(randomText);
    expect(itemToDelete).toBeDefined();

    const deleteButton = itemToDelete.querySelector("button");
    expect(deleteButton).toBeDefined();

    await user.click(deleteButton!);
    const noResults = screen.getByText("No hay elementos en la lista.");
    expect(noResults).toBeDefined();

    screen.debug();
  });
});
