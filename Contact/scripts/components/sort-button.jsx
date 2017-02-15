import React from 'react';

const SortButton = React.createClass(
    {
        dic: {
            WrittenArticles: "مقالات",
            Citation: "ارجاعات",
            HIndex: "H-Index",
            PerArticleCitation: "ارجاع به ازای مقالات",
            UniversityName: "واحد",
            FullPersianName: "نام و نام خانوادگی",
            BriefName: "نام واحد",
            InternalArticleCount: "مقالات داخلی",
            ForeignArticleCount: "مقالات خارجی",
            TotalArticleCount: "کل مقالات",
            Title: "عنوان مجله",
            Kind: "نوع مجله",
            PublisherType: "ناشر",
            ProfilingPlace: "محل نمایه سازی",
            PaperType: "نوع انتشار",
            PublishType: "نوع انتشار",
            Owner: "صاحب امتیاز",
            WebSiteLink: "وب سایت"
        },

        _handleSortClick() {
            this.props.onSortClick(this.props.name);
        },

        _chooseIcon() {
            const order = this.props.order;
            const selected_sort = this.props.selected_sort;
            const name = this.props.name;
            if (name === selected_sort) {
                if (order === 'desc')
                    return "fa fa-sort-desc _green";
                if (order === 'asc')
                    return "fa fa-sort-asc _green";
            }
            return "fa fa-sort";
        },

        render() {
            return (
                <div style={{cursor: 'pointer'}} onClick={this._handleSortClick}>
                <span>
                    {this.props.name in this.dic ? this.dic[this.props.name] : this.props.name}
                </span>
                    <i className={this._chooseIcon()}/>
                </div>
            );
        }
    }
);
export default SortButton;
