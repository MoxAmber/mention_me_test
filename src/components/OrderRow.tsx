import { FC } from "react";
import { Order } from "../types/order";

interface OrderRowProps {
  order: Order;
  deleteOrder: (id: number) => void;
}

export const OrderRow: FC<OrderRowProps> = ({ order, deleteOrder }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.date}</td>
      <td>{order.amount}</td>
      <td>{order.shipped ? "Yes" : "No"}</td>
      <td>
        {/*Do we need a 'mark as shipped' button here, or maybe an editible*/}
        {/*    table to allow shipments to be marked as shipped after creation?*/}
        {/*    The spec as written suggests that we do, but this hasn't been implemented*/}
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteOrder(order.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
