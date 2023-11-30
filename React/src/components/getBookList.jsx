import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Customer from '../components/CreateBook.jsx'

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Customer/>
            </React.StrictMode>
        );
    };

    const getCustomersList = () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        axios
            .get('/api/customers')
            .then((response) => {
                setCustomers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de clientes:', error);
                setLoading(false);
                toast.warning('La lista de clientes está vacía', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <body>
            <div>
                <button type="button" onClick={back} style={styles.tryAgain}>
                    Go Back
                </button>

                <h1 style={styles.title}>Customers List</h1>
                <button type="button" onClick={getCustomersList} style={styles.createButton}>
                    Get List
                </button>
                <p></p>
                {loading ? (
                    <p>Loading Customers...</p>
                ) : (
                    customers.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={styles.tableCell}>ID</TableCell>
                                    <TableCell style={styles.tableCell}>First Name</TableCell>
                                    <TableCell style={styles.tableCell}>Last Name</TableCell>
                                    <TableCell style={styles.tableCell}>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow key={customer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell style={styles.tableComponent} component="th" scope="row">
                                            {customer.id}
                                        </TableCell>
                                        <TableCell style={styles.tableComponent}>{customer.firstName}</TableCell>
                                        <TableCell style={styles.tableComponent}>{customer.lastName}</TableCell>
                                        <TableCell style={styles.tableComponent}>{customer.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No Customers available.</p>
                    )
                )}
                <ToastContainer />
            </div>
        </body>
    );
}

export default CustomerList;

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
        backgroundColor: 'black',
        color: '#fff',
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
