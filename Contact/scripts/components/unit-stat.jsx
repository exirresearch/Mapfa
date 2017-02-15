import React from 'react';
import Stat from 'components/stat';

const UnitStat = React.createClass({
    render() {
        return (
            <div className="unit-stat" style={{marginRight: -145}}>
                <Stat items={this.props.items}/>
            </div>
        );
    }
});

export default UnitStat;
