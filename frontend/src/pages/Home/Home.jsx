import "../../components/Button/Button.scss";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import Container from "../../components/Container/Container";
import Hero from "../../components/Hero/Hero";

export default function Home() {
  const { user } = useContext(UserContext);

  // If user session exists, go straight to dashboard.
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container>
      <Hero
        title="Be Mindful"
        content="This application is meant to assist in the daily mental health of the individual by providing a safe space to journal, keep track of daily gratitudes and truly have peace of mind."
      />
    </Container>
  );
}
