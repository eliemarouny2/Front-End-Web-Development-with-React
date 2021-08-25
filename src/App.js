import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Navbar dark color="secondary">
        <div className="container">
          <NavbarBrand href="/">Confusion Resto</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
