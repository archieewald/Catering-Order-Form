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
    }
    render(){
        return(
            <div className='container'>
                <OrderDetails/>
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
