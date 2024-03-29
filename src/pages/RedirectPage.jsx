import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerConfirmed } from "../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const RedirectPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/auth/register/confirm`, {
          code: code,
        });
        dispatch(registerConfirmed(response.data));
        navigate("/");
      } catch (error) {
        console.log("Error:", error.message);
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Спробуйте, будь ласка, знову.
      </p>
    );
  }

  return (
    <>
      <div className="loader"></div>
    </>
  );
};

export default RedirectPage;
