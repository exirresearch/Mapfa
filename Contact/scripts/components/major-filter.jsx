import React from 'react';

const MajorFilter = React.createClass(
		{
			_makeMajorOptions() {
				const major_options = this.props.options;
				if( major_options )
					return major_options.Field.map( ( value, i ) => (<option key={i}>{value}</option>) );
			},

			render() {
				return (
						<select className="form-control select2" style={{ marginBottom: 5 }} defaultValue="">
							<option value="" disabled>رشته // مثال : مهندسی عمران</option>
							{this._makeMajorOptions()}
						</select>
				);
			}
		}
);

export default MajorFilter;
