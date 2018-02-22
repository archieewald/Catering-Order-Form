import React from 'react';
import ReactDOM from 'react-dom';
import MainDish from './maindish.jsx';

export default class MainDishForm extends React.Component {
    onChange = (x) => {
        this.props.onBuy(x)
    }
    render() {
        const mains = this.props.mains.map((element, index) => {
            return (
                <MainDish
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
        return this.props.mains.length > 0 && (
            <div className='maindish box'>
                <h2 className='maindish_title'>
                    4) Wybierz dania głowne -
                    <span className='optional'>
                        minimalnie 8 porcji z rodzaju
                    </span>
                </h2>
                <hr />
                <table className='mainTable'>
                    <thead>
                    <tr>
                        <th>Wybierz:</th>
                        <th>Nazwa dania</th>
                        <th>Gramatura </th>
                        <th>Cena <i>(zł)</i></th>
                        <th>Ilość</th>
                    </tr>
                    </thead>
                    <tbody>
                        {mains}
                    </tbody>
                </table>
            </div>
        )
    }
}