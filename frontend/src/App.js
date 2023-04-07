import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import HomePage from "./pages/Home";
import ChatPage from "./pages/Chat";
import Authencation from "./middlewares/Authencation";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="app">
      <ChakraProvider>
        <Container maxW="100vw" centerContent>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route
                path="/chats"
                element={
                  <Authencation redirectTo="/">
                    <ChatPage />
                  </Authencation>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ChakraProvider>
    </div>
  );
}

export default App;
