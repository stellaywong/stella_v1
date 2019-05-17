import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            date: new Date(),
            
            
        };

        this.tick = this.tick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    } 

    tick(){
        const date = new Date();
            this.setState({ date: date });
    }
    
    componentDidMount() {
        this.intervalId = setInterval(this.tick, 1000);
        // const date = new Date();
        //     this.setState({date: date});

    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        let time = this.state.date.toLocaleTimeString();
        let date = this.state.date.toDateString();
        
        
        return (
            <>
                <div id="clock">
                    <p>
                        <span>Time:</span> 
                        <span>{time}</span>
                    </p>
                    <p>
                        <span>Current Date:</span>
                        <span>{date}</span>
                    </p>
                </div>
            </>
        )
        
    }
}

 
export default Clock;