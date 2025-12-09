import React from 'react';
import {Container} from '../index'
import {Logo} from '../index';
import LogoutBtn from './LogoutBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate();
 const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
    return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-gray-800">MyBlog</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex items-center gap-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;