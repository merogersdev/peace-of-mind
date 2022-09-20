import "./Home.scss";

import { useContext } from "react";

import UserContext from "../../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return <div>Home: {user.name}</div>;
};

export default Home;
