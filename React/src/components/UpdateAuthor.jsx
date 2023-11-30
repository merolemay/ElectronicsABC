import React, { useState } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import OrderCreation from '../components/AuthorCreation.jsx';

function UpdateOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState({
    customerId: '',
    orderDate: '',
    shippedDate: '',
    paymentDate: '',
  });

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <OrderCreation />
      </React.StrictMode>
    );
  };

  const handleFind = () => {
    const token = localStorage.getItem('token');

    axios
      .get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { customerId, orderDate, shippedDate, paymentDate } = response.data;
        setOrderData({
          customerId,
          orderDate,
          shippedDate,
          paymentDate,
        });
      })
      .catch((error) => {
        console.error('Error al obtener los detalles de la orden:', error);
        toast.error('Error al obtener los detalles de la orden', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  const handleUpdateOrder = () => {
    const token = localStorage.getItem('token');

    axios
      .put(`/orders/${orderId}`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Orden actualizada:', response.data);
          toast.success('Orden actualizada con éxito', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error al actualizar la orden:', error);
        if (error.response) {
          if (error.response.status === 400) {
            toast.error('Error en la solicitud. Verifique los datos proporcionados.', {
              position: 'top-right',
              autoClose: 3000,
            });
          } else if (error.response.status === 401) {
            toast.error('No autorizado. Inicie sesión nuevamente.', {
              position: 'top-right',
              autoClose: 3000,
            });
          } else {
            toast.error('Error al actualizar la orden', {
              position: 'top-right',
              autoClose: 3000,
            });
          }
        } else {
          toast.error('Error de red. Por favor, inténtelo de nuevo más tarde.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  };

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>UPDATE ORDER</h1>
      <form>
        <div>
          <label htmlFor="orderId" style={styles.label}>
            ID for search:
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleFind} style={styles.button}>
            Search
          </button>
        </div>
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
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="orderDate" style={styles.label}>
            Order Date:
          </label>
          <input
            type="text"
            id="orderDate"
            name="orderDate"
            value={orderData.orderDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="shippedDate" style={styles.label}>
            Shipped Date:
          </label>
          <input
            type="text"
            id="shippedDate"
            name="shippedDate"
            value={orderData.shippedDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="paymentDate" style={styles.label}>
            Payment Date:
          </label>
          <input
            type="text"
            id="paymentDate"
            name="paymentDate"
            value={orderData.paymentDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </form>
      <button type="button" onClick={handleUpdateOrder} style={styles.buttonU}>
        Update
      </button>
      <p></p>
      <button type="button" onClick={back}>
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
}

export default UpdateOrder;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '47%',
    padding: '11px',
    border: '4px solid #ccc',
    borderRadius: '10px',
  },
  buttonU: {
    backgroundColor: 'green',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};
