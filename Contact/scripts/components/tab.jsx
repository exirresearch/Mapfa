import React from 'react';
import 'styles/tab.css';

export const Tabs = React.createClass({
    displayName: 'Tabs',
    getDefaultProps() {
        return {
            selected: 0
        };
    },
    getInitialState() {
        return {
            selected: this.props.selected
        };
    },
    handleClick(center_type, index, event) {
        event.preventDefault();
        this.props.onTabClick(center_type, () => {
            this.setState({
                selected: index
            });
        });
    },
    _renderTitles() {
        const labels = (child, index) => {
            let activeClass = (this.state.selected === index ? 'active' : '');
            return (
                <li key={index}>
                    <a href="#"
                       className={activeClass}
                       onClick={this.handleClick.bind(this, child.props.center_type, index)}>
                        {child.props.label}
                    </a>
                </li>
            );
        };
        return (
            <ul className="tabs__labels">
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    },
    _renderContent() {
        return (
            <div className="tabs__content">
                {this.props.children[this.state.selected]}
            </div>
        );
    },
    render() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
});

export const Pane = React.createClass({
    displayName: 'Pane',
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

