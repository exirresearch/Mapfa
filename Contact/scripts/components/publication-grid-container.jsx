import React from 'react';
import ReactDOM from 'react-dom';

import GridTable from 'components/grid-table';

const PublicationGridContainer = React.createClass({
    _sortPublications(column, order) {
        const pubs = this.state.publications;
        let result = [];
        switch (order) {
            case "asc":
                result = pubs.sort((a, b) => {
                    // if (a[column] > b[column])
                    //     return 1;
                    // else if (a[column] === b[column])
                    //     return 0;
                    // return -1;
                    return a[column].localeCompare(b[column]);
                });
                break;
            case "desc":
                result = pubs.sort((a, b) => {
                    // if (a[column] < b[column])
                    //     return 1;
                    // else if (a[column] === b[column])
                    //     return 0;
                    // return -1;
                    return b[column].localeCompare(a[column]);
                });
                break;
            default:
                throw new Error("Sort order is unknown!");
        }
        return result;
    },

    _handleSortClick(column) {
        const order_type = this.state.order_type;
        const order_by = this.state.order_by;
        let new_publications;
        let new_order;
        if (column === order_by) {
            if (order_type === 'asc')
                new_order = 'desc';
            else if (order_type === 'desc')
                new_order = 'asc';
        }
        else {
            new_order = 'desc';
        }
        new_publications = this._sortPublications(column, new_order);
        this.setState({
            publications: new_publications,
            order_by: column,
            order_type: new_order
        });
    },

    _handleItemClick() {

    },

    render() {
        return (
            <div className="grid-container full-width">
                <GridTable
                    items={this.state.publications}
                    current_page={1}
                    page_size={100}
                    sort_column={this.state.order_by}
                    sort_order={this.state.order_type}
                    onSortClick={this._handleSortClick}
                    onItemClick={this._handleItemClick}
                />
            </div>
        );
    },

    getInitialState() {
        return {
            publications: [],
            order_by: "",
            order_type: ""
        };
    },

    componentWillMount() {
        const publications = require(`../../Json-models/${this.props.source}.json`);
        this.setState({publications: publications});
    }
});

$('[data-component=publication-grid-container]').each((i, comp) => {
    const source = $(comp).data('source');
    ReactDOM.render(<PublicationGridContainer source={source}/>, comp);
});
