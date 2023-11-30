import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import OrderCreation from '../components/AuthorCreation.jsx'; // Asegúrate de tener este import correcto
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <OrderCreation />
      </React.StrictMode>
    );
  };

  const getOrdersList = () => {
    setLoading(true);

    axios
      .get('/orders')
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de órdenes:', error);
        setLoading(false);
        toast.warning('La lista de órdenes está vacía', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <body>
      <div>
        <button type="button" onClick={back} style={styles.tryAgain}>
          Go back
        </button>

        <h1 style={styles.title}>Orders List</h1>
        <button type="button" onClick={getOrdersList} style={styles.createButton}>
          Search
        </button>
        <p></p>
        {loading ? (
          <p>Loading Orders...</p>
        ) : orders.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableCell}>ID</TableCell>
                <TableCell style={styles.tableCell}>Customer ID</TableCell>
                <TableCell style={styles.tableCell}>Order Date</TableCell>
                <TableCell style={styles.tableCell}>Shipped Date</TableCell>
                <TableCell style={styles.tableCell}>Payment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={styles.tableComponent} component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell style={styles.tableComponent}>{order.customerId}</TableCell>
                  <TableCell style={styles.tableComponent}>{order.orderDate}</TableCell>
                  <TableCell style={styles.tableComponent}>{order.shippedDate}</TableCell>
                  <TableCell style={styles.tableComponent}>{order.paymentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No Orders available.</p>
        )}
        <ToastContainer />
      </div>
    </body>
  );
}

export default OrderList;

const styles = {
  createButton: {
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  tryAgain: {
    backgroundColor: 'white',
    color: '#000',
    fontStyle: 'italic',
  },
  title: {
    backgroundColor: 'darkorange',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: '2em',
    padding: '10px 0',
    borderRadius: '10px',
  },
  tableCell: {
    backgroundColor: 'orange',
    color: 'black',
    fontWeight: 'bold',
  },
  tableComponent: {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  },
};
