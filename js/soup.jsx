import React from 'react';
import ReactDOM from 'react-dom';


export default class Soup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
            quantity: 8,
            bought: false
        }
    }
    handleChangeCheck = (event) => {
        this.setState({
            [event.target.id]: event.target.checked
        }, ()=>{
            this.props.onBuy(this.state, this.state.bought);
        })
    }
    onChangeQuantity = (event) => {
        this.setState({
            [event.target.id]: Number(event.target.value)
        }, ()=>{
            this.props.onBuyQuantity(this.state, this.state.bought);
        })
    }
    render() {
        return (
            <tr key={this.props.keyP} id={this.props.name}>
                <td>
                    <input
                        type='checkbox'
                        id='bought'
                        checked={this.state.bought}
                        onChange={this.handleChangeCheck}
                    />
                </td>
                <td>{this.props.name}</td>
                <td>{this.props.weight}</td>
                <td>{this.props.price}</td>
                <td>
                    <input
                        style={{width:'40px'}}
                        type='number' id={'quantity'}
                        min={8}
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                    />
                </td>
            </tr>
        )
    }
}