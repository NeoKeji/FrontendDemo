import React from 'react';
import { Router, Route, Link} from 'react-router';
import '../assets/style/nav.less';


class Nav extends React.Component {
   render() {
      return (
        <nav className='navbar'>
          <div className='nav-item-wrap'>
            <Link to='/'><img src='../src/assets/images/logo_u23.png'/></Link>
            <a href='javascript:;' className=''><img src='../src/assets/images/neoshop_u25.png'/></a>
            <a href='javascript:;' className=''><img src='../src/assets/images/neomovie_u27.png'/></a>
            <a href='javascript:;' className=''><img src='../src/assets/images/neoworld_u29.png'/></a>
          </div>
          <div className='nav-main-item-wrap'>
            <Link to='/face'>Register</Link>
            <Link >Login</Link>
          </div>
        </nav>
      );
   }
}

export default Nav;
