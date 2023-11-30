import React, { useState } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import OrderCreation from '../components/AuthorCreation.jsx'; // Asegúrate de tener este import correcto

function DeleteOrder() {
  const [orderId, setOrderId] = useState('');

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <OrderCreation />
      </React.StrictMode>
    );
  };

  const handleDeleteOrder = () => {
    if (window.confirm('¿Estás seguro?')) {

      axios
        .delete(`/orders/${orderId}`)
        .then((response) => {
          if (response.status === 200) {
            toast.success('Orden eliminada con éxito', {
              position: 'top-right',
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la orden:', error);
          if (error.response) {
            if (error.response.status === 404) {
              toast.error('Orden no encontrada. Verifique el ID de la orden.', {
                position: 'top-right',
                autoClose: 3000,
              });
            } else if (error.response.status === 403) {
              toast.error('No autorizado para eliminar la orden. Inicie sesión nuevamente.', {
                position: 'top-right',
                autoClose: 3000,
              });
            } else {
              toast.error('Error al eliminar la orden', {
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
    }
  };

  return (
    <div>
      <h1 style={styles.title}>DELETE ORDER</h1>
      <label htmlFor="orderId">ID FOR SEARCH:</label>
      <input
        type="text"
        id="orderId"
        name="orderId"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={styles.input}
      />
      <button type="button" onClick={handleDeleteOrder} style={styles.button}>
        Delete
      </button>
      <ToastContainer />
      <p></p>
      <button type="button" onClick={back}>
        GO BACK
      </button>
    </div>
  );
}

export default DeleteOrder;

const styles = {
  label: {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold',
  },
  title: {
    backgroundColor: 'orange',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: '2em',
    padding: '10px 0',
    borderRadius: '10px',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  userInfo: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '57%',
    padding: '12px',
    border: '4px solid #ccc',
    borderRadius: '10px',
  },
};
