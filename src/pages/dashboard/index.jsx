import React, { useEffect } from "react";

function Dashboard() {
  
  useEffect(() => {
    document.title = "Dashboard";
  });

  return <div className="dashboard">Dashboard</div>;
}

export default Dashboard;
