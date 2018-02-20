import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';


import OrderDetails from './order_details.jsx';



class MainForm extends React.Component{
    constructor(props){
        super(props);
        Moment.locale('pl');
        momentLocalizer();
        this.state = {
            form: []
        }
    }
    getPersonalDetails = (x) => {
        const formData = [x];
        console.log(formData);
    }
    submitForm = (event) => {
        //filter getPersonalDetails z znaczników dla walidacji
    }
    render(){
        return(
            <div className='container'>
                <OrderDetails getDetails={this.getPersonalDetails}/>
            </div>

        )
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <MainForm/>,
        document.getElementById('app')
    )
});
