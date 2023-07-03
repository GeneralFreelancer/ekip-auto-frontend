import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectedUser);
  const token = user.token

  if (!token) {
    return <Navigate to='/' />;
  }

  return children;
};
