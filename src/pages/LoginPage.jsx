import React from 'react';
import Nav from '../components/Nav.jsx';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <p style={{marginTop:'8%',marginLeft:'30%'}}>This is Login Page!</p>
            </div>
        );
    }
}

export default LoginPage;
