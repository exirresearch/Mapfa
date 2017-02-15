import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/grid.css';
import 'styles/table.css';
import {persianNumberConvertor} from 'scripts/utility';

const Grid = React.createClass({
    _handleSelect(id) {
        this.props.onItemClick(id);
    },

    _handleSortClick(column, order, prev_col) {
        this.props.onSortClick(column, order, prev_col);
    },

    _makeItems() {
        return this.props.items.map((item, i) => (
                <tr key={item.ResumeId} className={(item.ResumeId === this.props.selected) ? 'warning' : ''}>
                    <td>{persianNumberConvertor(item.ProfileId)}</td>
                    <td>
                        <a onClick={this._handleSelect.bind(this, item.ResumeId)} style={{cursor: 'pointer'}}>
                            {item.FullPersianName}
                        </a>
                    </td>
                    <td>{persianNumberConvertor(item.UnitName)}</td>
                    <td style={{textAlign: 'center'}}>{persianNumberConvertor(item.WrittenArticles)}</td>
                    <td style={{textAlign: 'center'}}>{persianNumberConvertor(item.Citation)}</td>
                    <td style={{textAlign: 'center'}}>{persianNumberConvertor(item.HIndex)}</td>
                    <td style={{textAlign: 'center'}}>
                        <div className="selected-sign">{persianNumberConvertor(item.PerArticleCitation)}</div>
                    </td>
                </tr>
            )
        );
    },

    render() {
        const [order, column] = [this.props.sort_order, this.props.sort_column];
        let [name, unit, article, citation, h_index, per_citation] = ["fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort"];
        switch (column) {
            case 'FullPersianName':
                if (order === 'asc') {
                    name = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    name = 'fa fa-sort-desc _green';
                }
                else {
                    name = 'fa fa-sort';
                }
                break;
            case 'UnitName':
                if (order === 'asc') {
                    unit = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    unit = 'fa fa-sort-desc _green';
                }
                else {
                    unit = 'fa fa-sort';
                }
                break;
            case 'WrittenArticles':
                if (order === 'asc') {
                    article = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    article = 'fa fa-sort-desc _green';
                }
                else {
                    article = 'fa fa-sort';
                }
                break;
            case 'Citation':
                if (order === 'asc') {
                    citation = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    citation = 'fa fa-sort-desc _green';
                }
                else {
                    citation = 'fa fa-sort';
                }
                break;
            case 'HIndex':
                if (order === 'asc') {
                    h_index = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    h_index = 'fa fa-sort-desc _green';
                }
                else {
                    h_index = 'fa fa-sort';
                }
                break;
            case 'PerArticleCitation':
                if (order === 'asc') {
                    per_citation = 'fa fa-sort-asc _green';
                }
                else if (order === 'desc') {
                    per_citation = 'fa fa-sort-desc _green';
                }
                else {
                    per_citation = 'fa fa-sort';
                }
                break;
            default:
                [name, unit, article, citation, h_index, per_citation] = ["fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort", "fa fa-sort"];
        }
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th width="100">#</th>
                    <th>
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'FullPersianName', order, column)}>
                            نام و نام خانوادگی&nbsp;
                            <i className={name}/>
                        </span>
                    </th>
                    <th width="60">
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'UnitName', order, column)}>
                            واحد&nbsp;
                            <i className={unit}/>
                        </span>
                    </th>
                    <th style={{textAlign: 'center'}} width="90">
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'WrittenArticles', order, column)}>
                            مقالات&nbsp;
                            <i className={article}/>
                        </span>
                    </th>
                    <th style={{textAlign: 'center'}} width="90">
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'Citation', order, column)}>
                            ارجاعات&nbsp;
                            <i className={citation}/>
                        </span>
                    </th>
                    <th style={{textAlign: 'center'}} width="90">
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'HIndex', order, column)}>
                            H-INDEX&nbsp;
                            <i className={h_index}/>
                        </span>
                    </th>
                    <th width="110" style={{textAlign: 'center'}}>
                        <span style={{cursor: 'pointer'}}
                              onClick={this._handleSortClick.bind(this, 'PerArticleCitation', order, column)}>
                            ارجاع به ازای مقالات&nbsp;
                            <i className={per_citation}/>
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {this._makeItems()}
                </tbody>
            </table>
        );
    }
});

$('[data-component=grid]').each((i, comp) => {
    ReactDOM.render(
        <Grid/>,
        comp
    );
});

export default Grid;
