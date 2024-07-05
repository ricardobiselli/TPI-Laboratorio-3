import { useState, useEffect, useContext } from "react";
import AuthContext from "../../services/authentication/AuthContext";
import { getClientOrders } from "../../api/ApiConnection";
import { Table, Container } from "react-bootstrap";

const ClientOrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (user && user.sub) {
          const clientID = user.sub;
          const fetchedOrders = await getClientOrders(clientID);
          if (fetchedOrders.$values) {
            setOrders(fetchedOrders.$values);
          } else {
            console.error("Unexpected response structure:", fetchedOrders);
          }
          console.log("Fetched orders:", fetchedOrders);
        } else {
          console.error("User ID not available");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [user]);

  return (
    <Container>
      <h2 className="my-4 text-center">Historial de compras</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID de compra</th>
              <th>Total</th>
              <th>Fecha de compra</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ClientOrderHistory;
