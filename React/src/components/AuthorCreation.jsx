import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from '../components/DashboardPage.jsx';
import ShowAL from '../components/getListAuthor.jsx';
import BooksAuthor from '../components/ShowAuthorBooks.jsx';
import DeleteAuthor from '../components/DeleteAuthor';
import UpdateAuthor from '../components/UpdateAuthor';
import axios from '../config/axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import UpdateBooks from "./UpdateBook.jsx";

function OrderCreation() {
  const [value, setValue] = useState(0);

  const handleChangee = (event, newValue) => {
    setValue(newValue);
  };

  const [orderData, setOrderData] = useState({
    customerId: '',
    orderDate: '',
    shippedDate: '',
    paymentDate: '',
  });

  const handleOrderCreate = () => {
    // Verifica que los campos no estén vacíos y realiza otras validaciones si es necesario
    if (!orderData.customerId || !orderData.orderDate) {
      toast.error('Por favor, complete los campos obligatorios', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const token = localStorage.getItem('token');

    axios
      .post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('Orden creada:', response.data);
          toast.success('Orden creada con éxito', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error al crear la orden:', error);
        // Maneja errores y muestra mensajes de error apropiados
      });
  };

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDashboard = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Dash />
      </React.StrictMode>
    );
  };

    const handleShowList = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ShowAL/>
            </React.StrictMode>
        );
    };

    const handleBooksOfAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <BooksAuthor/>
            </React.StrictMode>
        );
    };

    const handleUpdateAuthor = () => {

        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <UpdateAuthor/>
            </React.StrictMode>
        );
    };

    const handleDeleteAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <DeleteAuthor/>
            </React.StrictMode>
        );
    };

  return (
    <div style={styles.container}>
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 1000 },
          bgcolor: 'background.paper',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChangee}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Back to Dashboard" onClick={handleDashboard} />
          <Tab label="Update Order" onClick={handleUpdateAuthor} />
          <Tab label="List" onClick={handleShowList} />
          <Tab label="Delete Order" onClick={handleDeleteAuthor} />
          <Tab label="Create Order" />
        </Tabs>
      </Box>
      <h1 style={styles.heading}>Create Order</h1>
      <form>
        <div style={styles.formGroup}>
          <label htmlFor="customerId" style={styles.label}>
            Customer ID:
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={orderData.customerId}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="orderDate" style={styles.label}>
            Order Date:
          </label>
          <input
            type="date" // Cambiado a tipo "date"
            id="orderDate"
            name="orderDate"
            value={orderData.orderDate}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="shippedDate" style={styles.label}>
            Shipped Date:
          </label>
          <input
            type="date" // Cambiado a tipo "date"
            id="shippedDate"
            name="shippedDate"
            value={orderData.shippedDate}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="paymentDate" style={styles.label}>
            Payment Date:
          </label>
          <input
            type="date" // Cambiado a tipo "date"
            id="paymentDate"
            name="paymentDate"
            value={orderData.paymentDate}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleOrderCreate} style={styles.button}>
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    backgroundColor: 'darkorange',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: '2em',
    padding: '10px 0',
    borderRadius: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    color: '#000',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default OrderCreation;
