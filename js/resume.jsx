import React from 'react';
import ReactDOM from 'react-dom';

export default class Resume extends React.Component{
    render(){
        const orderedMenu = this.props.basket.map( element => {
            return (
            <tr key={element.name}>
                <td>{element.name}</td>
                <td>{element.quantity}</td>
                <td>{element.cost} zł</td>
            </tr>
            )
        });
        const allCosts = this.props.basket.map( element => {
            return element.cost
        });
        const sum = allCosts.reduce((prev, curr) => {
            return prev + curr
        });
        return(
            <div className='resume-container'>
                <h2 className='resume-title'>
                    Twoje zamówienie
                </h2>
                <div className='resume-headers'>
                    <div className='header-left'>
                        <h3 className='resume-title'>
                            Dane zamawiającego:
                        </h3>
                    </div>
                    <div className='header-right'>
                        <h3 className='resume-menu-title'>
                            Państwa Menu
                        </h3>
                    </div>
                </div>
                <hr />
                 <div className='resume-content'>
                    <div className='resume-details'>
                        <p className='name'>
                            <strong>
                                Zamawiający:
                            </strong>
                            {this.props.personalDetails.name}
                        </p>
                        <p className='email'>
                            <strong>
                                Email:
                            </strong>
                            {this.props.personalDetails.email}
                        </p>
                        <p className='phone'>
                            <strong>
                                Numer telefonu:
                            </strong>
                            {this.props.personalDetails.phone}
                        </p>
                        <p className='date'>
                            <strong>
                                Data realizacji:
                            </strong>
                            {this.props.personalDetails.date}
                        </p>
                        <p className='time'>
                            <strong>
                                Godzina realizacji:
                            </strong>
                            {this.props.personalDetails.time}
                        </p>
                        <p className='delivery'>
                            <strong>
                                Sposób dostawy:
                            </strong>
                            {this.props.personalDetails.delivery === 'delivery' ? 'Dowóz pod wskazany adres' : 'Odbiór własny'}
                        </p>
                        <p className='address' style={{display: this.props.personalDetails.delivery === 'delivery' ? 'block' : 'none'}}>
                            <strong>
                                Adres dostawy:
                            </strong>
                            {this.props.personalDetails.address}
                        </p>
                        <p className='request'>
                            <strong>
                                Komentarz:
                            </strong>
                            {this.props.personalDetails.request}
                        </p>
                    </div>
                    <div className='resume-menu'>
                        <table className='menu-table'>
                            <thead>
                                <tr>
                                    <th>Danie</th>
                                    <th>Ilość</th>
                                    <th>Koszt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedMenu}
                                <tr>
                                    <td style={{colspan: '2'}}>
                                        Suma całkowita:
                                    </td>
                                    <td>
                                        {sum}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}