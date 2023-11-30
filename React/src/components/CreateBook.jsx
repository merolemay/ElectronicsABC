import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import Dash from '../components/DashboardPage.jsx';
import ShowList from '../components/getBookList.jsx';
import UpdateBooks from '../components/UpdateBook.jsx';
import DeleteBook from '../components/DeleteBook.jsx';
function CreateCustomer() {
    const [value, setValue] = useState(0);

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        additionalInfo: {
            id: 3,
            childName: "Carlos Paz Rodríguez",
            birthDate: "2010-05-15",
            gender: "male",
            studying: true,
            playsVideoGames: true,
            videoGamePlatforms: [
                "Nintendo Switch",
                "PlayStation"
            ],
            birthPlaceCity: "Ciudad del Este",
            birthPlaceState: "Cali",
            birthPlaceCountry: "Colombia",
            locationCity: "Asunción",
            locationState: "Central",
            locationCountry: "Paraguay",
            postalCode: "1234",
            hobbies: "Reading",
            sports: "Soccer",
            maritalStatus: "Married",
            marriageDate: "2015-09-28",
            spouseInfo: "info",
            productCategoriesOfInterest: null,
            customers: null
        }
    });

    const handleCreateCustomer = () => {
        // Verificar que los campos no estén vacíos
        if (!customerData.firstName.trim() || !customerData.lastName.trim() || !customerData.address.trim()) {
            toast.error('Los campos no pueden estar vacíos', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        axios
            .post('/api/customers', customerData)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Cliente creado:', response.data);
                    toast.success('Cliente creado con éxito', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error al crear el cliente:', error);
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
                        toast.error('Error al crear el cliente', {
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
        if (e.target.name === 'additionalInfo') {
            setCustomerData({
                ...customerData,
                additionalInfo: {
                    ...customerData.additionalInfo,
                    [e.target.id]: e.target.value,
                },
            });
        } else {
            setCustomerData({
                ...customerData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDashboard = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Dash/>
            </React.StrictMode>
        );
    };

    const handleList = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ShowList/>
            </React.StrictMode>
        );
    };

    const handleUpdateBook = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <UpdateBooks/>
            </React.StrictMode>
        );
    };

    const handleDelete = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <DeleteBook/>
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
                    <Tab label="Back to Dashboard" onClick={handleDashboard}/>
                    <Tab label="Create Customer"/>
                    <Tab label="Delete Customer" onClick={handleDelete}/>
                    <Tab label="Get Customer List" onClick={handleList}/>
                </Tabs>
            </Box>
            <h1 style={styles.title}>Create new Customer</h1>
            <form style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="firstName" style={styles.label}>
                        First Name:
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={customerData.firstName}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="lastName" style={styles.label}>
                        Last Name:
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={customerData.lastName}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="address" style={styles.label}>
                        Address:
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={customerData.address}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="childName" style={styles.label}>
                        Child Name
                    </label>
                    <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={customerData.additionalInfo.childName}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, childName: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthDate" style={styles.label}>
                        Birth Date
                    </label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={customerData.additionalInfo.birthDate}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthDate: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="gender" style={styles.label}>
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={customerData.additionalInfo.gender}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, gender: e.target.value })}
                        style={styles.input}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="studying" style={styles.label}>
                        Studying
                    </label>
                    <input
                        type="checkbox"
                        id="studying"
                        name="studying"
                        checked={customerData.additionalInfo.studying}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, studying: e.target.checked })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="playsVideoGames" style={styles.label}>
                        Plays Video Games
                    </label>
                    <input
                        type="checkbox"
                        id="playsVideoGames"
                        name="playsVideoGames"
                        checked={customerData.additionalInfo.playsVideoGames}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, playsVideoGames: e.target.checked })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="videoGamePlatforms" style={styles.label}>
                        Video Game Platforms
                    </label>
                    <select
                        id="videoGamePlatforms"
                        name="videoGamePlatforms"
                        multiple
                        value={customerData.additionalInfo.videoGamePlatforms}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, videoGamePlatforms: Array.from(e.target.selectedOptions, (option) => option.value) })}
                        style={styles.input}
                    >
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceCity" style={styles.label}>
                        Birth Place City
                    </label>
                    <input
                        type="text"
                        id="birthPlaceCity"
                        name="birthPlaceCity"
                        value={customerData.additionalInfo.birthPlaceCity}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceCity: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceState" style={styles.label}>
                        Birth Place State
                    </label>
                    <input
                        type="text"
                        id="birthPlaceState"
                        name="birthPlaceState"
                        value={customerData.additionalInfo.birthPlaceState}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceState: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceCountry" style={styles.label}>
                        Birth Place Country
                    </label>
                    <input
                        type="text"
                        id="birthPlaceCountry"
                        name="birthPlaceCountry"
                        value={customerData.additionalInfo.birthPlaceCountry}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceCountry: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="locationCity" style={styles.label}>
                        Location City
                    </label>
                    <input
                        type="text"
                        id="locationCity"
                        name="locationCity"
                        value={customerData.additionalInfo.locationCity}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationCity: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="locationState" style={styles.label}>
                        Location State
                    </label>
                    <input
                        type="text"
                        id="locationState"
                        name="locationState"
                        value={customerData.additionalInfo.locationState}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationState: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="locationCountry" style={styles.label}>
                        Location Country
                    </label>
                    <input
                        type="text"
                        id="locationCountry"
                        name="locationCountry"
                        value={customerData.additionalInfo.locationCountry}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationCountry: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceCity" style={styles.label}>
                        Birth Place City
                    </label>
                    <input
                        type="text"
                        id="birthPlaceCity"
                        name="birthPlaceCity"
                        value={customerData.additionalInfo.birthPlaceCity}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceCity: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceState" style={styles.label}>
                        Birth Place State
                    </label>
                    <input
                        type="text"
                        id="birthPlaceState"
                        name="birthPlaceState"
                        value={customerData.additionalInfo.birthPlaceState}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceState: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="birthPlaceCountry" style={styles.label}>
                        Birth Place Country
                    </label>
                    <input
                        type="text"
                        id="birthPlaceCountry"
                        name="birthPlaceCountry"
                        value={customerData.additionalInfo.birthPlaceCountry}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, birthPlaceCountry: e.target.value })}
                        style={styles.input}
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <div style={styles.formGroup}>
                    <label htmlFor="locationCity" style={styles.label}>
                        Location City
                    </label>
                    <input
                        type="text"
                        id="locationCity"
                        name="locationCity"
                        value={customerData.additionalInfo.locationCity}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationCity: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="locationState" style={styles.label}>
                        Location State
                    </label>
                    <input
                        type="text"
                        id="locationState"
                        name="locationState"
                        value={customerData.additionalInfo.locationState}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationState: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="locationCountry" style={styles.label}>
                        Location Country
                    </label>
                    <input
                        type="text"
                        id="locationCountry"
                        name="locationCountry"
                        value={customerData.additionalInfo.locationCountry}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, locationCountry: e.target.value })}
                        style={styles.input}
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <div style={styles.formGroup}>
                    <label htmlFor="postalCode" style={styles.label}>
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={customerData.additionalInfo.postalCode}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, postalCode: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="hobbies" style={styles.label}>
                        Hobbies
                    </label>
                    <input
                        type="text"
                        id="hobbies"
                        name="hobbies"
                        value={customerData.additionalInfo.hobbies}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, hobbies: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="sports" style={styles.label}>
                        Sports
                    </label>
                    <input
                        type="text"
                        id="sports"
                        name="sports"
                        value={customerData.additionalInfo.sports}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, sports: e.target.value })}
                        style={styles.input}
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <div style={styles.formGroup}>
                    <label htmlFor="maritalStatus" style={styles.label}>
                        Marital Status
                    </label>
                    <input
                        type="text"
                        id="maritalStatus"
                        name="maritalStatus"
                        value={customerData.additionalInfo.maritalStatus}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, maritalStatus: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="marriageDate" style={styles.label}>
                        Marriage Date
                    </label>
                    <input
                        type="date"
                        id="marriageDate"
                        name="marriageDate"
                        value={customerData.additionalInfo.marriageDate}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, marriageDate: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="spouseInfo" style={styles.label}>
                        Spouse Info
                    </label>
                    <input
                        type="text"
                        id="spouseInfo"
                        name="spouseInfo"
                        value={customerData.additionalInfo.spouseInfo}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, spouseInfo: e.target.value })}
                        style={styles.input}
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <div style={styles.formGroup}>
                    <label htmlFor="productCategoriesOfInterest" style={styles.label}>
                        Product Categories Of Interest
                    </label>
                    <input
                        type="text"
                        id="productCategoriesOfInterest"
                        name="productCategoriesOfInterest"
                        value={customerData.additionalInfo.productCategoriesOfInterest}
                        onChange={(e) => setCustomerData.additionalInfo({ ...customerData.additionalInfo, productCategoriesOfInterest: e.target.value })}
                        style={styles.input}
                    />
                </div>
            </form>
            <div style={styles.buttonsContainer}>
                <button type="button" onClick={handleCreateCustomer} style={styles.createButton}>
                    Create Customer
                </button>
            </div>
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    createButton: {
        backgroundColor: 'green',
        color: '#000',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default CreateCustomer;
