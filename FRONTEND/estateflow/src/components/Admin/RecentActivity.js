// src/components/RecentActivity.js
import React from 'react';
import './RecentActivity.css'; // Add custom styles for the recent activity

const RecentActivity = ({ activities }) => {
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <p>{activity.text}</p>
            <span>{activity.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
