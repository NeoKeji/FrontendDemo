import React from 'react';
import '../assets/style/nav.less';


class Nav extends React.Component {
   render() {
      return (
        <nav className='navbar'>
          <div className='nav-item-wrap'>
            <a href='javascript:;' className=''><img src='../src/assets/images/logo_u23.png'/></a>
            <a href='javascript:;' className=''><img src='../src/assets/images/neoshop_u25.png'/></a>
            <a href='javascript:;' className=''><img src='../src/assets/images/neomovie_u27.png'/></a>
            <a href='javascript:;' className=''><img src='../src/assets/images/neoworld_u29.png'/></a>
          </div>
            
        </nav>
      );
   }
}

export default Nav;
