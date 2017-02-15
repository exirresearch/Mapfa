import React from 'react';
import {persianNumberConvertor} from 'scripts/utility';

const Paginator = React.createClass({
    _makeItems() {
        // TODO make it right
        const current_page = this.props.current_page;
        const total_pages = this.props.total_pages;
        const chunk = 5;
        let items = [];
        if (total_pages > 5) {
            switch (current_page) {
                case 1:
                case 2:
                    for (let i = 1; i <= chunk; i++) {
                        items.push(
                            <li key={i} className={(i === current_page) ? "active" : ""}
                                onClick={this._handleClick.bind(this, i)}>
                                <span>{persianNumberConvertor(i)}</span>
                            </li>
                        );
                    }
                    break;
                case total_pages:
                case total_pages - 1:
                    for (let i = total_pages - chunk; i <= total_pages; i++) {
                        items.push(
                            <li key={i} className={(i === current_page) ? "active" : ""}
                                onClick={this._handleClick.bind(this, i)}>
                                <span>{persianNumberConvertor(i)}</span>
                            </li>
                        );
                    }
                    break;
                default:
                    for (let i = current_page - 2; i <= current_page + 2; i++) {
                        items.push(
                            <li key={i} className={(i === current_page) ? "active" : ""}
                                onClick={this._handleClick.bind(this, i)}>
                                <span>{persianNumberConvertor(i)}</span>
                            </li>
                        );
                    }
                    break;
            }
        }
        else {
            for (let i = 1; i <= total_pages; i++) {
                items.push(
                    <li key={i} className={(i === current_page) ? "active" : ""}
                        onClick={this._handleClick.bind(this, i)}>
                        <span>{persianNumberConvertor(i)}</span>
                    </li>
                );
            }
        }
        return items;
    },

    _handleClick(index) {
        this.props.onPageClick(index);
    },

    _handlePageSizeClick(size) {
        this.props.onPageSizeClick(size);
    },

    render() {
        return (
            <nav style={{background: '#ededed', margin: '15px 0', marginTop: 2}}>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: 'center'}}>
                        <ul className="pagination">
                            <li
                                className={(this.props.is_first) ? "disabled" : ""}
                                onClick={(this.props.is_first) ? undefined : this._handleClick.bind(this,
                                    1)}>
                            <span>
                                <span>&laquo;&laquo;</span>
                            </span>
                            </li>
                            <li
                                className={(this.props.is_first) ? "disabled" : ""}
                                onClick={(this.props.is_first) ? undefined : this._handleClick.bind(this,
                                    this.props.current_page - 1)}
                            >
                            <span>
                                <span>&laquo;</span>
                            </span>
                            </li>
                            {this._makeItems()}
                            <li className={(this.props.is_last) ? "disabled" : ""}
                                onClick={(this.props.is_last) ? undefined : this._handleClick.bind(this,
                                    this.props.current_page + 1)}>
                            <span>
                                <span>&raquo;</span>
                            </span>
                            </li>
                            <li className={(this.props.is_last) ? "disabled" : ""}
                                onClick={(this.props.is_last) ? undefined : this._handleClick.bind(this,
                                    this.props.total_pages)}>
                            <span>
                                <span>&raquo;&raquo;</span>
                            </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="pagination pull-left" style={{marginLeft: 20}}>
                            <li className="title"><span>تعداد نتایج در هر صفحه:</span></li>
                            <li className={(this.props.page_size === 15) ? "active" : ""}
                                onClick={this._handlePageSizeClick.bind(this, 15)}><span>۱۵</span></li>
                            <li className={(this.props.page_size === 50) ? "active" : ""}
                                onClick={this._handlePageSizeClick.bind(this, 50)}><span>۵۰</span></li>
                            <li className={(this.props.page_size === 100) ? "active" : ""}
                                onClick={this._handlePageSizeClick.bind(this, 100)}><span>۱۰۰</span></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default Paginator;
