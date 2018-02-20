import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';


export default class OrderDetails extends React.Component{
    constructor(props){
        super(props);
        Moment.locale('pl');
        momentLocalizer();
        this.state = {
            name: '',
            phone: '',
            email: '',
            delivery: false,
            pickUp: false,
            address: '',
            request: '',
            visName: 'block',
            visEmail: 'block',
            visPhone: 'block',
            visDelivery: 'block',
        }
    }
    onTypeText = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });

        this.setState({
            visForm: "none",
            visMess: "none",
            visName: "none",
            visEmail: "none"
        });

        let isEmailValid = this.state.email.indexOf('@') > -1;
        let isNameValid = this.state.name !== "";
        let isPhoneValid = this.state.message !== "";
        let isAddressValid = this.state.address !== '';

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
        if(isPhoneValid && isNameValid && isEmailValid && isAddressValid){
            this.setState({
                visForm: "block",
            })

        }
    }
    onTypeCheck = (event) => {
        this.setState({
            [event.target.id]: event.target.checked
        })
    }
    componentDidUpdate(){
        const personalDetails = this.state;
        this.props.getDetails(personalDetails);
    }
    render(){
        return(
            <form className='order_details'>
                <h2 className='order_details_title'>1) Dane kontaktowe, szczegóły dostawy oraz uwagi</h2>
                <hr />
                <div className='form_accepted'>
                    <span style={{color: "green", display: this.state.visForm}}>Dziękujemy za wiadomość. Wysłano do wydziału: {this.state.department}.</span>
                </div>
                <div className='name_form'>
                    <label className='label' htmlFor='name'>Imię i nazwisko<span className='required'>*</span></label>
                    <span style={{color: "red", display: this.state.visName}}>Pole imię musi zostać uzupełnione</span>
                    <input id='name' type='text' value={this.state.name} onChange={this.onTypeText}/>
                    <p className='descrInput'>*lub nazwa firmy</p>
                </div>
                <div className='phone_form'>
                    <label className='label' htmlFor='phone'>Numer telefonu<span className='required'>*</span></label>
                    <span style={{color: "red", display: this.state.visPhone}}>Pole z numerem telefonu musi zostać uzupełnione</span>
                    <input id='phone' type='text' value={this.state.phone} onChange={this.onTypeText}/>
                </div>
                <div className='email_form'>
                    <label className='label' htmlFor='email'>Email<span className='required'>*</span></label>
                    <span style={{color: "red", display: this.state.visEmail}}>Pole email musi zostać uzupełnione i zawierać znak @</span>
                    <input id='email' type='email' value={this.state.email} onChange={this.onTypeText}/>
                </div>
                <div className='date_form'>
                    <label className='label' htmlFor='date'>Podaj datę realizacji zamówienia<span className='required'>*</span></label>
                    <DateTimePicker/>
                    <p className='descrInput'>- zamówienia można składać na minimum 7 dni przed datą realizacji;
                        <br/>- może zdarzyć się, że ze względu na mnogą ilość zamówień w podanym terminie nie będziemy w stanie wykonać dla Państwa usługi - w takim przypadku poinformujemy Państwa telefonicznie w przeciągu 24h;
                        <br/>- po przyjęciu zamówienia do realizacji otrzymają Państwo wiadomość email z danymi do przelewu na kwotę 10% wartości zamówienia - <strong>uiszczenie wpłaty jest gwarantem wykonania usługi.</strong>
                    </p>
                </div>
                <div className='delivery_option_form'>
                    <label className='label' htmlFor='delivery pickUp '>Odbiór własny lub dowóz<span className='required'>*</span></label>
                    <p className='descrInput'>- koszt dowozu ustalany jest w zależności od trasy do przebycia oraz od kwoty zamówienia.</p>
                    <span style={{color: "red", display: this.state.visDelivery}}>Proszę zaznaczyć opcję dostawy</span>
                    <div className='checkbox-container'>
                        <input id='delivery' type='checkbox' checked={this.state.delivery} onChange={this.onTypeCheck}/>
                        <label className='labelCheckbox' htmlFor='delivery'>Dowóz</label>
                    </div>
                    <div className='checkbox-container'>
                        <input id='pickUp' type='checkbox' checked={this.state.pickUp} onChange={this.onTypeCheck}/>
                        <label className='labelCheckbox' htmlFor='pickUp'>Odbiór własny<span className='optional'>  (dodatkowo płatne)</span></label>
                    </div>
                </div>
                <div className='address_form'>
                    <label className='label' htmlFor='address'>Adres Dostawy<span className='required'>*</span></label>
                    <textarea className='textarea_form' id='address' value={this.state.address} onChange={this.onTypeText}/>
                </div>
                <div className='special_requests'>
                    <label className='label' htmlFor='request'>Dodatkowe informacje: <span className='optional'> alergie na składniki, dodatkowy sprzęt serwisowy, komentarze ...</span></label>
                    <textarea className='textarea_form' id='request' value={this.state.request} onChange={this.onTypeText}/>
                </div>

            </form>
        )
    }
}