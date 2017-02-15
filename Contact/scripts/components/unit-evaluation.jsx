import React from 'react';
import ReactDOM from 'react-dom';
import UnitStat from 'components/unit-stat';
import UnitDetail from 'components/unit-detail';
import GridTable from 'components/grid-table';
import Paginator from 'components/paginator';
import {Pane, Tabs} from 'components/tab';

import 'styles/circle-info.css';

const UnitEvaluation = React.createClass({
    _statDic: {
        TotalMembers: "تعداد کل اعضا:",
        MalesCount: "تعداد آقایان:",
        FemalesCount: "تعداد خانم‌ها:",
        TotalArticles: "تعداد کل مقالات اعضا:",
        TotalCitation: "تعداد کل ارجاعات:",
        ResearchCentersTotalCount: "تعداد کل واحدهای پژوهشی",
        UniversityCenterCount: "تعداد کل دانشگاه‌ها",
        CollegeCenterCount: "تعداد دانشکده‌ها",
        ScienceGroupCenterCount: "تعداد کل گروه‌های پژوهشی",
        ResearchCenterCount: "تعداد مراکز تحقیقاتی"
    },

    _setPageCount(page_size, total_items) {
        const x = Math.ceil(total_items / page_size);
        this.setState({total_pages: x});
    },

    _getData(url, PageIndex, PageSize, OrderByColumn, SortOrder, CenterType, cb = () => (undefined)) {
        const grid = this;
        this.setState({grid_loading: true});
        if (window._grid_ajax) {
            window._grid_ajax.abort();
        }
        window._grid_ajax = $.ajax(
            {
                url: url,
                data: {
                    CenterType: CenterType,
                    PageIndex: PageIndex,
                    PageSize: PageSize,
                    OrderByColumn: OrderByColumn,
                    SortOrder: SortOrder
                },
                timeout: 10000,
                cache: true,
                success: (data, status) => {
                    // console.log(data, status);
                    const general_statics = data.ResearchCenterStatistics;
                    const total_items = data.TotalCount;
                    this.setState({total_items: total_items});
                    let stat_items = [];
                    for (let i in general_statics) {
                        if (general_statics.hasOwnProperty(i)) {
                            let x = {};
                            if (i in this._statDic)
                                x[this._statDic[i]] = general_statics[i];
                            else
                                x[i] = general_statics[i];
                            stat_items.push(x);
                        }
                    }
                    grid.setState({items: data.Result, stat_items: stat_items, grid_loading: false});
                    this._setPageCount(this.state.page_size, total_items);
                    cb();
                },
                error: (xhr, status, error) => {
                    // console.log(error, status);
                },
                complete: () => {
                    grid.setState({grid_loading: false});
                }
            });
    },

    _getDetail(url, id, cb = () => (undefined)) {
        if (id === undefined) {
            this.setState({
                detail: {
                    FullName: undefined,
                    AfflictionName: undefined,
                    PresidencyName: undefined,
                    Phone: undefined,
                    Address: undefined,
                    WebSite: undefined,
                    id: undefined
                },
                selected_id: id,
                detail_loading: false
            });
            return;
        }
        const grid = this;
        this.setState({detail_loading: true});
        if (window._detail_ajax)
            window._detail_ajax.abort();
        window._detail_ajax = $.ajax({
            url: url,
            data: {Id: id},
            timeout: 10000,
            cache: true,
            success: (data, status) => {
                // console.log(data, status);
                this.setState({
                    detail: {
                        FullName: data.FullName,
                        AfflictionName: data.AfflictionName,
                        PresidencyName: data.PresidencyName,
                        Phone: data.Phone,
                        Address: data.Address,
                        id: data.id,
                        WebSite: data.WebSite
                    },
                    selected_id: id,
                    internal_articles: data.InternalArticleCount,
                    foreign_articles: data.ForeignArticleCount,
                    isi_article_count: data.ISIArticleCount,
                    scopus_article_count: data.ScopusArticleCount,
                    pubmed_article_count: data.PubmedArticleCount,
                    others_article_count: data.OtherArticleCount,
                    articles_with_foreign_cooperation: data.ArticledWithForeignCooperation,
                    articles_with_internal_cooperation: data.ArticledWithInternalCooperation,
                    research_article_count: data.ManagementArticleCount,
                    letter_to_chief_articles_count: data.LetterToChiefEditorArticleCount,
                    overview_article_count: data.OverviewArticleCount,
                    first_writer_count: data.FirstWriterCount,
                    responsible_writer_count: data.ResponsibleWriterCount,
                    after_second_writer_count: data.SecondToNextArticlesCount,
                    unit_score: data.ScoreBetweenDepartments,
                    detail_loading: false,
                    unit_count: data.UnitCount,
                    rank: data.RankingBetweenDepartments
                });
                cb();
            },
            error: (xhr, status, error) => {
                // console.log(error, status);
            },
            complete: () => {
                grid.setState({detail_loading: false});
            }
        });
    },

    _handleTabClick(i, cb = () => (undefined)) {
        this._getData(
            this.props.list_url,
            1,
            this.state.page_size,
            this.state.order_by,
            this.state.order_type,
            i,
            () => {
                this.setState({center_type: i, current_page: 1}, () => {
                    if (this.state.items.length === 0) {
                        this._getDetail(this.props.detail_url, undefined);
                    }
                    else {
                        this._getDetail(this.props.detail_url, this.state.items[0].Id);
                        this.setState({selected_id: this.state.items[0].Id});
                    }
                });
                cb();
            }
        );
    },

    _handlePageClick(i) {
        if (this.state.current_page !== i) {
            this._getData(
                this.props.list_url,
                i,
                this.state.page_size,
                this.state.order_by,
                this.state.order_type,
                this.state.center_type,
                () => {
                    this.setState({current_page: i});
                    if (this.state.items.length === 0) {
                        this._getDetail(this.props.detail_url, undefined);
                    }
                    else {
                        this._getDetail(this.props.detail_url, this.state.items[0].Id);
                    }
                }
            );
        }
    },

    _handlePageSizeClick(size) {
        if (this.state.page_size !== size) {
            this._getData(this.props.list_url,
                1,
                size,
                this.state.order_by,
                this.state.order_type,
                this.state.center_type,
                () => {
                    this.setState({page_size: size, current_page: 1});
                    this._setPageCount(
                        this.state.page_size,
                        this.state.total_items);
                    this._getDetail(
                        this.props.detail_url,
                        this.state.items[0].Id,
                        this.setState({selected_id: this.state.items[0].Id})
                    );
                }
            );
        }
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
            this.props.list_url,
            1,
            this.state.page_size,
            column,
            new_order,
            this.state.center_type,
            () => {
                this.setState({
                    order_by: column,
                    order_type: new_order,
                    current_page: 1
                });
                if (this.state.items.length === 0) {
                    this._getDetail(this.props.detail_url, undefined);
                }
                else {
                    this._getDetail(this.props.detail_url, this.state.items[0].Id);
                }
            });
    },

    _handleItemClick(id) {
        if (id === this.state.selected_id)
            return;
        this._getDetail(this.props.detail_url, id, () => {
            this.setState({selected_id: id});
        });
    },

    render() {
        return (
            <div className="container">
                <div className="row no-gutter">
                    <div className="col-md-12" style={{textAlign: 'center'}}>
                        <UnitStat items={this.state.stat_items}/>
                    </div>
                </div>
                <div className="row">
                    <div className="grid-container no-gutter">
                        <div className="col-md-6"
                             style={{
                                 height: 993,
                                 overflow: 'auto',
                                 direction: 'ltr'
                             }}>
                            <div style={{direction: 'rtl', textAlign: 'right'}}>
                                <img src="/content/styles/images/unit-grid-title.png"
                                     style={{margin: '15px 10px'}}
                                     alt="مراکز پژوهشی و تحقیقاتی بر اساس گروه‌بندی"/>
                                <Tabs selected={0} onTabClick={this._handleTabClick}>
                                    <Pane label="دانشگاه‌ها" center_type={2}>
                                        <div className="clickable-row">
                                            <GridTable
                                                ref="g1"
                                                selected={this.state.selected_id}
                                                items={this.state.items}
                                                sort_column={this.state.order_by}
                                                sort_order={this.state.order_type}
                                                onItemClick={this._handleItemClick}
                                                onSortClick={this._handleSortClick}
                                                loading={this.state.grid_loading}
                                                current_page={this.state.current_page}
                                                page_size={this.state.page_size}
                                            />
                                        </div>
                                    </Pane>
                                    <Pane label="دانشکده" center_type={3}>
                                        <div className="clickable-row">
                                            <GridTable
                                                selected={this.state.selected_id}
                                                items={this.state.items}
                                                sort_column={this.state.order_by}
                                                sort_order={this.state.order_type}
                                                onItemClick={this._handleItemClick}
                                                onSortClick={this._handleSortClick}
                                                loading={this.state.grid_loading}
                                                current_page={this.state.current_page}
                                                page_size={this.state.page_size}
                                            />
                                        </div>
                                    </Pane>
                                    <Pane label="مراکز تحقیقاتی" center_type={1}>
                                        <div className="clickable-row">
                                            <GridTable
                                                selected={this.state.selected_id}
                                                items={this.state.items}
                                                sort_column={this.state.order_by}
                                                sort_order={this.state.order_type}
                                                onItemClick={this._handleItemClick}
                                                onSortClick={this._handleSortClick}
                                                loading={this.state.grid_loading}
                                                current_page={this.state.current_page}
                                                page_size={this.state.page_size}
                                            />
                                        </div>
                                    </Pane>
                                    <Pane label="گروه‌های پژوهشی" center_type={4}>
                                        <div className="clickable-row">
                                            <GridTable
                                                selected={this.state.selected_id}
                                                items={this.state.items}
                                                sort_column={this.state.order_by}
                                                sort_order={this.state.order_type}
                                                onItemClick={this._handleItemClick}
                                                onSortClick={this._handleSortClick}
                                                loading={this.state.grid_loading}
                                                current_page={this.state.current_page}
                                                page_size={this.state.page_size}
                                            />
                                        </div>
                                    </Pane>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <UnitDetail
                                {...this.state}
                                items={this.state.detail}
                                loading={this.state.detail_loading}
                            />
                        </div>
                        <div className="clearfix"></div>
                        <div className="container-fluid">
                            <Paginator
                                onPageClick={this._handlePageClick}
                                total_pages={this.state.total_pages}
                                onPageSizeClick={this._handlePageSizeClick}
                                current_page={this.state.current_page}
                                page_size={this.state.page_size}
                                is_first={this.state.current_page === 1}
                                is_last={this.state.current_page === this.state.total_pages}
                            />
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        );
    },

    getInitialState() {
        return {
            selected_id: undefined,
            items: [],
            stat_items: [],
            current_page: 1,
            total_pages: 0,
            page_size: 15,
            total_items: 0,
            order_by: 'Citation',
            order_type: 'desc',
            center_type: 2,
            detail: {},
            field_items: {},
            detail_loading: false,
            grid_loading: false,
            internal_articles: 0,
            foreign_articles: 0,
            isi_article_count: 0,
            scopus_article_count: 0,
            pubmed_article_count: 0,
            others_article_count: 0,
            articles_with_foreign_cooperation: 0,
            articles_with_internal_cooperation: 0,
            research_article_count: 0,
            letter_to_chief_articles_count: 0,
            overview_article_count: 0,
            first_writer_count: 0,
            responsible_writer_count: 0,
            after_second_writer_count: 0,
            unit_score: 0,
            unit_count: 0,
            rank: 0
        };
    },

    componentWillMount() {
        this._getData(
            this.props.list_url,
            this.state.current_page,
            this.state.page_size,
            this.state.order_by,
            this.state.order_type,
            this.state.center_type,
            () => {
                this._getDetail(this.props.detail_url,
                    this.state.items[0].Id,
                    this.setState({selected_id: this.state.items[0].Id}));
            }
        );
    },

    componentDidUpdate() {
        // console.log(this.refs.g1);
    }
});

$('[data-component=unit-evaluation]').each((i, comp) => {
    const list_url = $(comp).data('list-url');
    const detail_url = $(comp).data('detail-url');
    ReactDOM.render(<UnitEvaluation list_url={list_url} detail_url={detail_url}/>,
        comp);
});
