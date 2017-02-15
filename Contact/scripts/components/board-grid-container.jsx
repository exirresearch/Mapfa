import React from 'react';
import ReactDOM from 'react-dom';

import GridTable from 'components/grid-table';
import Paginator from 'components/paginator';

const BoardGridContainer = React.createClass(
    {
        _setPageCount(page_size, total_items) {
            const x = Math.ceil(total_items / page_size);
            this.setState({total_pages: x});
        },

        _getData(url, PageIndex, PageSize, OrderByColumn, SortOrder, cb = () => (undefined)) {
            const grid = this;
             this.setState({grid_loading: true});
            if (window._grid_ajax) {
                window._grid_ajax.abort();
            }
            window._grid_ajax = $.ajax(
                {
                    url: url,
                    data: {
                        PageIndex: PageIndex,
                        PageSize: PageSize,
                        OrderByColumn: OrderByColumn,
                        SortOrder: SortOrder
                    },
                    timeout: 10000,
                    cache: true,
                    success: (data, status) => {
                        const total_items = data.TotalCount;
                        this.setState({total_items: total_items});
                        grid.setState({items: data.Result, grid_loading: false});
                        this._setPageCount(this.state.page_size, total_items);
                        cb();
                    }
                }
            );
        },

        _handlePageClick(i) {
            if (this.state.current_page !== i)
                this._getData(
                    this.props.url,
                    i,
                    this.state.page_size,
                    this.state.order_by,
                    this.state.order_type,
                    () => {
                        this.setState({current_page: i});
                    });
        },

        _handlePageSizeClick(size) {
            if (this.state.page_size !== size)
                this._getData(this.props.url,
                    1,
                    size,
                    this.state.order_by,
                    this.state.order_type,
                    () => {
                        this.setState({page_size: size, current_page: 1});
                        this._setPageCount(this.state.page_size,
                            this.state.total_items);
                    });
        },

        _handleItemClick() {
        },

        _handleSortClick(column) {
            const order_type = this.state.order_type;
            const order_by = this.state.order_by;
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
            this._getData(
                this.props.url, 
                1, 
                this.state.page_size, 
                column, 
                new_order, 
                () => {
                    this.setState({
                        current_page: 1,
                        order_by: column,
                        order_type: new_order
                    });
                }
            );    
        },

        render() {
            return (
                <div className="grid-container">
                    <div className="container-fluid">
                        <div className="row no-gutter">
                            <div className="col-md-6">
                                <div className="detail-container">
                                    <div className="detail__header">
                                        <img src="/Content/styles/images/board-list-title.png" 
                                            alt="فهرست اعضای هیئت علمی که تا کنون در این سامانه ثبت نام کرده‌اند"/>
                                    </div>
                                </div>
                                <div className="detail__body" style={{boxShadow: 'none', border: 'none', height: 710}}>
                                    <div className="auto-width">
                                        <GridTable
                                            current_page = {this.state.current_page}
                                            items = {this.state.items}
                                            loading = {this.state.grid_loading}
                                            onItemClick = {this._handleItemClick}
                                            onSortClick = {this._handleSortClick}
                                            page_size = {this.state.page_size}
                                            sort_column = {this.state.order_by}
                                            sort_order = {this.state.order_type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="detail-container">
                                    <div className="detail__header">
                                        <img src="/Content/styles/images/board-guide-title.png" alt="روش ساخت سی وی در سایمد"/>
                                    </div>
                                    <div className="detail__body" style={{padding: 30, height: 710}}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div style={{textAlign: 'justify'}}>
                                                        <p>کلیه اعضای محترم هیئت علمی دانشگاه آزاد اسلامی ,
                                                         معاونت علوم پزشکی میتوانند اقدام به ساخت سی وی اختصاصی در
                                                         این سامانه نمایند که بر اساس دامنه اختصاصی و یا دامنه بر روی دامنه دانشگاه فعال خواهد شد.</p>
                                                        <p>این سایت اختصاصی کلیه قابلیت ها و امکانات کامل یک سی وی اکادمیک را دراختیار
                                                         داشته و پژوهشگر را از داشتن چندین سی وی متعدد بی نیاز خواهد نمود.</p>
                                                        <p>برای آشنایی بیشتر با امکانات و قابلیت های این ماژول و همچنین روش
                                                         ثبت نام و ایجاد سی وی لطفا مستندات این صفحه را مطالعه نمایید.</p>
                                                        <p>همچنین در صورت بروز هر گونه اشکال و یا نیاز به راهنمایی در
                                                         بخش محتوایی با شماره تماس ۴۷۳۵۱۷۰۲ و در بخش فنی
                                                         و نرم افزار با شماره تلفن های ۸۸۵۵۳۸۷۵ و یا ۸۸۵۵۳۸۶۴ تماس حاصل فرمایید</p>
                                                    </div>
                                                    <br/>
                                                </div>
                                                <div className="col-md-4" style={{textAlign: 'center'}}>
                                                    <a href="http://scimed.iau.ac.ir:8082/reg/step/agreement.aspx" target="_blank">
                                                        <img src="/Content/styles/images/start-from-here.png" style={{marginRight: 30}} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="row no-gutter">
                                                <div className="col-md-12">
                                                    <a href="#" className="inline-image-link">
                                                        <img src="/Content/styles/images/cv-introduction-link.png" />
                                                    </a>
                                                    <a href="#" className="inline-image-link">
                                                        <img src="/Content/styles/images/cv-signup.png" />
                                                    </a>
                                                    <a href="#" className="inline-image-link">
                                                        <img src="/Content/styles/images/indexing-tips.png" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <Paginator
                                onPageClick = {this._handlePageClick}
                                total_pages = {this.state.total_pages}
                                onPageSizeClick = {this._handlePageSizeClick}
                                current_page = {this.state.current_page}
                                page_size = {this.state.page_size}
                                is_first = {this.state.current_page === 1}
                                is_last = {this.state.current_page === this.state.total_pages}
                            />
                        </div>
                    </div>
                </div>
            );
        },

        getInitialState() {
            return {
                current_page: 1,
                grid_loading: false,
                items: [],
                order_by: 'id', 
                order_type: 'desc',
                page_size: 15,
                total_items: 0,
                total_pages: 0
            };
        },

        componentWillMount() {
            this._getData(this.props.url, this.state.current_page, this.state.page_size, this.state.order_by, this.state.order_type);
        }
    }
);

$('[data-component=board-grid-container]').each((i, comp) => {
    const url = $(comp).data('url');
    ReactDOM.render(<BoardGridContainer url={url} />, comp);
});
