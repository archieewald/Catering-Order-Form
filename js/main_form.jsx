import React from 'react';
import ReactDOM from 'react-dom';

import OrderDetails from './order_details.jsx';
import FingerForm from './fingerform.jsx';
import SoupsForm from './soupsform.jsx';
import MainDishForm from './maindishesform.jsx';



class MainForm extends React.Component{
    constructor(props){
        super(props);
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
            visDate: 'block',
            menu: {},
            basket: []
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
    putToBasket = (element, bought) => {
        console.log(bought);
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
        //filter menu;
        this.personalDetailsValidation();
    }
    render(){
        console.log('basketOverall');
        console.log(this.state.basket);
        return (
            <form className='form'>
                <div className='container'>
                    <OrderDetails name={this.state.name} phone={this.state.phone} email={this.state.email} deliveryR={this.state.deliveryR}
                                  address={this.state.address} time={this.props.time} request={this.state.request} visName={this.state.visName}
                                  visEmail={this.state.visEmail} visPhone={this.state.visPhone} visDelivery={this.state.visDelivery} visAddress={this.state.visAddress}
                                  visTime={this.state.visTime} onChangeText={this.onTypeText} onChangeCheck={this.onTypeCheck} onChangeRadio={this.onTypeRadio}
                                  onSubmit={this.submitForm}
                    />
                </div>
                <div className='container'>
                    <FingerForm fingerfood={this.state.menu.Fingerfood ? this.state.menu.Fingerfood : []} onBuyCheck={this.putToBasket} onBuyQuantity={this.changeQuantity}/>
                </div>
                <div className='container'>
                    <SoupsForm soups={this.state.menu.Zupy ? this.state.menu.Zupy : []} onBuyCheck={this.putToBasket} onBuyQuantity={this.changeQuantity}/>
                </div>
                <div className='container'>
                    <MainDishForm mains={this.state.menu.Dania_hot ? this.state.menu.Dania_hot : []} onBuyCheck={this.putToBasket} onBuyQuantity={this.changeQuantity}/>
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
