import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
    render(){
        return(
            <PetShop cats={cats}/>
        )
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
});
