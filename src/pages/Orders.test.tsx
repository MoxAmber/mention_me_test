import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  it("renders the main page", () => {
    const { getByRole } = render(<App />);

    expect(getByRole("heading", { name: "Orders" })).toBeInTheDocument();
  });

  it("can add an order", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = render(<App />);

    const dateField = getByLabelText("Order Date");
    const amountField = getByLabelText("Order Amount");
    const shippedField = getByLabelText("Shipped?");

    await user.type(dateField, "2022-03-29");
    await user.type(amountField, "123");
    await user.click(shippedField);

    expect(dateField).toHaveValue("2022-03-29");
    expect(amountField).toHaveValue(123);
    expect(shippedField).toBeChecked();

    const submitButton = getByRole("button", { name: "Add order" });
    await user.click(submitButton);

    expect(dateField).toHaveValue("");
    expect(amountField).toHaveValue(null);
    expect(shippedField).not.toBeChecked();

    expect(getByRole("cell", { name: "2022-03-29" })).toBeInTheDocument();
  });

  it("can delete an order", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = render(<App />);

    // Create order (Usually this would probably come from a mocked API response
    // rather than being an action taken directly like this)
    const dateField = getByLabelText("Order Date");
    const amountField = getByLabelText("Order Amount");
    const shippedField = getByLabelText("Shipped?");

    await user.clear(dateField);
    await user.type(dateField, "2022-03-29");
    await user.type(amountField, "123");
    await user.click(shippedField);

    const submitButton = getByRole("button", { name: "Add order" });
    await user.click(submitButton);

    // Ensure we have a row to delete
    const orderDateCell = getByRole("cell", { name: "2022-03-29" });
    expect(orderDateCell).toBeInTheDocument();

    // Click the delete button
    const deleteButton = getByRole("button", { name: "Delete" });
    await user.click(deleteButton);

    expect(orderDateCell).not.toBeInTheDocument();
  });
});
