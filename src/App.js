
import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import User from './components/User';
import Users from './components/Users';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route  path="/" element={<Users />}> </Route>
          <Route path="/add" element={<User />}>  </Route>
          <Route path="/edit/:id" element={<User />}> </Route>
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;
