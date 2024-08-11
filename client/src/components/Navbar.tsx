import React from 'react';
import { NavLink } from 'react-router-dom';
import { TypeUser } from '../types/Types';

function Navbar({ user }: { user: TypeUser | null }): JSX.Element {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary" style={{ width: '100%' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 " style={{display:"flex", width:"100%", 
          justifyContent:"space-evenly",
          }}>
            {user
              ? [
                  { to: '/', label: 'Главная' },
                  { to: '/roads', label: 'Маршруты' },
                  { to: `/user/${user.id}`, label: 'Личный кабинет' },
                  { to: '/logout', label: 'Выход' },
                ].map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      className="nav-link"
                      to={item.to}
                      style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? 'bold' : '',
                          color: isPending ? 'red' : 'black',
                          viewTransitionName: isTransitioning ? 'slide' : '',
                        };
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))
              : [
                  { to: '/', label: 'Главная' },
                  { to: '/roads', label: 'Маршруты' },
                  { to: '/auth', label: 'Вход' },
                  { to: '/registration', label: 'Регистрация' },
                ].map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      className="nav-link"
                      to={item.to}
                      style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? 'bold' : '',
                          color: isPending ? 'red' : 'black',
                          viewTransitionName: isTransitioning ? 'slide' : '',
                        };
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
