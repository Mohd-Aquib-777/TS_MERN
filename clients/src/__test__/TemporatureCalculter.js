import React from "react";

const scaleNames = {
    f: 'Farenheit',
    c: 'Celsius'
}


function tryConvert(convert, temperature){
    let input = parseFloat(temperature);
    if(Number.isNaN(input))
    {
        return '';
    }
    let output = convert(input);
    output = output.toString();
    return output; 
}

function toCelsius(farenheit){
    return (farenheit-32)*5/9
}

function toFarenheit(celsius){
    return (9*celsius/5)+32
}

function VerdictPoint(props){
    if(props.celcius>=100){
        return (<>
            <span>Water is boiled</span>
        </>)
    }
    return (<>
        <span>water is not boiled</span>
    </>) 
}

class Temperature extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.toChangeTemperature(e.target.value)
    }

    render(){
        let temperature = this.props.temperature;
        let scale = this.props.scale;
        return (
            <>
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input type="text" value={temperature}
                    onChange={this.handleChange} />
                </fieldset>
            </>
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeCelsius = this.handleChangeCelsius.bind(this)
        this.handleChangeFarenheit = this.handleChangeFarenheit.bind(this)
        this.state = {temperature:'', scale:'c'}
        
    }

    handleChangeCelsius(temperature){
        this.setState({scale:'c',temperature})
    }

    handleChangeFarenheit(temperature){
        this.setState({scale:'f',temperature})
    }

    render(){
        let temperature = this.state.temperature;
        let scale = this.state.scale;
        let celsius = scale==='f' ? tryConvert(toCelsius,temperature):temperature;
        let farenheit = scale==='c' ? tryConvert(toFarenheit,temperature):temperature;
        return (
            <>
              <Temperature scale="c" temperature={celsius} toChangeTemperature={this.handleChangeCelsius} />
              <Temperature scale="f" temperature={farenheit} toChangeTemperature={this.handleChangeFarenheit} />  
              <VerdictPoint celcius={celsius}/>
            </>
        )
    }   


}

export{
    Calculator
}