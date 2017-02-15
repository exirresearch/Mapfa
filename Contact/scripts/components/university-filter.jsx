import React from 'react';
import 'styles/stat.css';
import 'bower/select2/dist/css/select2.min.css';
import 'bower/select2/dist/js/select2.min.js';

const UniversityFilter = React.createClass(
		{
			_makeFieldOptions() {
				if( this.props.items.Field ) {
					let result = [ <option key={0}>همه</option> ];
					result.push(
							this.props.items.Field.map(
									( elem, i ) => (
											<option key={i + 1}>
												{elem}
											</option>
									)
							)
					);
					return result;
				}
			},

			_makeUniversityOptions() {
//        console.log(this.props.items.UniversityName);
				if( this.props.items.UniversityName ) {
					let result = [ <option key={0}>همه</option> ];
					result.push(
							this.props.items.UniversityName.map(
									( elem, i ) => (
											<option key={i} value={i}>
												{elem}
											</option>
									)
							)
					);
					return result;
				}
			},

			render() {
				console.log( this.props.selected_university );
				return (
						<div className="stat">
							<div className="stat__pic">
								<i className="fa fa-filter fa-4x"/>
							</div>
							<div className="stat__title" style={{ marginLeft: 0 }}>
								محدود نمودن نتــایج
							</div>
							<div className="stat__body" style={{ width: 'calc(100% - 110px' }}>
								<div className="stat__item">
									<div className="stat__name"
										  style={{ width: 125, textAlign: 'left', marginLeft: 5, marginTop: 3 }}>نام واحد(دانشگاه):
									</div>
									<div className="stat__value" style={{ textAlign: 'right', width: 'calc(100%-130px)' }}>
										<select name="University" className="select2" style={{ width: 220 }}>
											{this._makeUniversityOptions()}
										</select>
									</div>
								</div>
								<div className="stat__item" style={{ marginTop: 5 }}>
									<div className="stat__name"
										  style={{ width: 125, textAlign: 'left', marginLeft: 5, marginTop: 3 }}>رشته:
									</div>
									<div className="stat__value" style={{ textAlign: 'right' }}>
										<select name="Field" className="select2" style={{ width: 220 }}>
											{this._makeFieldOptions()}
										</select>
									</div>
								</div>
							</div>
						</div>
				);
			},

			componentDidMount () {
				this._university = $( 'select[name=University]' ).select2(
						{
							dir: 'rtl'
						}
				);
				this._field = $( 'select[name=Field]' ).select2(
						{
							dir: 'rtl'
						}
				);
				this._university.on(
						'change', e => {
							const val = e.target.value;
							let university_name = (val === "همه") ? undefined : val;
							if( university_name ) {
								university_name = this.props.items.UniversityName[ university_name ];
							}
							console.log( university_name, val );
							this.props.onUniversitySelect( university_name );
						}
				);
				this._field.on(
						'change', e => {
							const val = e.target.value;
							const field = (val === "همه") ? undefined : val;
							this.props.onFieldSelect( field );
						}
				);
			}
		}
);

export default UniversityFilter;
