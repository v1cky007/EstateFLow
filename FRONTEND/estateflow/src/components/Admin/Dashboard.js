import React from 'react';
import './Dashboard.css'; // Add custom styles for the dashboard

import UserTable from './UserTable';
import RecentActivity from './RecentActivity'; // Import RecentActivity component
import TransactionTable from './TransactionTable'; // Import TransactionTable component
import PropertyTable from './PropertyTable'; // Import PropertyTable component
import SalesTrendsChart from './SalesTrendsChart'; // Import SalesTrendsChart component
import PropertyDistributionChart from './PropertyDistributionChart'; // Import PropertyDistributionChart component
import RevenueByPropertyTypeChart from './RevenueByPropertyTypeChart'; // Import RevenueByPropertyTypeChart component
import UserGrowthChart from './UserGrowthChart'; // Import UserGrowthChart component
import Sidebar from './sidebar';
import HousingList from '../Landing/HousingList';
import HousingStatistics from './houses/HousingStatistics';

const Dashboard = () => {
  // Sample data - replace with actual data from your backend
  const stats = [
    { title: 'Total Houses', value: 120 },
    { title: 'Apartments', value: 45 },
    { title: 'Villas', value: 30 },
    { title: 'Commercial Properties', value: 25 },
  ];

  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Agent' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Client' },
    // Add more user data as needed
  ];

  // Sample recent activities
  const recentActivities = [
    { text: 'New listing added for 3-bedroom apartment', date: '2024-07-26' },
    { text: 'Transaction completed for villa at Pine Street', date: '2024-07-25' },
    { text: 'User John Doe updated profile information', date: '2024-07-24' },
    // Add more activities as needed
  ];

  // Sample transaction data
  const transactions = [
    { id: 1, date: '2024-07-25', property: 'Villa at Elm Street', amount: '$350,000', status: 'Completed' },
    { id: 2, date: '2024-07-24', property: '3-bedroom apartment at Oak Avenue', amount: '$250,000', status: 'Pending' },
    { id: 3, date: '2024-07-23', property: 'Commercial space at Pine Street', amount: '$500,000', status: 'Completed' },
    // Add more transaction data as needed
  ];

  // Sample property data
  const properties = [
    { id: 1, name: 'Villa at Elm Street', location: 'Elm Street', type: 'Villa', price: '$350,000', status: 'Available' },
    { id: 2, name: '3-bedroom apartment at Oak Avenue', location: 'Oak Avenue', type: 'Apartment', price: '$250,000', status: 'Sold' },
    { id: 3, name: 'Commercial space at Pine Street', location: 'Pine Street', type: 'Commercial', price: '$500,000', status: 'Available' },
    // Add more property data as needed
  ];

  // Sample chart data
  const salesTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [30000, 40000, 35000, 50000, 45000, 60000, 70000],
  };

  const propertyDistributionData = {
    labels: ['Apartments', 'Villas', 'Commercial Properties', 'Others'],
    values: [45, 30, 25, 20],
  };

  const revenueByPropertyTypeData = {
    labels: ['Apartments', 'Villas', 'Commercial Properties'],
    values: [250000, 350000, 500000],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [120, 130, 140, 150, 160, 170, 180],
  };

  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboard-content">
        <HousingStatistics/>
        <div className="charts">
          <div className="chart">
            <h3>Sales Trends</h3>
            <SalesTrendsChart data={salesTrendsData} />
          </div>
          <div className="chart">
            <h3>Property Distribution</h3>
            <PropertyDistributionChart data={propertyDistributionData} />
          </div>
          <div className="chart">
            <h3>Revenue by Property Type</h3>
            <RevenueByPropertyTypeChart data={revenueByPropertyTypeData} />
          </div>
          <div className="chart">
            <h3>User Growth</h3>
            <UserGrowthChart data={userGrowthData} />
          </div>
        </div>
        <RecentActivity activities={recentActivities} />

        <div className="transaction-management">
          <h2>Transaction Management</h2>
          <TransactionTable transactions={transactions} />
        </div>
        <div className="property-management">
          <h2>Property Management</h2>
          <PropertyTable properties={properties} />
        </div>
        <div className="settings">
          <h2>Settings</h2>
          {/* Add settings configuration options here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
