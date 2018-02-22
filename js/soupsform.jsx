import React from 'react';
import ReactDOM from 'react-dom';
import Soup from './soup.jsx';

export default class SoupsForm extends React.Component {
    onChange = (x) => {
        this.props.onBuy(x)
    }
    render() {
        const soups = this.props.soups.map((element, index) => {
            return (
                <Soup
                    key={index}
                    keyP={index}
                    name={element.name}
                    price={element.price}
                    weight={element.weight}
                    onBuy={this.props.onBuyCheck}
                    onBuyQuantity={this.props.onBuyQuantity}
                />
            )
        })
        return this.props.soups.length > 0 && (
            <div className='soup box'>
                <h2 className='soup_title'>
                    3) Wybierz zupy -
                    <span className='optional'>
                        minimalnie 8 porcji z rodzaju
                    </span>
                </h2>
                <hr />
                <table className='soupTable'>
                    <thead>
                    <tr>
                        <th>Wybierz:</th>
                        <th>Nazwa zupy</th>
                        <th>Gramatura </th>
                        <th>Cena <i>(zł)</i></th>
                        <th>Ilość</th>
                    </tr>
                    </thead>
                    <tbody>
                        {soups}
                    </tbody>
                </table>
            </div>
        )
    }
}