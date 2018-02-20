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
    }
    render(){
        return(
            <form className='order_details'>
                <h2 className='order_details_title'>1) Dane kontaktowe, szczegóły dostawy oraz uwagi</h2>
                <hr />
                <div className='name_form'>
                    <label className='label' htmlFor='name'>Imię i nazwisko<span className='required'>*</span></label>
                    <input id='name' type='text' onChange={this.props.onTypeText}/>
                    <p className='descrInput'>*lub nazwa firmy</p>
                </div>
                <div className='phone_form'>
                    <label className='label' htmlFor='phone'>Numer telefonu<span className='required'>*</span></label>
                    <input id='phone' type='text' onChange={this.props.onTypeText}/>
                </div>
                <div className='email_form'>
                    <label className='label' htmlFor='email'>Email<span className='required'>*</span></label>
                    <input id='email' type='text' onChange={this.props.onTypeText}/>
                </div>
                <div className='date_form'>
                    <label className='label' htmlFor='date'>Podaj datę realizacji zamówienia<span className='required'>*</span></label>
                    <DateTimePicker/>
                    <p className='descrInput'>- zamówienia można składać na minimum 7 dni przed datą realizacji;
                        <br/>- może zdarzyć się, że ze względu na mnogą ilość zamówień w podanym terminie nie będziemy w stanie wykonać dla Państwa usługi - w takim przypadku poinformujemy Państwa telefonicznie w przeciągu 24h;
                        <br/>- po przyjęciu zamówienia do realizacji otrzymają Państwo wiadomość email z danymi do przelewu na kwotę 10% wartości zamówienia - uiszczenie wpłaty jest gwarantem wykonania usługi.
                    </p>
                </div>
                <div className='delivery_option_form'>
                    <label className='label' htmlFor='delivery pickUp '>Odbiór własny lub dowóz<span className='required'>*</span></label>
                    <p className='descrInput'>- koszt dowozu ustalany jest w zależności od trasy do przebycia oraz od kwoty zamówienia.</p>
                    <div className='checkbox-container'>
                        <input id='delivery' type='checkbox' onChange={this.props.onTypeCheck}/>
                        <label className='labelCheckbox' htmlFor='delivery'>Dowóz</label>
                    </div>
                    <div className='checkbox-container'>
                        <input id='pickUp' type='checkbox' onChange={this.props.onTypeCheck}/>
                        <label className='labelCheckbox' htmlFor='pickUp '>Odbiór własny<span className='optional'>  (dodatkowo płatne)</span></label>
                    </div>
                </div>
                <div className='adress_form'>
                    <label className='label' htmlFor='adress'>Adres Dostawy<span className='required'>*</span></label>
                    <textarea id='adress' onChange={this.props.onTypeText}/>
                </div>
                <div className='special_requests'>
                    <label className='label' htmlFor='request'>Dodatkowe informacje: <span className='optional'> alergie na składniki, dodatkowy sprzęt serwisowy, komentarze ...</span></label>
                    <textarea id='request' onChange={this.props.onTypeText}/>
                </div>

            </form>
        )
    }
}