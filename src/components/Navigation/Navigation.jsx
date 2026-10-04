import { Nav, NavLink } from './styles';

function Navigation() {
  return (
    <Nav>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/library">Mi biblioteca</NavLink>
    </Nav>
  );
}

export default Navigation;