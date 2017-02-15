import React from 'react';

const AcademicRankFilter = React.createClass(
		{

			_makeOptions() {
				const options = this.props.options;
				if( options ) {
					return options.AcademicRank.map( ( value, i ) => (<option key={i}>{value}</option>) );
				}
			},

			render() {
				return (
						<select className="form-control" defaultValue="">
							<option value="" disabled>مرتبه علمی // مثال : استادیار</option>
							{this._makeOptions()}
						</select>);
			}
		}
);

export default AcademicRankFilter;
