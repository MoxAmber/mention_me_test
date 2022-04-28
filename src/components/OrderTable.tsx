import { FC } from "react";

import { OrderRow } from "./OrderRow";
import { Order } from "../types/order";

interface OrderTableProps {
  orders: Order[];
  deleteOrder: (id: number) => void;
}

export const OrderTable: FC<OrderTableProps> = ({ orders, deleteOrder }) => {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Shipped</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} deleteOrder={deleteOrder} />
        ))}
      </tbody>
    </table>
  );
};
