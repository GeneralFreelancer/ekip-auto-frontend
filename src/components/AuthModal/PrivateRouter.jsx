import { Navigate } from 'react-router-dom';

export const PivateRouter = ({ children }) => {
  const role = localStorage.getItem('role');

  if (role === 'user') {
    return <Navigate to='/' />;
  }

  return children;
};
