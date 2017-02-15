import React from 'react';
import ReactDOM from 'react-dom';
const Modal = React.createClass(
		{
			componentDidUpdate() {
				const $elem = $( ReactDOM.findDOMNode( this ) ).find( '.modal' );

				$elem.removeClass( 'in' );
				window.requestAnimationFrame(() => $elem.addClass('in'));
			},

			render() {
				const display = this.props.isOpen ? "block" : "none";
				return (
						<div style={{ display: display }}>
							{this.props.children}
						</div>
				);
			}
		}
);

export default Modal;
