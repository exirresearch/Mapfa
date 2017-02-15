import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/detail-table.css';
import 'styles/detail.css';
import NameFilter from 'components/name-filter';
import Modal from 'components/modal';
import Chartam from 'components/chart';
const ItemDetail = React.createClass(
		{
			myChart: {},

			_makeProfileLinks() {
				if( this.props.items.ScopusLink ) {
					return (<span> <a href={this.props.items.ScopusLink} target="_blank">Scopus</a>&nbsp;&nbsp; </span>);
				}
			},

			_handleModalClick() {
				this.setState( { modal_is_open: true } );
			},

			_handleCloseModalClick() {
				this.setState( { modal_is_open: false } );
			},

			render() {
				const display = (this.props.loading) ? 'block' : 'none';
				let iframeSrc = "";
				if( this.props.items.id ) {
					iframeSrc = `/Home/RequestForReform?ProfileId=${this.props.items.id}
									&UniversityName=${this.props.items.university_name}&FaFullName=${this.props.items.full_persian_name}`;
				}
				return (
						<div className="detail-container">
							<div className="a-loading" style={{ display: display }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<header className="detail__header">
								<NameFilter
										person_name={this.props.person_name}
										onPersonNameChange={this.props.onPersonNameChange}/>
								<img className="pull-left" style={{ marginTop: 5 }}
									  src="/Content/styles/images/detail-header.png"/>
							</header>
							<section className="detail__body" style={{ borderRight: '1px solid #e0e5e8' }}>
								<div className="detail__picture">
									<img src={this.props.items.ImageUrl}/>
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
											<div style={{ paddingLeft: 125, direction: 'ltr', textAlign: 'left' }}>
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
											<div style={{ textAlign: 'left', direction: 'ltr' }}>
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
												display  : 'inline-block'
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
								<div style={{ direction: 'rtl', textAlign: 'left' }}>
									<button className="btn btn-link" onClick={this._handleModalClick}>
										درخواست اصلاح
									</button>
									<Modal isOpen={this.state.modal_is_open}>
										<div id="iframeModal" className="modal fade" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<button type="button" className="close" onClick={this._handleCloseModalClick}><span>×</span></button>
														<h4 className="modal-title stat__name">درخواست اصلاحات</h4>
													</div>
													<div className="modal-body">
														<iframe
																src={iframeSrc}
																style={{ width: '100%', border: 'none', height: '71.5vh' }}
														/>
													</div>
												</div>
											</div>
										</div>
									</Modal>
								</div>
								<Chartam chart={this.props.items.chart} p_id={this.props.items.id}/>
							</section>
						</div>
				);
			},

			getInitialState() {
				return {
					modal_is_open: false
				};
			},

			shouldComponentUpdate( nextProps, nextState ) {
				return (nextProps.items !== this.props.items) || (nextProps.loading !== this.props.loading) || (nextState.modal_is_open !== this.state.modal_is_open);
			}
		}
);

$( '[data-component=ItemDetail]' ).each(
		( i, comp ) => {
			ReactDOM.render( <ItemDetail/>, comp );
		}
);

export default ItemDetail;
