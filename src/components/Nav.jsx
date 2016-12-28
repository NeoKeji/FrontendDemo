import React from 'react';
import { Router, Route, Link} from 'react-router';
import '../assets/style/nav.less';


class Nav extends React.Component {
   render() {
      return (
        <nav className='navbar'>
          <div className='nav-item-wrap'>
            <Link to='/'><img src='../src/assets/images/logo_u23.png'/></Link>
            <a href='javascript:;' className='navIcon '><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
            <a href='javascript:;' className='navIcon '><i className="fa fa-video-camera" aria-hidden="true"></i></a>
            <a href='javascript:;' className='navIcon '><i className="fa fa-globe" aria-hidden="true"></i></a>
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
