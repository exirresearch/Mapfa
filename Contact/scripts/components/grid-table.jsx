import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/grid.css';
import 'styles/table.css';
import { persianNumberConvertor } from 'scripts/utility';
import SortButton from 'components/sort-button';
import Immutable from 'immutable';

const GridTable = React.createClass(
		{
			extraFields: {
				ScienceResumeChartList: "",
				ProfileId             : "",
				Gender                : "",
				Id                    : "",
				Address               : "",
				AfflictionName        : "",
				Phone                 : "",
				CenterType            : "",
				PresidencyName        : "",
				FullName              : "",
				WebSite               : ""
			},

			_stripExtra ( obj, items ) {
				/* eslint new-cap: 0 */
				let result = Immutable.Map( obj );
				for( const item in obj ) {
					if( obj.hasOwnProperty( item ) ) {
						if( item in items ) {
							result = result.delete( item );
						}
					}
				}
				return result.toJS();
			},

			_handleSelect( id ) {
				this.props.onItemClick( id );
			},

			_handleSortClick( column ) {
				this.props.onSortClick( column );
			},

			_makeItems() {
				return this.props.items.map(
						( item, i ) => {
							let key_arr = [];
							for( const key in this._stripExtra( item, this.extraFields ) ) {
								if( item.hasOwnProperty( key ) ) {
									switch( key ) {
										case "FullPersianName":
										case "BriefName":
										case "Title":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 1 } );
											break;
										case "UniversityName":
										case "InternalArticleCount":
										case "Kind":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 2 } );
											break;
										case "WrittenArticles":
										case "ForeignArticleCount":
										case "PublisherType":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 3 } );
											break;
										case "TotalArticleCount":
										case "ProfilingPlace":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 4 } );
											break;
										case "Citation":
										case "ISSN":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 5 } );
											break;
										case "HIndex":
										case "PaperType":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 5 } );
											break;
										case "PerArticleCitation":
										case "PublishType":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 6 } );
											break;
										case "Owner":
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 7 } );
											break;
										default:
											key_arr.push( { name: persianNumberConvertor( item[ key ] ), order: 100 } );
									}
								}
							}
							key_arr = key_arr.sort( ( a, b ) => (a.order - b.order) ).map(
									( elem, i ) => {
										if( elem.name.indexOf( 'http' ) === 0 )
											return (
													<td key={i}><a href={elem.name} target="_blank"><i className="fa fa-link fa-lg"/></a></td>);
										if( elem.name === 'blank' )
											return (
													<td key={i}>
                                <span>
                                    <i className="fa fa-link fa-lg" style={{ color: '#a0a0a0' }}/>
                                </span>
													</td>
											);
										return (<td key={i}>{elem.name}</td>);
									}
							);
							return (
									<tr onClick={this._handleSelect.bind( this, item.Id )} key={item.Id}
										 className={(item.Id === this.props.selected) ? 'warning' : ''}>
										<td style={{ textAlign: 'center' }}>{persianNumberConvertor(
												(this.props.current_page - 1) * this.props.page_size + i + 1
										)}</td>
										{key_arr}
									</tr>
							);
						}
				);
			},

			_makeHeader() {
				if( this.props.items[ 0 ] ) {
					const items = this._stripExtra(
							this.props.items[ 0 ],
							this.extraFields
					);
					let items_arr = [];
					for( const item in items ) {
						if( items.hasOwnProperty( item ) ) {
							switch( item ) {
								case "FullPersianName":
								case "BriefName":
								case "Title":
									items_arr.push( { name: item, order: 1 } );
									break;
								case "UniversityName":
								case "InternalArticleCount":
								case "Kind":
									items_arr.push( { name: item, order: 2 } );
									break;
								case "WrittenArticles":
								case "ForeignArticleCount":
								case "PublisherType":
									items_arr.push( { name: item, order: 3 } );
									break;
								case "TotalArticleCount":
								case "ProfilingPlace":
									items_arr.push( { name: item, order: 4 } );
									break;
								case "Citation":
								case "ISSN":
									items_arr.push( { name: item, order: 5 } );
									break;
								case "HIndex":
								case "PaperType":
									items_arr.push( { name: item, order: 5 } );
									break;
								case "PerArticleCitation":
								case "PublishType":
									items_arr.push( { name: item, order: 6 } );
									break;
								case "Owner":
									items_arr.push( { name: item, order: 7 } );
									break;
								default:
									items_arr.push( { name: item, order: 100 } );
							}
						}
					}
					return items_arr.sort( ( a, b ) => (a.order - b.order) ).map(
							( elem, i ) => {
								if( elem.name === 'FullPersianName' || elem.name === 'BriefName' || elem.name === 'Title' )
									return (
											<th key={i} style={{ textAlign: 'right' }}>
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'UniversityName' )
									return (
											<th key={i} style={{ width: 120 }} className="unit-name">
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'Citation' )
									return (
											<th key={i} style={{ width: 70 }}>
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'WrittenArticles' )
									return (
											<th key={i} style={{ width: 70 }}>
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'PerArticleCitation' || elem.name === 'InternalArticleCount' ||
										elem.name === 'ForeignArticleCount' || elem.name === 'TotalArticleCount' )
									return (
											<th key={i} style={{ width: 105, textAlign: 'center' }}>
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'Owner' || elem.name === 'ProfilingPlace' )
									return (
											<th key={i} style={{ width: 250 }}>
												<SortButton
														onSortClick={this._handleSortClick}
														name={elem.name}
														selected_sort={this.props.sort_column}
														order={this.props.sort_order}
												/>
											</th>
									);
								if( elem.name === 'WebSiteLink' )
									return (
											<th key={i} style={{ width: 90 }}>
												وب‌سایت
											</th>
									);
								if( elem.name === 'Url' )
									return (
											<th key={i} style={{ width: 110 }}>
												لینک سی وی
											</th>
									);
								return (
										<th key={i} style={{ textAlign: 'center' }}>
											<SortButton
													onSortClick={this._handleSortClick}
													name={elem.name}
													selected_sort={this.props.sort_column}
													order={this.props.sort_order}
											/>
										</th>
								);
							}
					);
				}
			},

			render() {
				const loading = (this.props.loading) ? 'block' : 'none';
				return (
						<div style={{ position: 'relative' }}>
							<div className="a-loading" style={{ display: loading }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<table className="table table-hover">
								<thead>
								<tr>
									<th style={{ width: 30 }}>#</th>
									{this._makeHeader()}
								</tr>
								</thead>
								<tbody>
								{this._makeItems()}
								</tbody>
							</table>
						</div>
				);
			}
		}
);

$( '[data-component=grid]' ).each(
		( i, comp ) => {
			ReactDOM.render(
					<GridTable/>,
					comp
			);
		}
);

export default GridTable;
