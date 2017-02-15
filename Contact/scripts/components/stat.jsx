import React from 'react';
import {persianNumberConvertor} from 'scripts/utility';
import 'styles/stat.css';

const Stat = React.createClass({
    _makeItems() {
        return this.props.items.map((item, i) => (
            <div className="stat__item" key={i}>
                <div className="stat__name">
                    {Object.keys(item)[0]}
                </div>
                <div className="stat__value">
                    {persianNumberConvertor(item[Object.keys(item)[0]])}
                </div>
            </div>
        ));
    },

    render() {
        return (
            <div className="stat">
                <div className="stat__separator"/>
                <div className="stat__pic">
                    <i className="fa fa-pie-chart fa-4x"/>
                </div>
                <div className="stat__title">
                    آمــــار در یـک نــــگاه
                </div>
                <div className="stat__body">
                    {this._makeItems()}
                </div>
                <div className="stat__separator stat__separator_left"/>
            </div>
        );
    }
});

export default Stat;
