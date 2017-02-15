import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/detail-table.css';
import 'styles/detail.css';
import NameFilter from 'components/name-filter';
import Chart from 'chart.js';

const ItemDetail = React.createClass(
    {
        myChart: {},

        _makeProfileLinks() {
            if (this.props.items.profiles) {
                return this.props.items.profiles.map((elem, i) => (
                    <span key={i}>
                        <a href={elem.Url} target="_blank">{elem.Title}</a>&nbsp;&nbsp;
                    </span>
                ));
            }
        },

        _initChart() {
            if (typeof window.myChart2 !== 'undefined')
                window.myChart2.destroy();

            const chart = this.props.items.chart;
            if (chart) {
                let labels = [];
                let citations = [];
                let articles = [];
                chart.forEach(element => {
                    labels.push(element.Year);
                    citations.push(element.Citation);
                    articles.push(element.WrittenArticles);
                });
                var ctx = document.getElementById("myChart");
                Chart.defaults.global.defaultFontFamily = "Vazir, sans-serif";
                window.myChart2 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'ارجاعات',
                                data: citations,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 1)',
                                fill: false
                            },
                            {
                                label: "مقالات",
                                borderColor: 'rgb(100, 99, 132)',
                                backgroundColor: 'rgba(100, 99, 132, 1)',
                                data: articles,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            labels: {
                                fontStyle: "bold"
                            }
                        }
                    }
                });
            }
        },

        render() {
            const display = (this.props.loading) ? 'block' : 'none';
            return (
                <div className="detail-container">
                    <div className="a-loading" style={{display: display}}>
                        <i className="fa fa-refresh fa-spin"/>
                    </div>
                    <header className="detail__header">
                        <NameFilter
                            onPersonNameChange={this.props.onPersonNameChange}/>
                        <img className="pull-left" style={{marginTop: 5}}
                             src="/Content/styles/images/detail-header.png"/>
                    </header>
                    <section className="detail__body" style={{borderRight: '1px solid #e0e5e8'}}>
                        <div className="detail__picture">
                            <img src={this.props.items.ImageUrl} />
                            <i className="fa fa-user"/>
                        </div>
                        <table className="detail-table">
                            <tbody>
                            <tr>
                                <th>
                                    <i className="fa fa-user fa-fw"/> نام و نام
                                    خانوادگی:
                                </th>
                                <td>{this.props.items.full_persian_name}</td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-bank fa-fw"/> دانشگاه / موسسه:
                                </th>
                                <td>{this.props.items.university_name}</td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-fw fa-file-text-o"/>نام متداول
                                    در مقالات:
                                </th>
                                <td>
                                    <div style={{paddingLeft: 125}}>
                                        {this.props.items.nick_name}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-fw fa-link"/> پروفایل‌ها:
                                </th>
                                <td>
                                    {this._makeProfileLinks()}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-fw fa-sitemap"/> زمینه‌های
                                    تحقیقاتی:
                                </th>
                                <td>
                                    <div style={{textAlign: 'left', direction: 'ltr'}}>
                                        {this.props.items.research_field}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-fw fa-refresh"/> آخرین بهنگام
                                    سازی:
                                </th>
                                <td>
                                    <div style={{
                                        direction: 'ltr',
                                        display: 'inline-block'
                                    }}>{this.props.items.PersianLastUpdate}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <i className="fa fa-history fa-fw"/>
                                    تاریخچه ارجاعات
                                </th>
                                <td>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{margin: '20px auto', width: '90%', height: 200, direction: 'rtl'}}>
                            <canvas id="myChart"/>
                        </div>
                    </section>
                </div>
            );
        },

        componentDidUpdate() {
            this._initChart();
        },

        shouldComponentUpdate(nextProps) {
            return (nextProps.items !== this.props.items) || (nextProps.loading !== this.props.loading);
        }
    }
);

$('[data-component=ItemDetail]').each((i, comp) => {
    ReactDOM.render(<ItemDetail/>, comp);
});

export default ItemDetail;
