import { useState, useEffect } from "react";

const useGetUser = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`https://jobserver-xyvn.onrender.com/users/${email}`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [email]);

  return {
    userData,
    loading,
    error,
  };
};

export default useGetUser;
