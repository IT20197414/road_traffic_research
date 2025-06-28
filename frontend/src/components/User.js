import React from 'react';
import '../App.css';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/>
                <div class="home_Title">
                    <h5>System Description</h5>
                    <a class="btn btn-primary col-md-12" href="/vehicle" >Vehicle</a>
                    <br/><br/>
                    <a class="btn btn-primary col-md-12" href="/phone" >Number Plate & Phone</a>
                    <br/><br/>
                    <a class="btn btn-primary col-md-12" href="/accident" >Accident</a>
                    <br/><br/>
                    <a class="btn btn-primary col-md-12" href="/person" >Person</a>
                    <br/><br/>
                </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </div>
        );
    }
}

export default User;
