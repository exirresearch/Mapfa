import React from 'react';
import ReactDOM from 'react-dom';
import {persianNumberConvertor} from 'scripts/utility';

const FooterStats = React.createClass({
    _getStats() {
        $.ajax({
            url: this.props.url,
            timeout: 10000,
            success: (data, status) => {
                // console.log(data, status);
                this.setState({
                    MembersWithProfileCount: data.MembersWithProfileCount,
                    OnlineUsers: data.OnlineUsers,
                    ResearchCentersCount: data.ResearchCentersCount,
                    TodayVisits: data.TodayVisits,
                    TotalVisits: data.TotalVisits,
                    UniversitiesCount: data.UniversitiesCount
                });
            },
            error: (xhr, status, error) => {
                // console.log(error, status);
            }
        });
    },

    render() {
        return (
            <table width="100%" style={{textAlign: 'left'}}>
                <tbody>
                <tr>
                    <th>
                        کاربران آنلاین:
                    </th>
                    <td>
                         {persianNumberConvertor(this.state.OnlineUsers)}
                    </td>
                </tr>
                <tr>
                    <th>
                        بازدید امروز:
                    </th>
                    <td>
                        {persianNumberConvertor(this.state.TodayVisits)}
                    </td>
                </tr>
                <tr>
                    <th>
                        بازدید کل:
                    </th>
                    <td>
                        {persianNumberConvertor(this.state.TotalVisits)}
                    </td>
                </tr>
                <tr>
                    <th>
                        تعداد دانشگاه ها:
                    </th>
                    <td>
                        {persianNumberConvertor(this.state.UniversitiesCount)}
                    </td>
                </tr>
                <tr>
                    <th>
                        تعداد مر اکز تحقیقاتی:
                    </th>
                    <td>
                         {persianNumberConvertor(this.state.ResearchCentersCount)}
                    </td>
                </tr>
                <tr>
                    <th>
                        اعضای هیأت علمی دارای پروفایل:
                    </th>
                    <td>
                        {persianNumberConvertor(this.state.MembersWithProfileCount)}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    },

    componentWillMount() {
        this._getStats();
    },

    getInitialState() {
        return {
            MembersWithProfileCount: 0,
            OnlineUsers: 0,
            ResearchCentersCount: 0,
            TodayVisits: 0,
            TotalVisits: 0,
            UniversitiesCount: 0
        };
    }
});

$('[data-component=footer-stats]').each((i, comp) => {
    const url = $(comp).data('url');
    ReactDOM.render(<FooterStats url={url}/>, comp);
});

export default FooterStats;
