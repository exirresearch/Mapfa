import React from 'react';

const SourceFilter = React.createClass(
		{
			_handleVendorSelect( e ) {
				this.props.onVendorChange( e.target.value );
			},

			render() {
				return (
						<div className="stat">
							<div className="stat__pic" style={{ marginLeft: 5 }}>
								<i className="fa fa-mouse-pointer fa-4x"/>
							</div>
							<div className="stat__title" style={{ marginLeft: 10 }}>
								مـنـبــع استنادی اطلاعات
							</div>
							<div className="stat__body" style={{ textAlign: 'left', float: 'left', width: 200 }}>
								<div>
									<label className={Number( this.props.vendor ) === 2 ? 'active' : ''} style={{ margin: 0 }}>Science Direct | Scopus
										<input type="radio" name="data_source" checked={Number( this.props.vendor ) === 2} onChange={this._handleVendorSelect}
												 value="2"/>
									</label>
								</div>
								<div>
									<label className={Number( this.props.vendor ) === 1 ? 'active' : ''} style={{ margin: 0 }}>Web of Science
										<input
												type="radio" name="data_source" checked={Number( this.props.vendor ) === 1} onChange={this._handleVendorSelect}
												value="1" disabled="true"
										/>
									</label>
								</div>
								<div style={{ display: 'none' }}>
									<label className={Number( this.props.vendor ) === 3 ? 'active' : ''} style={{ margin: 0 }}>Pubmed Central
										<input type="radio" name="data_source" checked={Number( this.props.vendor ) === 3} onChange={this._handleVendorSelect}
												 value="3"/>
									</label>
								</div>
							</div>
						</div>
				);
			}
		}
);

export default SourceFilter;
