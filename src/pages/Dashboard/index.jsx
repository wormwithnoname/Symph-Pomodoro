import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import TabsBar from 'components/TabsBar';

import { useAuth } from 'hooks/Hooks';
import routes from 'constants/routes';

import './styles.scss';

function DashboardPage() {
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push(routes.LOGIN);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="dashboard">
      <TabsBar />
      <Button onClick={handleLogout} type="primary" className="dashboard-button">
        Logout
      </Button>
    </div>
  );
}

export default DashboardPage;
