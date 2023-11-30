import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../config/axios';
import DashboardPage from '../components/DashboardPage.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Dash from '../components/DashboardPage.jsx';
import List from '../components/ShowUserList.jsx';
import Delete from '../components/DeleteUser.jsx';
import Update from '../components/UpdateUser.jsx';

function CreateAdditionalInfo() {
    const [value, setValue] = useState(0);

    // Utiliza un solo estado para todos los datos de información adicional
    const [additionalInfoData, setAdditionalInfoData] = useState({
        childName: '',
        birthDate: '',
        gender: '',
        studying: false,
        playsVideoGames: false,
        videoGamePlatforms: [],
        birthPlaceCity: '',
        birthPlaceState: '',
        birthPlaceCountry: '',
        locationCity: '',
        locationState: '',
        locationCountry: '',
        postalCode: '',
        hobbies: '',
        sports: '',
        maritalStatus: '',
        marriageDate: '',
        spouseInfo: '',
        productCategoriesOfInterest: '',
    });

    const handleChangee = (event, newValue) => {
        setValue(newValue);
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
                <List />
            </React.StrictMode>
        );
    };

    const handleUpdate = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Update />
            </React.StrictMode>
        );
    };

    const handleCreateAdditionalInfo = () => {
        const token = localStorage.getItem('token');
        axios
            .post('/additional-info')
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Información adicional creada exitosamente', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error al crear información adicional:', error);
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
                        toast.error('Error al crear información adicional', {
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
                    <Tab label="Create Additional Info" />
                    <Tab label="Update Additional info" onClick={handleUpdate} />
                    <Tab label="Get List" onClick={handleShowList} />
                </Tabs>
            </Box>
            <h1 style={styles.heading}>Create Additional Info</h1>
            <form>
            <div style={styles.formGroup}>
                    <label htmlFor="childName" style={styles.label}>
                        Child Name
                    </label>
                    <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={additionalInfoData.childName}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, childName: e.target.value })}
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
                        value={additionalInfoData.birthDate}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthDate: e.target.value })}
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
                        value={additionalInfoData.gender}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, gender: e.target.value })}
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
                        checked={additionalInfoData.studying}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, studying: e.target.checked })}
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
                        checked={additionalInfoData.playsVideoGames}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, playsVideoGames: e.target.checked })}
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
                        value={additionalInfoData.videoGamePlatforms}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, videoGamePlatforms: Array.from(e.target.selectedOptions, (option) => option.value) })}
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
                        value={additionalInfoData.birthPlaceCity}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceCity: e.target.value })}
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
                        value={additionalInfoData.birthPlaceState}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceState: e.target.value })}
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
                        value={additionalInfoData.birthPlaceCountry}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceCountry: e.target.value })}
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
                        value={additionalInfoData.locationCity}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationCity: e.target.value })}
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
                        value={additionalInfoData.locationState}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationState: e.target.value })}
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
                        value={additionalInfoData.locationCountry}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationCountry: e.target.value })}
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
                        value={additionalInfoData.birthPlaceCity}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceCity: e.target.value })}
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
                        value={additionalInfoData.birthPlaceState}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceState: e.target.value })}
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
                        value={additionalInfoData.birthPlaceCountry}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, birthPlaceCountry: e.target.value })}
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
                        value={additionalInfoData.locationCity}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationCity: e.target.value })}
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
                        value={additionalInfoData.locationState}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationState: e.target.value })}
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
                        value={additionalInfoData.locationCountry}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, locationCountry: e.target.value })}
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
                        value={additionalInfoData.postalCode}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, postalCode: e.target.value })}
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
                        value={additionalInfoData.hobbies}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, hobbies: e.target.value })}
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
                        value={additionalInfoData.sports}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, sports: e.target.value })}
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
                        value={additionalInfoData.maritalStatus}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, maritalStatus: e.target.value })}
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
                        value={additionalInfoData.marriageDate}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, marriageDate: e.target.value })}
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
                        value={additionalInfoData.spouseInfo}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, spouseInfo: e.target.value })}
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
                        value={additionalInfoData.productCategoriesOfInterest}
                        onChange={(e) => setAdditionalInfoData({ ...additionalInfoData, productCategoriesOfInterest: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <button type="button" onClick={handleCreateAdditionalInfo} style={styles.button}>
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
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
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

export default CreateAdditionalInfo;
