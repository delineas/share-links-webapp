import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

describe("App", () => {
  test("Show correct url", async () => {
    render(<App />);

    await userEvent.type(
      screen.queryByPlaceholderText("Tu URL para compartir aquí"),
      "https://perico.com"
    );

    expect(screen.getByTestId("input-url")).not.toHaveClass("error");


  });

  test("Show error url", async () => {
    render(<App />);

    await userEvent.type(screen.getByRole("textbox"), "hts://perico.com");

    expect(screen.getByRole("textbox")).toHaveClass("error");

  });
});
