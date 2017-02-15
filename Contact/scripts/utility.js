/**
 * returns type of selector for given jquery selector.
 * @param {String} jq_selector - the given jquery selector
 * @return {String | Array} - it return array of types for complex selectors.
 */
export function getSelectorType( jq_selector ) {
	const elements = jq_selector.trim().split( " " );

	if( elements.length === 0 ) {
		throw new Error( "jq_selector is empty" );
	}

	else if( elements.length === 1 ) {
		if( elements[ 0 ].indexOf( '.' ) === 0 ) {
			return "class";
		}
		else if( elements[ 0 ].indexOf( '#' ) === 0 ) {
			return "id";
		}
		else if( elements[ 0 ].indexOf( '[' ) === 0 ) {
			return "attribute";
		}
		return "tag";
	}

	else if( elements.length > 1 ) {
		let arr = [];
		for( let element of elements ) {
			arr.push( getSelectorType( element ) );
		}
		return arr;
	}
}

/**
 * delete or create element with given properties
 * @param {String} jq_selector - jquery selector for select or create the element it should be an simple selector for create element
 * @param {Number} interval_duration - the time takes to complete the transition
 * @param {Number} opacity_per_second - the amount of opacity which changes in each interval
 * @param {function} cb - callback function
 */
export function slowHiderShower( jq_selector, interval_duration, opacity_per_second, cb ) {
	if( opacity_per_second === 0 ) {
		throw new Error( "opacity_per_second can't be zero" );
	}

	if( opacity_per_second < 0 ) {
		let opacity = 1;
		const element = $( jq_selector );

		element.css( 'opacity', opacity );

		const interval = setInterval(
				() => {
					if( opacity <= 0 ) {
						element.remove();
						clearInterval( interval );
						if( cb ) cb();
					}
					opacity += opacity_per_second;
					element.css( 'opacity', opacity );
				}, interval_duration
		);
	}

	else if( opacity_per_second > 0 ) {
		let opacity = 0;
		let element = "";
		if( jq_selector.trim().split( " " ).length > 1 ) {
			throw new Error( "jq_selector for creating element should be simple" );
		}
		let x = "";
		const selector_type = getSelectorType( jq_selector );
		if( selector_type === "class" ) {
			x = jq_selector.slice( 1 );
			element = $( `<div class="${x}EXTERNAL_FRAGMENT"</div>` );
		}
		else if( selector_type === "id" ) {
			x = jq_selector.slice( 1 );
			element = $( `<div id="${x}EXTERNAL_FRAGMENT"</div>` );
		}
		else if( selector_type === "tag" ) {
			console.log( jq_selector );
			element = $( `<${jq_selector}></${jq_selector}>` );
		}
		else if( selector_type === "attribute" ) {
			console.log( jq_selector );
			x = jq_selector.slice( 1, -1 );
			element = $( `<div ${jq_selector}></div>` );
		}
		else {
			throw new Error( 'Unknown selector' );
		}
		element.css( 'opacity', opacity );
		$( 'body' ).prepend( element );
		const interval = setInterval(
				() => {
					if( opacity >= 1 ) {
						clearInterval( interval );
						if( cb ) cb();
					}
					opacity += opacity_per_second;
					element.css( 'opacity', opacity );
				}, interval_duration
		);
	}
}

/**
 * convert given english number to persian
 * @param {Number | String} number - the given number to convert
 * @return {String} num - converted number
 */
export function persianNumberConvertor( number ) {
	if( typeof number === 'undefined' || number === null )
		return "-";
	let num = String( number );
	const dic = {
		0: "۰",
		1: "۱",
		2: "۲",
		3: "۳",
		4: "۴",
		5: "۵",
		6: "۶",
		7: "۷",
		8: "۸",
		9: "۹"
	};
	for( let i in dic ) {
		if( dic.hasOwnProperty( i ) )
			num = num.replace( new RegExp( i, 'g' ), dic[ i ] );
	}
	return num;
}
/**
 * debounce form underscore
 * @param {function} func - the function which runs
 * @param {int} wait - the time which debounces
 * @param {boolean} immediate - yes or no
 * @return {Function} - debounced function
 */
export function debounce( func, wait, immediate ) {
	var timeout;
	return function() {
		var context = this,
				args = arguments;
		var later = function() {
			timeout = null;
			if( !immediate ) func.apply( context, args );
		};
		var callNow = immediate && !timeout;
		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
		if( callNow ) func.apply( context, args );
	};
}

/**
 * underscore throttle function
 * @param {function} func - function to apply throttling
 * @param {int} wait - time limit in milisecond
 * @param {object} options - extra options
 * @return {Function} - throttled version of function
 */
export function throttle( func, wait, options ) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if( !options ) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		result = func.apply( context, args );
		if( !timeout ) context = args = null;
	};
	return function() {
		var now = new Date().getTime();
		if( !previous && options.leading === false ) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if( remaining <= 0 || remaining > wait ) {
			if( timeout ) {
				clearTimeout( timeout );
				timeout = null;
			}
			previous = now;
			result = func.apply( context, args );
			if( !timeout ) context = args = null;
		} else if( !timeout && options.trailing !== false ) {
			timeout = setTimeout( later, remaining );
		}
        return result;
    };
}
