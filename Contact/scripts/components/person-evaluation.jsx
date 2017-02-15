import React from 'react';
import ReactDOM from 'react-dom';

import GridTable from 'components/grid-table';
import PersonDetail from 'components/person-detail';
import Stat from 'components/stat';
import Paginator from 'components/paginator';
import UniversityFilter from 'components/university-filter';
import SourceFilter from 'components/source-filter';
import { debounce } from 'scripts/utility';

import 'styles/pagination.css';
import 'bower/select2/dist/css/select2.min.css';
import 'bower/select2/dist/js/select2.min.js';

const PersonEvaluation = React.createClass(
		{
			_statDic: {
				TotalMembers : "تعداد کل اعضا:",
				MalesCount   : "تعداد آقایان:",
				FemalesCount : "تعداد خانم‌ها:",
				TotalArticles: "تعداد کل مقالات اعضا:",
				TotalCitation: "تعداد کل ارجاعات:"
			},

			_getQueryString() {
				const href = window.location.search.substr( 1 ).split( '&' );
				window.history.pushState( "object or string", "Title", window.location.href.replace( window.location.search, "" ) );
				return this._parseQueryString( href );
			},

			_parseQueryString( a ) {
				if( a === "" ) return {};
				let b = {};
				for( let i = 0; i < a.length; ++i ) {
					let p = a[ i ].split( '=', 2 );
					if( p.length === 1 )
						b[ p[ 0 ] ] = "";
					else
						b[ p[ 0 ] ] = decodeURIComponent( p[ 1 ].replace( /\+/g, " " ) );
				}
				return b;
			},

			_setPageCount( page_size, total_items ) {
				const x = Math.ceil( total_items / page_size );
				this.setState( { total_pages: x } );
			},

			_getData( url, PageIndex, PageSize, OrderByColumn, SortOrder, UnitName, Field, FullPersianName, vendor, cb = () => (undefined) ) {
				const grid = this;
				this.setState( { grid_loading: true } );
				if( window._grid_ajax ) {
					window._grid_ajax.abort();
				}
				window._grid_ajax = $.ajax(
						{
							url     : url,
							data    : {
								PageIndex      : PageIndex,
								PageSize       : PageSize,
								OrderByColumn  : OrderByColumn,
								SortOrder      : SortOrder,
								UniversityName : UnitName,
								Field          : Field,
								FullPersianName: FullPersianName,
								Vendor         : vendor
							},
							timeout : 10000,
							cache   : true,
							success : ( data, status ) => {
								// console.log(data, status);
								const general_statics = data.GeneralStatistics;
								const total_items = data.TotalCount;
								this.setState( { total_items: total_items } );
								let stat_items = [];
								for( let i in general_statics ) {
									if( general_statics.hasOwnProperty( i ) ) {
										let x = {};
										x[ this._statDic[ i ] ] = general_statics[ i ];
										stat_items.push( x );
									}
								}
								grid.setState( { items: data.Result, stat_items: stat_items, grid_loading: false } );
								this._setPageCount( this.state.page_size, total_items );
								cb();
							},
							error   : ( xhr, status, error ) => {
								console.log( error );
							},
							complete: () => {
								grid.setState( { grid_loading: false } );
							}
						}
				);
			},

			_getDetail( url, id, cb = () => (undefined) ) {
				if( id === undefined ) {
					this.setState(
							{
								detail        : {
									full_persian_name: undefined,
									university_name  : undefined,
									nick_name        : undefined,
									research_field   : undefined,
									PersianLastUpdate: undefined,
									id               : undefined,
									ScopusLink       : undefined,
									chart            : undefined
								},
								selected_id   : id,
								detail_loading: false
							}
					);
					return;
				}
				const grid = this;
				const vendor = this.state.vendor;
				this.setState( { detail_loading: true } );
				if( window._detail_ajax )
					window._detail_ajax.abort();
				window._detail_ajax = $.ajax(
						{
							url    : url,
							data   : { Id: id, vendor: vendor },
							timeout: 10000,
							cache  : true,
							success: ( data, status ) => {
								// console.log(data, status);
								this.setState(
										{
											detail        : {
												full_persian_name: data.FullPersianName,
												university_name  : data.UniversityName,
												nick_name        : data.Nickname,
												research_field   : data.ResearchFields,
												PersianLastUpdate: data.PersianLastUpdate,
												id               : data.Id,
												ScopusLink       : data.ScopusLink,
												chart            : data.ScienceResumeChartList
											},
											selected_id   : id,
											detail_loading: false
										}
								);
								cb();
							},
							error  : ( xhr, status, error ) => {
								// console.log(error, status);
								grid.setState( { detail_loading: false } );
							}
						}
				);
			},

			_getUniversityFields( url, university_name, cb = () => (undefined) ) {
				const grid = this;
//				console.log(university_name);
				$.ajax(
						{
							url    : url,
							timeout: 10000,
							cache  : true,
							data   : {
								UniversityName: university_name ? university_name : 'همه'
							},
							success: ( data, status ) => {
								// console.log(data, status);
								grid.setState(
										{
											field_items: data
										}
								);
							},
							error  : ( xhr, status, error ) => {
								// console.log(error, status);
							}
						}
				);
			},

			_handlePageClick( i ) {
				let unit = this.state.unit_name;
				let field = this.state.unit_field;
				let person_name = this.state.person_name;
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				if( this.state.current_page !== i )
					this._getData(
							this.props.list_url,
							i,
							this.state.page_size,
							this.state.order_by,
							this.state.order_type,
							unit,
							field,
							person_name,
							this.state.vendor,
							() => {
								this.setState( { current_page: i } );
								if( this.state.items.length === 0 ) {
									this._getDetail( this.props.detail_url, undefined );
								}
								else {
									this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
								}
							}
					);
			},

			_handlePageSizeClick( size ) {
				let unit = this.state.unit_name;
				let field = this.state.unit_field;
				let person_name = this.state.person_name;
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				if( this.state.page_size !== size )
					this._getData(
							this.props.list_url,
							1,
							size,
							this.state.order_by,
							this.state.order_type,
							unit,
							field,
							person_name,
							this.state.vendor,
							() => {
								this.setState( { page_size: size, current_page: 1 } );
								this._setPageCount(
										this.state.page_size,
										this.state.total_items
								);
							}
					);
			},

			_handleItemClick( id ) {
				this._getDetail(
						this.props.detail_url, id, () => {
							this.setState( { selected_id: id } );
						}
				);
			},

			_handleSortClick( column ) {
				const order_type = this.state.order_type;
				const order_by = this.state.order_by;
				let new_order;
				if( column === order_by ) {
					if( order_type === 'asc' )
						new_order = 'desc';
					else if( order_type === 'desc' )
						new_order = 'asc';
				}
				else {
					new_order = 'desc';
				}
				let unit = this.state.unit_name ? this.state.unit_name : "";
				let field = this.state.unit_field ? this.state.unit_field : "";
				let person_name = this.state.person_name ? this.state.person_name : "";
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				this._getData(
						this.props.list_url,
						1,
						this.state.page_size,
						column,
						new_order,
						unit,
						field,
						person_name,
						this.state.vendor,
						() => {
							this.setState(
									{
										order_by    : column,
										order_type  : new_order,
										current_page: 1
									}
							);
							if( this.state.items.length === 0 ) {
								this._getDetail( this.props.detail_url, undefined );
							}
							else {
								this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
							}
						}
				);
			},

			_handleUniversitySelect( university ) {
				if( this.state.unit_name === university )
					return;
				console.log( university );
				let unit = university ? university : "";
				let field = this.state.unit_field ? this.state.unit_field : "";
				let person_name = this.state.person_name ? this.state.person_name : "";
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				this._getData(
						this.props.list_url,
						1,
						this.state.page_size,
						this.state.order_by,
						this.state.order_type,
						unit,
						field,
						person_name,
						this.state.vendor,
						() => {
							this.setState( { unit_name: university, current_page: 1 } );
							if( this.state.items.length === 0 ) {
								this._getDetail( this.props.detail_url, undefined );
							}
							else {
								this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
							}
						}
				);
			},

			_handleFieldSelect( field ) {
				if( field === this.state.unit_field )
					return;
				let unit = this.state.unit_name ? this.state.unit_name : "";
				let unit_field = field ? field : "";
				let person_name = this.state.person_name ? this.state.person_name : "";
				// console.log("field", unit, field, person_name);
				if( !(unit || unit_field || person_name) ) {
					unit = undefined;
					unit_field = undefined;
					person_name = undefined;
				}
				this._getData(
						this.props.list_url,
						1,
						this.state.page_size,
						this.state.order_by,
						this.state.order_type,
						unit,
						unit_field,
						person_name,
						this.state.vendor,
						() => {
							this.setState( { unit_field: field, current_page: 1 } );
							if( this.state.items.length === 0 ) {
								this._getDetail( this.props.detail_url, undefined );
							}
							else {
								this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
							}
						}
				);
			},

			_handlePersonNameChange( name ) {
				if( name === this.state.person_name )
					return;
				let unit = this.state.unit_name ? this.state.unit_name : "";
				let field = this.state.unit_field ? this.state.unit_field : "";
				let person_name = name ? name : "";
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				const fn = debounce(
						() => {
							this._getData(
									this.props.list_url,
									1,
									this.state.page_size,
									this.state.order_by,
									this.state.order_type,
									unit,
									field,
									person_name,
									this.state.vendor,
									() => {
										this.setState(
												{
													person_name : name,
													current_page: 1
												}
										);
										if( this.state.items.length === 0 )
											this._getDetail( this.props.detail_url, undefined );
										else
											this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
									}
							);
						},
						500,
						false
				);
				fn();
			},

			_handleVendorChange( vendor ) {
				let unit = this.state.unit_name ? this.state.unit_name : "";
				let field = this.state.unit_field ? this.state.unit_field : "";
				let person_name = this.state.person_name ? this.state.person_name : "";
				let order_by = this.state.order_by;
				if( !(unit || field || person_name) ) {
					unit = undefined;
					field = undefined;
					person_name = undefined;
				}
				if( vendor === '2' ) {
					order_by = 'WrittenArticles';
				} else {
					order_by = 'Citation';
				}
				this._getData(
						this.props.list_url,
						1,
						this.state.page_size,
						order_by,
						this.state.order_type,
						unit,
						field,
						person_name,
						vendor,
						() => {
							this.setState(
									{
										vendor      : vendor,
										current_page: 1,
										order_by    : order_by
									}
							);
							if( this.state.items.length === 0 ) {
								this._getDetail( this.props.detail_url, undefined );
							}
							else {
								this._getDetail( this.props.detail_url, this.state.items[ 0 ].Id );
							}
						}
				);
			},

			render() {
				return (
						<div className="container">
							<div className="row no-gutter">
								<div className="col-md-4 right-col" style={{ textAlign: 'right' }}>
									<UniversityFilter
											items={this.state.field_items}
											selected_university={this.state.unit_name}
											onUniversitySelect={this._handleUniversitySelect}
											onFieldSelect={this._handleFieldSelect}
									/>
								</div>
								<div className="col-md-4 center-col" style={{ textAlign: 'center' }}>
									<Stat items={this.state.stat_items}/>
								</div>
								<div className="col-md-4 left-col" style={{ textAlign: 'right' }}>
									<SourceFilter onVendorChange={this._handleVendorChange} vendor={this.state.vendor}/>
								</div>
							</div>
							<div className="row no-gutter">
								<div className="grid-container no-gutter">
									<div className="col-md-6"
										  style={{
											  height   : 805,
											  overflow : 'auto',
											  direction: 'ltr'
										  }}>
										<div style={{ direction: 'rtl' }} className="clickable-row">
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
									</div>
									<div className="col-md-6">
										<PersonDetail
												items={this.state.detail}
												onPersonNameChange={this._handlePersonNameChange}
												person_name={this.state.person_name}
												loading={this.state.detail_loading}
										/>
									</div>
									<div className="clear"></div>
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
				const qs = this._getQueryString();
				let person_name = "";
				let university_name = "";
				let sort_by = "";
				if( qs && qs.hasOwnProperty( 'person_name' ) )
					person_name = qs.person_name;
				if( qs && qs.hasOwnProperty( 'university_name' ) )
					university_name = qs.university_name;
				if( qs && qs.hasOwnProperty( 'sort_by' ) )
					sort_by = qs.sort_by;
				return {
					selected_id   : undefined,
					items         : [],
					stat_items    : [],
					current_page  : 1,
					total_pages   : 0,
					page_size     : 15,
					total_items   : 0,
					order_by      : sort_by ? sort_by : 'Citation',
					order_type    : 'desc',
					unit_name     : university_name,
					unit_field    : "",
					person_name   : person_name,
					detail        : {},
					field_items   : {},
					detail_loading: false,
					grid_loading  : false,
					vendor        : 2
				};
			},

			componentWillMount() {
				this._getData(
						this.props.list_url,
						this.state.current_page,
						this.state.page_size,
						this.state.order_by,
						this.state.order_type,
						this.state.unit_name,
						this.state.unit_field,
						this.state.person_name,
						this.state.vendor,
						() => {
							if( this.state.items.length )
								this._getDetail(
										this.props.detail_url,
										this.state.items[ 0 ].Id,
										this.setState( { selected_id: this.state.items[ 0 ].Id } )
								);
						}
				);
				this._getUniversityFields( this.props.university_fields_url, 'همه' );
			}
		}
);

$( '[data-component=person-evaluation]' ).each(
		( i, comp ) => {
			const list_url = $( comp ).data( 'list-url' );
			const detail_url = $( comp ).data( 'detail-url' );
			const university_fields = $( comp ).data( 'field-url' );
			ReactDOM.render(
					<PersonEvaluation list_url={list_url} detail_url={detail_url}
											university_fields_url={university_fields}/>,
					comp
			);
		}
);
