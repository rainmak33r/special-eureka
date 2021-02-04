import React from "react";
import { Container } from "@material-ui/core";
import { Chat } from "./Chat";

const App = () => {
  return (
    <Container data-testid="container">
      <Chat />
    </Container>
  );
};

export default App;
