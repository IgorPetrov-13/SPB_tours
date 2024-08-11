import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotFound from '../pages/NotFound';
import AuthorizationPage from '../pages/AuthorizationPage';
import RegistrationPage from '../pages/RegistrationPage';
import { type TypeUser } from '../types/Types';
import HomePage from '../pages/HomePage';
import RoadsPage from '../pages/RoadsPage';
import LogoutPage from '../pages/LogoutPage';
import OneRoadPage from '../pages/OneRoadPage';
import PersonalPage from '../pages/PersonalPage';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';

function App(): JSX.Element {
  const [user, setUser] = useState<TypeUser | null>(null);

  useEffect(() => {
    axiosInstance.get("/tokens/refresh").then(({ data }) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<HomePage user={user} />}/>
        <Route path='/roads' element={<RoadsPage />}/>
        <Route path='/roads/:roadId' element={<OneRoadPage />}/>
        <Route path="/logout" element={<LogoutPage user={user} setUser={setUser} />} />
        <Route path="/auth" element={<AuthorizationPage setUser={setUser} />} />
        <Route path="/registration" element={<RegistrationPage setUser={setUser} />} />
        <Route path="/user/:id" element={<PersonalPage user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
