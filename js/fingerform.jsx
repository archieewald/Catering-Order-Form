import React from 'react';
import ReactDOM from 'react-dom';
import FingerDish from './fingerdish.jsx';

export default class FingerForm extends React.Component {
    onChange = (x) => {
        this.props.onBuy(x)
    }
    render() {
        const fingerfood = this.props.fingerfood.map((element, index) => {
            return (
                <FingerDish key={index} keyP={index} name={element.name} price={element.price} weight={element.weight} onBuy={this.props.onBuyCheck} onBuyQuantity={this.props.onBuyQuantity}/>
            )
        })
        return this.props.fingerfood.length > 0 && (
            <div className='fingerfood box'>
                <h2 className='fingerfood_title'>2) Wybierz swoje zakąski fingerfood - <span className='optional'>minimalnie 8 sztuk z rodzaju</span></h2>
                <hr />
                <table className='fingerTable'>
                    <thead>
                        <tr>
                            <th>Wybierz:</th>
                            <th>Nazwa zakąski</th>
                            <th> </th>
                            <th>Cena <i>(zł)</i></th>
                            <th>Ilość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fingerfood}
                    </tbody>
                </table>
            </div>
        )
    }
}