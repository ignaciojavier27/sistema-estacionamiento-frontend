import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import MainScreen from './views/MainScreen';
import OwnersScreen from './views/OwnersScreen';
import ServicesScreen from './views/ServicesScreen';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import LogoutScreen from './views/LogoutScreen';
import ClientNavbar from './components/Navbars/ClientNavbar';
import OwnerNavbar from './components/Navbars/OwnerNavbar';
import Navbar from './components/Navbar';
import OwnerEstacionamientosScreen from './views/OwnerEstacionamientosScreen';
import HistoryClientScreen from './views/HistoryClientScreen';
function App() {

  const [userType, setUserType] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserType(user.tipo_usuario);
    }
  }, []);

  return (
    <>
      <nav>
        {userType === "cliente" && <ClientNavbar/>}
        {userType === "propietario" && <OwnerNavbar/>}
        {userType === "" && <Navbar />}
      </nav>

      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/services' element={<ServicesScreen />} />
        <Route path='/*' element={<Navigate to='/'/>} />

        <Route path='/client/history' element={<HistoryClientScreen />} />

        <Route path='/owners' element={<OwnersScreen />} />
        <Route path='/owners/parking' element={<OwnerEstacionamientosScreen />} />

        <Route path='/signup' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen setUserType={setUserType} />} />
        <Route path='/logout' element={<LogoutScreen setUserType={setUserType} />} />
        
      </Routes>

    </>


  );
}

export default App
