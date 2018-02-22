import React from 'react';
import ReactDOM from 'react-dom';

import OrderDetails from './order_details.jsx';
import FingerForm from './fingerform.jsx';
import SoupsForm from './soupsform.jsx';
import MainDishForm from './maindishesform.jsx';
import Resume from './resume.jsx';

class MainForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            date: null,
            time: '',
            deliveryR: '',
            address: '',
            request: '',
            visName: 'none',
            visEmail: 'none',
            visPhone: 'none',
            visDelivery: 'none',
            visAddress: 'none',
            visTime: 'none',
            visDate: 'none',
            menu: {},
            basket: [],
            personalDetails: [],
            visForm: false,
            resume: false
        };
        this.getMenu();
    }
    getMenu(){
        fetch('http://localhost:3000/db')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('E.R.R.O.R.');
                }
            })
            .then(data => {
                this.setState({
                   menu:  data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    onTypeText = (element) => {
        this.setState({
            [element.id]: element.value
        });
    }
    onTypeDate = ({value}) => {
        this.setState({
            date: value
        });
    }
    onTypeRadio = (element) => {
        this.setState({
            deliveryR: element.value
        })
    }
    putToBasket = (element, bought) => {
        const basket = this.state.basket;
        const productCost = Number(element.price) * Number(element.quantity);
        const product = {
            name: element.name,
            quantity: element.quantity,
            price: element.price,
            cost: productCost
        };
        if(bought){
            this.setState({
                basket: [...this.state.basket, product]
            })
        } else if (bought === false){
            const newBasket = basket.filter( existing => {
                return existing.name !== element.name
            });
            this.setState({
                basket: newBasket
            })
        }
    }
    changeQuantity = (element, bought) => {

        const basket = this.state.basket;
        const productCost = Number(element.price) * Number(element.quantity);

        if(bought) {

            const newQunatity = basket.filter( existing => {
                return existing.name === element.name
            });

            newQunatity[0].quantity = element.quantity;
            newQunatity[0].cost = productCost;

            const newBasket = basket.filter( existing => {
                return existing.name !== element.name
            });

            newBasket.push(newQunatity[0]);
            this.setState({
                basket: newBasket
            })
        }
    }
    personalDetailsValidation = (event) => {
        event.preventDefault();

        this.setState({
            visPhone: "none",
            visName: "none",
            visEmail: "none",
            visDate: 'none',
            visTime: 'none',
            visDelivery: 'none',
            visAddress: 'none',
        });

        let isEmailValid = this.state.email.indexOf('@') > -1;
        let isNameValid = this.state.name !== "";
        let isPhoneValid = this.state.phone !== "";
        let isDateValid = this.state.date !== null;
        let isTimeValid = this.state.time !== "";
        let isDeliveryValid = this.state.deliveryR !== '';
        let isAddressValid;

        if (this.state.deliveryR === 'pickUp'){
            isAddressValid = true;
        } else if (this.state.address !== "" && this.state.deliveryR === 'delivery'){
            isAddressValid = true;
        }

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
        if (!isDateValid){
            this.setState({
                visDate: "block",
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
        if (!isAddressValid && this.state.deliveryR === 'delivery'){
            this.setState({
                visAddress: "block",
            })
        }

        if(isPhoneValid && isNameValid && isEmailValid && isAddressValid && isDateValid && isTimeValid && isDeliveryValid){
            this.setState({
                visForm: true
            }, () => {
                this.submitForm();
            })
        }
    }

    submitForm = () => {

        let personalDetails = {};

        personalDetails = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            date: this.state.date.toLocaleDateString(),
            time: this.state.time,
            delivery: this.state.deliveryR,
            address: this.state.address,
            request: this.state.request
        };

        this.setState({
            resume: true,
            personalDetails: personalDetails
        });
    }
    render(){
        return (
            <div className='app-box'>
                <form className='form'>
                    <div className='container'>
                        <OrderDetails
                            name={this.state.name}
                            phone={this.state.phone}
                            email={this.state.email}
                            date={this.state.date}
                            deliveryR={this.state.deliveryR}
                            address={this.state.address}
                            time={this.state.time}
                            request={this.state.request}
                            visName={this.state.visName}
                            visEmail={this.state.visEmail}
                            visPhone={this.state.visPhone}
                            visDelivery={this.state.visDelivery}
                            visAddress={this.state.visAddress}
                            visDate={this.state.visDate}
                            visTime={this.state.visTime}
                            onChangeText={this.onTypeText}
                            onChangeDate={this.onTypeDate}
                            onChangeRadio={this.onTypeRadio}
                        />
                    </div>
                    <div className='container'>
                        <FingerForm
                            fingerfood={this.state.menu.Fingerfood ? this.state.menu.Fingerfood : []}
                            onBuyCheck={this.putToBasket}
                            onBuyQuantity={this.changeQuantity}
                        />
                    </div>
                    <div className='container'>
                        <SoupsForm
                            soups={this.state.menu.Zupy ? this.state.menu.Zupy : []}
                            onBuyCheck={this.putToBasket}
                            onBuyQuantity={this.changeQuantity}
                        />
                    </div>
                    <div className='container'>
                        <MainDishForm
                            mains={this.state.menu.Dania_hot ? this.state.menu.Dania_hot : []}
                            onBuyCheck={this.putToBasket}
                            onBuyQuantity={this.changeQuantity}
                        />
                    </div>
                    <div className='container submit-box'>
                        <div className='submitButton'>
                            <input
                                type='submit'
                                style={{display: 'block'}}
                                value='Zamawiam'
                                onClick={this.personalDetailsValidation}
                            />
                        </div>
                    </div>
                </form>
                <div className='resume' style={{visibility: this.state.visForm ? 'visible' : 'hidden' }}>
                    {this.state.visForm ? (
                        <Resume
                            resume={this.state.resume}
                            basket={this.state.basket}
                            personalDetails={this.state.personalDetails}
                        />
                    ) : <span> Loading </span>}
                </div>
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
