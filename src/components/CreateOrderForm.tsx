import { FC, useState, FormEvent } from "react";

interface CreateOrderFormProps {
  createOrder: (values: {
    date: string;
    amount: string;
    shipped: boolean;
  }) => void;
}

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ createOrder }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [shipped, setShipped] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent reloading the page on submit

    createOrder({ date, amount, shipped });

    // Reset value state
    setDate("");
    setAmount("");
    setShipped(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="order-date" className="form-label">
          Order Date
        </label>
        <input
          id="order-date"
          type="date"
          name="date"
          className="form-control"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <label htmlFor={"order-amount"} className="form-label">
          Order Amount
        </label>
        <input
          id="order-amount"
          name="amount"
          type="number"
          className="form-control"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          id="order-shipped"
          type="checkbox"
          className="form-check-input"
          name="shipped"
          checked={shipped}
          onChange={(event) => setShipped(event.target.checked)}
        />
        <label htmlFor="order-shipped" className="form-check-label">
          Shipped?
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add order
      </button>
    </form>
  );
};
