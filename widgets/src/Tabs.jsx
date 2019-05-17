import React from 'react';
import Header from './components/header';
import Article from './components/article';


class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(index) {
        this.setState({ index });
    }

    render() {
        const titles = ['one', 'two', 'three'];
        const articles = ['I am the first', 'Second pane here', 'Third pane here'];

        return (
        <>
            <div>
                <Header titles={titles} index={this.state.index} changeTab={this.changeTab} />
                <Article content={articles} index={this.state.index}/>
            </div>

        </>
        )

    }
}

export default Tabs;