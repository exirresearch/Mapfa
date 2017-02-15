import React from 'react';

const NameFilter = React.createClass(
		{
			_handleChange( e ) {
				const person_name = e.target.value.trim();
				this.setState( { person_name: person_name } );
				this.props.onPersonNameChange( person_name );
			},

			_handleSearchClick( e ) {
				e.preventDefault();
				if( this.state.person_name )
					this.props.onPersonNameChange( this.state.person_name );
				else
					this.props.onPersonNameChange( undefined );
			},

			render() {
				return (
						<div style={{
							display      : 'inline-block',
							verticalAlign: 'top',
							width        : 470
						}}>
							<div className="container-fluid">
								<div className="row no-gutter">
									<div className="col-md-5">
										<h5 style={{ color: '#165ba6', fontWeight: 'bold' }} className="name-filter__name">
											جستجوی نام و یا نام خانوادگی:</h5>
									</div>
									<div className="col-md-5">
										<form onSubmit={this._handleSearchClick}>
											<input
													type="text"
													className="form-control"
													style={{ paddingLeft: 35 }}
													placeholder="مثال:‌ علی احمدی"
													onChange={this._handleChange}
													value={this.state.person_name}
											/>
											<button type="submit" style={{
												background: 'transparent', position: 'absolute',
												left                               : 6,
												top                                : 2,
												cursor                             : 'pointer',
												color                              : "#c4c4c4",
												padding                            : 0,
												border                             : 0
											}}>
												<i
														className="fa fa-search fa-2x"
												/>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
				);
			},

			getInitialState() {
				return {
					person_name: this.props.person_name
				};
			}
		}
);

export default NameFilter;
