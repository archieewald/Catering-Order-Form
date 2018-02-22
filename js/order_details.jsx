import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';



export default class OrderDetails extends React.Component{
    constructor(props) {
        super(props);
        Moment.locale('pl');
        momentLocalizer();
    }
    handleChangeText= (event) => {
        this.props.onChangeText(event.target);
    }
    handleChangeRadio= (event) => {
        this.props.onChangeRadio(event.target);
    }
    handleChangeDate = (value) => {
        this.props.onChangeDate(value);
    }

    render(){
        return(
            <div className='order_details box'>
                <h2 className='order_details_title'>
                    1) Dane kontaktowe, szczegóły dostawy oraz uwagi
                </h2>
                <hr />
                 {/*okienko walidacji wyskakuje dla wszystkich formularzy*/}
                <div className='name_form'>
                    <label
                        className='label'
                        htmlFor='name'>
                        Imię i nazwisko
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visName}}>
                        Pole imię musi zostać uzupełnione
                    </span>
                    <input
                        id='name'
                        type='text'
                        value={this.props.name}
                        onChange={this.handleChangeText}
                    />
                    <p className='descrInput'>
                        *lub nazwa firmy
                    </p>
                </div>
                <div className='phone_form'>
                    <label className='label' htmlFor='phone'>
                        Numer telefonu
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visPhone}}>
                        Pole z numerem telefonu musi zostać uzupełnione
                    </span>
                    <input id='phone' type='text' value={this.props.phone} onChange={this.handleChangeText}/>
                </div>
                <div className='email_form'>
                    <label className='label' htmlFor='email'>
                        Email
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visEmail}}>
                        Pole email musi zostać uzupełnione i zawierać znak @
                    </span>
                    <input id='email' type='email' value={this.props.email} onChange={this.handleChangeText}/>
                </div>
                <div className='date_form'>
                    <label className='label' htmlFor='date'>
                        Podaj datę realizacji zamówienia
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visDate}}>
                        Pole z datą musi zostać uzupełnione
                    </span>
                    <DateTimePicker
                        id='date'
                        time={false}
                        value={this.props.date}
                        onChange={value => this.handleChangeDate({ value })}
                        placeholder='Wybierz termin realizacji'
                        defaultValue={"orange"}
                    />
                    <label className='label' htmlFor='time'>
                        Podaj godzinę realizacji zamówienia
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visTime}}>
                        Pole z godziną musi zostać uzupełnione
                    </span>
                    <input type={'time'} id='time' value={this.props.time} pattern="[0-9]{2}:[0-9]{2}"  onChange={this.handleChangeText}/>
                    <p className='descrInput'>
                        - zamówienia można składać na minimum 7 dni przed datą realizacji;
                        <br/>- może zdarzyć się, że ze względu na mnogą ilość zamówień w podanym terminie nie będziemy w stanie wykonać dla Państwa usługi - w takim przypadku poinformujemy Państwa telefonicznie w przeciągu 24h;
                        <br/>- po przyjęciu zamówienia do realizacji otrzymają Państwo wiadomość email z podsumowaniem oferty oraz z danymi do przelewu na kwotę 10% wartości zamówienia - <strong>uiszczenie wpłaty jest gwarantem wykonania usługi.</strong>
                    </p>
                </div>
                <div className='delivery_option_form'>
                    <label className='label' htmlFor='delivery pickUp '>
                        Odbiór własny lub dowóz
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <p className='descrInput'>
                        - koszt dowozu ustalany jest w zależności od trasy do przebycia oraz od kwoty zamówienia.
                    </p>
                    <span style={{color: "red", display: this.props.visDelivery}}>
                        Proszę zaznaczyć opcję dostawy
                    </span>
                    <div className='checkbox-container'>
                        <input id='delivery' name='deliveryR' type='radio' value='delivery' checked={this.props.deliveryR === 'delivery'} onChange={this.handleChangeRadio}/>
                        <label className='labelCheckbox' htmlFor='delivery'>
                            Dowóz
                        </label>
                    </div>
                    <div className='checkbox-container'>
                        <input id='pickUp' name='deliveryR' type='radio' value='pickUp' checked={this.props.deliveryR === 'pickUp'} onChange={this.handleChangeRadio}/>
                        <label className='labelCheckbox' htmlFor='pickUp'>
                            Odbiór własny
                            <span className='optional'>
                                (dodatkowo płatne)
                            </span>
                        </label>
                    </div>
                </div>
                <div className='address_form' style={{display: this.props.deliveryR === 'delivery' ? 'block' : 'none'}}>
                    <label className='label' htmlFor='address'>
                        Adres Dostawy
                        <span className='required'>
                            *
                        </span>
                    </label>
                    <span style={{color: "red", display: this.props.visAddress}}>
                        Proszę podać adres dostawy
                    </span>
                    <textarea className='textarea_form' id='address' value={this.props.address} onChange={this.handleChangeText}/>
                </div>
                <div className='special_requests'>
                    <label className='label' htmlFor='request'>
                        Dodatkowe informacje:
                        <span className='optional'>
                            alergie na składniki, dodatkowy sprzęt serwisowy, komentarze ...
                        </span>
                    </label>
                    <textarea className='textarea_form' id='request' value={this.props.request} onChange={this.handleChangeText}/>
                </div>
            </div>

        )
    }
}


