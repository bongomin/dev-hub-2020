import React from 'react';

const Footer = () => {
   return (
      <footer class="bg-dark text-white mt-5 p-4 text-center">
         Copyright &copy; {new Date().getFullYear()}  <span className="dev-hub">Dev-Hub V1.0.0 </span> | By Bongomin Daniel
      </footer>
   );
};

export default Footer;