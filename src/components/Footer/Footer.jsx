import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index';
import { Footer as FooterFlow } from "flowbite-react";
import { FooterLink, FooterLinkGroup, FooterCopyright } from 'flowbite-react';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between ">
        <p className="text-sm">&copy; {new Date().getFullYear()} BlogProject. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/all-posts" className="hover:text-white transition">All Posts</Link>
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/add-post" className="hover:text-white transition">Add Posts</Link>
        </div>
        {/* For future use with react-router-dom */}
        <div>
          <Logo />
        </div>
      </div>
    </footer>
    //     <FooterFlow container>
    //   <FooterCopyright href="#" by="Flowbite™" year={2022} />
    //   <FooterLinkGroup>
    //     <div className="flex space-x-4 mt-4 md:mt-0">
    //     <Link to="/all-posts" className="hover:text-black transition">All Posts</Link>
    //     <Link to="/" className="hover:text-black transition">Home</Link>
    //     <Link to="/add-post" className="hover:text-black transition">Add Posts</Link>
    //     </div>
    //   </FooterLinkGroup>
    // </FooterFlow>
  );
}

export default Footer;