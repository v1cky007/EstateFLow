import './App.css';

import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Dashboard';
// Ensure this is the correct import path
import Home from './components/Landing/Home';
// Ensure the import name is correct
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginSignupContainer from './components/Login/LoginsignContainer';
import Membership from './components/Landing/Membership';
import AboutPage from './components/Landing/AboutPage';
import UserTable from './components/Admin/UserTable';
import HousingAdmin from './components/Admin/houses/HousingAdmin';
import HousingList from './components/Landing/HousingList';
import AuthGuard from './components/Login/AuthGuard';
import Planning from './components/Admin/houses/Planning';
import JoinUsForm from './components/Landing/JoinUsForm';
import PlanningList from './components/Landing/PlanningList';
import BrokerTable from './components/Admin/BrokerTable';
import BrokerDashboard from './components/Admin/Broker/BrokerDashboard';
import BrokerHousingAdmin from './components/Admin/Broker/BrokerHousingAdmin';



function App() {
  // Initialize housesData state
  const [housesData, setHousesData] = useState([
    { id: 1, name: 'House 1', description: 'Beautiful family house with a garden.', image: 'https://via.placeholder.com/300x200?text=House+1' },
    // Add more houses as needed
  ]);

  // Function to add a new house
  const addHouse = (newHouse) => {
    setHousesData([...housesData, newHouse]);
  };

  return (
      <div className="App">
        <Routes>
          <Route path="/account" element={<LoginSignupContainer/>} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/member" element={<Membership/>} />
          <Route path="/admin/add" element={<HousingAdmin/>} />
          <Route path="/admin/plan" element={<Planning/>} />
          <Route path="/admin/broker" element={<BrokerTable/>} />
          <Route path="/houses" element={<AuthGuard><HousingList/></AuthGuard>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/joinus" element={<JoinUsForm/>} />
          <Route path="/users" element={<UserTable/>} />
          <Route path="/plan" element={<PlanningList/>} />
          <Route path="/broker-dashboard" element={<BrokerDashboard/>} />
          <Route path="/broker/add" element={<BrokerHousingAdmin/>} />
        </Routes>
      </div>
    
  );
}

export default App;
