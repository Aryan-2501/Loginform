import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [allData, setallData] = React.useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setallData({
      ...allData,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      address: localStorage.getItem("address"),
      phone: localStorage.getItem("phone"),
    });
  }

  const Logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("address");
    localStorage.removeItem("phone");

    sessionStorage.setItem("auth", "false");
    navigate("/", { replace: false });
  };

  return (
    <div className="Home">
      <div className="welcome">
        <h2>
          Welcome, <span>{allData.username}</span>
        </h2>
        <h3>
          Email: <span>{allData.email}</span>
        </h3>
        <h3>
          Address: <span>{allData.address}</span>
        </h3>
        <h3>
          Phone: <span>{allData.phone}</span>
        </h3>

        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
