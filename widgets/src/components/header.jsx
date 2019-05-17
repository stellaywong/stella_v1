import React from 'react';
import Article from './article';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.mapTitle = this.mapTitle.bind(this);
        this.chosenTab = this.chosenTab.bind(this);
    }

    chosenTab(idx) {
        this.props.changeTab(idx);
    }

    mapTitle(titles){
        return titles.map((title, idx) => {
            return (
                <li key={idx} onClick={() => this.chosenTab(idx)}>
                    <h1>{title}</h1>
                </li>
            );
        });
    }
    
    render() {

        let titles = this.mapTitle(this.props.titles);
        
        return <ul>{titles}
                </ul>;
    }
    
}

export default Header;
