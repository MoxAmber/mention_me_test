import { FC, useState, useCallback } from "react";
import { Order } from "../types/order";
import { CreateOrderForm } from "../components/CreateOrderForm";
import { OrderTable } from "../components/OrderTable";

export const Orders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback(
    (values: { date: string; amount: string; shipped: boolean }) => {
      // The code here for assigning object IDs here isn't ideal, but usually this should be
      // handled by the backend so I'm not focusing on it.
      const newId = Math.floor(Math.random() * 1000);
      // Making sure we use the function syntax for setState to avoid race conditions where, for
      // example, someone deletes an order while the setOrders for creating an order is still
      // waiting to be executed.
      setOrders((orders) => [...orders, { id: newId, ...values }]);
    },
    [setOrders]
  );

  const deleteOrder = (id: number) => {
    setOrders((orders) => orders.filter((order) => order.id !== id));
  };

  const getPendingShipmentCount = () => {
    // var c = 0;
    // for (var i = 0; i < orders.length; i++) {
    //   if (orders[i].shipped) c++;
    // }
    // return c;
    // The above code would return a count of orders that shipped, not how many orders are
    // pending. I'm assuming this is a bug and not just confusing function naming.

    return orders.filter((order) => !order.shipped).length;
  };

  return (
    <div className="container mt-3">
      <CreateOrderForm createOrder={createOrder} />
      <h3 className="mt-3">Orders</h3>
      <h4 className="mt-3">Awaiting shipment: {getPendingShipmentCount()} </h4>
      <OrderTable orders={orders} deleteOrder={deleteOrder} />
    </div>
  );
};
