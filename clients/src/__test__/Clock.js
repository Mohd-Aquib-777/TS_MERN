import React from "react";
import './Composition.css';

function Clock(){
    return (<h4>
        {new Date().toLocaleTimeString()}
    </h4>)
}

class ShowTimeByClass extends React.Component{
    constructor(props){
        super(props)
        this.state = {date: new Date()}
    }

    componentDidMount(){
        this.timerId = setInterval(()=>this.tick(),1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    tick(){
        this.setState({date:new Date()})
    }

    render(){
        return (<h5>the time is now {this.state.date.toLocaleTimeString()}</h5>)
    }
}

function ShowName(props){
    return (<h2>hello {props.name}</h2>);
}

class ShowByCLass extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:props.name};
    }
    render(){
        return (
            <h4>show by class {this.state.name}</h4>
        );
    }
}

function Form(){
    function submitHandler(e){
        e.preventDefault();
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <input type="text" />
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

class Toggle extends React.Component{
    constructor(props){
        super(props)
        this.state = {toggle:false}
        this.handleClick = this.handleClick.bind(this)    
    }

    handleClick(e){
        e.preventDefault();
        this.setState(prevState=>({
          toggle: !prevState.toggle,
        }));
    }

    render(){
        return (
            <form>
                <button onClick={this.handleClick}>{this.state.toggle?"OFF":"ON"}</button>
            </form>
        )
    }


    
}

class Blog extends React.Component{
    constructor(props){
        super(props)
    }
    SideBar(){
        return (
            <ul>
                {
                    this.props.posts.map(e=>
                        <li key={e.id}>{e.title}</li>
                    
                    )
                }
            </ul>
        ) 
    }

    Content(){
        return (
            this.props.posts.map(e=>
                <>
                <div key={e.id}>
                    <h2>{e.title}</h2>
                    <p>{e.content}</p>
                </div>
                </>
            
            )
        )
    }

    render(){
        return (
            <>
                { this.SideBar()}
                <hr />
                {this.Content()}
            </>
        )
    }
}

class FormClass extends React.Component{
    constructor(props){
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {textValue:''}
    }

    submitHandler(e){
        e.preventDefault();
        console.log('-----------submit form',this.state)
    }

    changeHandler(e){
        this.setState({textValue:e.target.value});
    }

    render(){
        return (
            <>
                <span>{this.state.textValue}</span>
                <form onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.changeHandler} /> <br/>
                    <button type="submit" >Submit</button>
                </form>
                
            </>
        )
    }
}

function FancyBorder(props){
    return (
        <div className={'FancyBorder FancyBorder-'+props.color}>
            {props.children}
        </div>
    )
}

function Dailog(props){
    return(
        <FancyBorder color="blue">
            <div className='Dialog-title'>
                {props.title}
            </div>
            <div className="Dialog-message">
                {props.message}
            </div>   
        </FancyBorder>
    );
}

function WelcomeDailog(props){
    return (
        <Dailog title="Welcome" message="this s tile"/>
    )
}

export{Clock,ShowName,ShowByCLass, ShowTimeByClass,Form, Toggle,Blog,FormClass, WelcomeDailog};