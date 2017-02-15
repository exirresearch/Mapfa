import React from 'react';
import {persianNumberConvertor} from 'scripts/utility';
import Chart from 'chart.js';
import {Pie} from 'react-chartjs-2';
// import 'styles/article-details.css';

const UnitDetail = React.createClass({
    render() {
        const display = (this.props.loading) ? 'block' : 'none';
        return (
            <div className="detail-container">
                <div className="a-loading" style={{display: display}}>
                    <i className="fa fa-refresh fa-spin"/>
                </div>
                <header style={{textAlign: 'right', padding: '10px 5px 57px 0', borderBottom: '2px solid #e4eaed'}}>
                    <img style={{marginTop: 5}}
                         src="/Content/styles/images/unit-detail-title.png"/>
                </header>
                <section className="detail__body" style={{borderRight: '1px solid #e0e5e8', height: 900}}>
                    <table className="detail-table">
                        <tbody>
                        <tr>
                            <th>
                                نام کامل:
                            </th>
                            <td>{this.props.items.FullName}</td>
                        </tr>
                        <tr>
                            <th>
                                نام افیلیشن:
                            </th>
                            <td>{this.props.items.AfflictionName}</td>
                        </tr>
                        <tr>
                            <th>
                                نام ریاست مرکز:
                            </th>
                            <td>
                                <div style={{paddingLeft: 125}}>
                                    {this.props.items.PresidencyName}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                تلفن:
                            </th>
                            <td>
                                {persianNumberConvertor(this.props.items.Phone)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                آدرس:
                            </th>
                            <td>
                                {this.props.items.Address}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                وب سایت:
                            </th>
                            <td>
                                <a href={this.props.items.WebSite} target="_blank" style={{
                                    direction: 'ltr',
                                    display: 'inline-block'
                                }}>{this.props.items.WebSite}</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{margin: '20px 5px', height: 200, direction: 'rtl', textAlign: 'right'}}>
                        <img src="/Content/styles/images/unit-chart-title.png" alt=""/>
                        <br/><br/>
                        <div className="container-fluid" style={{textAlign: 'right'}}>
                            <div className="row no-gutter">
                                <div className="col-md-4">
                                    <div className="pie-container">
                                    {
                                        this._articlePlacePieData ? <Pie
                                            height={200}
                                            width={170}
                                            data={this._articlePlacePieData}
                                            options={{
                                                legend: {
                                                    position: 'bottom',
                                                    fullWidth: false
                                                }
                                            }}
                                        /> : <div className="chart-nodata">
                                                داده‌ای برای نمایش موجود نیست
                                            </div>
                                    }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="pie-container">
                                    {
                                        this._articleSourcePieData ? <Pie
                                            data={this._articleSourcePieData}
                                            height={238}
                                            width={170}
                                            options={{
                                                legend: {
                                                    position: 'bottom',
                                                    fullWidth: false
                                                }
                                            }}
                                        /> : <div className="chart-nodata">
                                                داده‌ای برای نمایش موجود نیست
                                            </div> 
                                    }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="circle-info-container">
                                        <div className="circle-upper-info">
                                            <div className="circle-upper-info__up">
                                                {this.props.rank ? this.props.rank : <div style={{fontSize: 26}}>داوری نشده</div>}
                                            </div>
                                            <div className="circle-upper-info__below">
                                                IN {this.props.unit_count} UNIT
                                            </div>
                                        </div>
                                        <div className="circle-bottom-info">
                                            {this.props.unit_score}
                                        </div>
                                    </div>
                                    <div style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold'}}>رتبه و امتیاز بین<br/> واحد‌های هم گروه</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row no-gutter">
                                <div className="col-md-4">
                                    <div className="pie-container">
                                        {(this._articleCooperationPieData) ? <Pie
                                            height={200}
                                            width={170}
                                            data={this._articleCooperationPieData}
                                            options={{
                                                legend: {
                                                    position: 'bottom',
                                                    fullWidth: false
                                                }
                                            }}
                                        /> : <div className="chart-nodata">
                                                داده‌ای برای نمایش موجود نیست
                                            </div>}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="pie-container">
                                    {
                                        this._articleKindPieData ? <Pie
                                            data={this._articleKindPieData}
                                            height={220}
                                            width={170}
                                            options={{
                                                legend: {
                                                    position: 'bottom',
                                                    fullWidth: false
                                                }
                                            }}
                                        /> : <div className="chart-nodata">
                                                داده‌ای برای نمایش موجود نیست
                                            </div> 
                                    }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="pie-container">
                                    {
                                        this._articleWriterPieData ? <Pie
                                            data={this._articleWriterPieData}
                                            height={220}
                                            width={170}
                                            options={{
                                                legend: {
                                                    position: 'bottom',
                                                    fullWidth: false
                                                }
                                            }}
                                        /> : <div className="chart-nodata">
                                                داده‌ای برای نمایش موجود نیست
                                            </div>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    },

    componentWillReceiveProps() {
        Chart.defaults.global.defaultFontFamily = "Vazir, sans-serif";
        if (this.props.internal_articles !== 0 || this.props.foreign_articles !== 0)
            this._articlePlacePieData = {
                datasets: [
                    {
                        data: [this.props.internal_articles, this.props.foreign_articles],
                        backgroundColor: [
                            "#487556",
                            "#609f74"
                        ],
                        hoverBackgroundColor: [
                            "#487556",
                            "#609f74"
                        ]
                    }],
                labels: ["مقالات داخلی", "مقالات خارجی"]
            };
        else 
            this._articlePlacePieData = undefined;

        if (this.props.isi_article_count !== 0 || 
                this.props.scopus_article_count !== 0 || 
                this.props.pubmed_article_count !== 0 || 
                this.props.others_article_count !== 0)
            this._articleSourcePieData = {
                datasets: [
                    {
                        data: [this.props.isi_article_count, this.props.scopus_article_count, this.props.pubmed_article_count, this.props.others_article_count],
                        backgroundColor: [
                            "#5f8933",
                            "#679437",
                            "#83ba45",
                            "#a4bb49"
                        ],
                        hoverBackgroundColor: [
                            "#5f8933",
                            "#679437",
                            "#83ba45",
                            "#a4bb49"
                        ]
                    }],
                labels: ["مقالات ISI", "مقالات SCOPUS", "مقالات PUBMED", "سایر"]
            };
        else
            this._articleSourcePieData = undefined;

        if (this.props.articles_with_foreign_cooperation !== 0 || this.props.articles_with_internal_cooperation !== 0)
            this._articleCooperationPieData = {
                datasets: [
                    {
                        data: [this.props.articles_with_foreign_cooperation, this.props.articles_with_internal_cooperation],
                        backgroundColor: [
                            "#91ac75",
                            "#d9e2cf"
                        ],
                        hoverBackgroundColor: [
                            "#91ac75",
                            "#d9e2cf"
                        ]
                    }],
                labels: ["مقالات با همکاری خارجی", "مقالات با همکاری داخلی"]
            };
        else
            this._articleCooperationPieData = undefined;

        if (this.props.research_article_count !== 0 || this.props.letter_to_chief_articles_count !== 0 || this.props.overview_article_count !== 0)
            this._articleKindPieData = {
                datasets: [
                    {
                        data: [this.props.research_article_count, this.props.letter_to_chief_articles_count, this.props.overview_article_count],
                        backgroundColor: [
                            "#92ce54",
                            "#d9eec5",
                            "#aad979"
                        ],
                        hoverBackgroundColor: [
                            "#92ce54",
                            "#d9eec5",
                            "#aad979"
                        ]
                    }],
                labels: ["مقاله پژوهشی", "مقاله نامه به سردبیر", "مقالات مروری"]
            };
        else
            this._articleKindPieData = undefined;
        
        if (this.props.first_writer_count !== 0 || this.props.responsible_writer_count !== 0 || this.props.after_second_writer_count !== 0)
            this._articleWriterPieData = {
                datasets: [
                    {
                        data: [this.props.first_writer_count, this.props.responsible_writer_count, this.props.after_second_writer_count],
                        backgroundColor: [
                            "#bfdaa3",
                            "#e9f2df",
                            "#cde2b7"
                        ],
                        hoverBackgroundColor: [
                            "#bfdaa3",
                            "#e9f2df",
                            "#cde2b7"
                        ]
                    }],
                labels: ["نویسنده اول", "نویسنده مسئول", "مقالات دوم به بعد"]
            };
        else
            this._articleWriterPieData = undefined;
    },

    componentDidUpdate() {

    }
});

export default UnitDetail;
