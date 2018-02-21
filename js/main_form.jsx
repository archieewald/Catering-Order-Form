import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import NumberPicker from 'react-widgets/lib/NumberPicker';


import OrderDetails from './order_details.jsx';



class MainForm extends React.Component{
    constructor(props){
        super(props);
        Moment.locale('pl');
        momentLocalizer();
        simpleNumberLocalizer();
        this.state = {
            name: '',
            phone: '',
            email: '',
            time: '',
            deliveryR: '',
            address: '',
            request: '',
            visName: 'none',
            visEmail: 'none',
            visPhone: 'none',
            visDelivery: 'none',
            visForm: false,
            visAddress: 'none',
            visTime: 'none',
            visDate: 'block'
        }
    }
    onTypeText = (element) => {
        this.setState({
            [element.id]: element.value
        });

    }
    onTypeCheck = (element) => {
        this.setState({
            [element.id]: element.checked
        })
    }
    onTypeRadio = (element) => {
        this.setState({
            deliveryR: element.value
        })
    }
    personalDetailsValidation(){
        this.setState({
            visForm: "none",
            visPhone: "none",
            visName: "none",
            visEmail: "none",
            visTime: 'none',
            visDelivery: 'none',
            visAddress: 'none'
        });
        let isEmailValid = this.state.email.indexOf('@') > -1;
        let isNameValid = this.state.name !== "";
        let isPhoneValid = this.state.phone !== "";
        let isAddressValid = this.state.address !== "";
        let isTimeValid = this.state.time !== "";
        let isDeliveryValid = this.state.deliveryR !== '';

        if(!isEmailValid){
            this.setState({
                visEmail: "block",
            })
        }
        if (!isNameValid){
            this.setState({
                visName: "block",
            })
        }
        if (!isPhoneValid){
            this.setState({
                visPhone: "block",
            })
        }
        if (!isTimeValid){
            this.setState({
                visTime: "block",
            })
        }
        if (!isDeliveryValid){
            this.setState({
                visDelivery: "block",
            })
        }
        if (!isAddressValid){
            this.setState({
                visAddress: "block",
            })
        }

        if(isPhoneValid && isNameValid && isEmailValid && isAddressValid && isTimeValid && isDeliveryValid){
            this.setState({
                visForm: true
            })

        }

    }
    submitForm = (event) => {
        event.preventDefault();
        //filter getPersonalDetails z znaczników dla walidacji
        this.personalDetailsValidation();
    }
    render(){
        return(
            <form className='form'>
                <div className='container'>
                    <OrderDetails name={this.state.name} phone={this.state.phone} email={this.state.email} deliveryR={this.state.deliveryR}
                                  address={this.state.address} time={this.props.time} request={this.state.request} visName={this.state.visName}
                                  visEmail={this.state.visEmail} visPhone={this.state.visPhone} visDelivery={this.state.visDelivery} visAddress={this.state.visAddress}
                                  visTime={this.state.visTime} onChangeText={this.onTypeText} onChangeCheck={this.onTypeCheck} onChangeRadio={this.onTypeRadio}
                                  onSubmit={this.submitForm}/>
                </div>
                <input type='submit' value='Zamawiam' onClick={this.submitForm}/>
            </form>

        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <MainForm/>,
        document.getElementById('app')
    )
});
