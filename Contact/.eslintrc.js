module.exports = {
	"extends": [ "google", "plugin:react/recommended" ],

	"rules": {
		"camelcase"                  : 0,
		"max-len"                    : [ 1, 160, 2 ],
		"one-var"                    : 0,
		"no-trailing-spaces"         : 0,
		"brace-style"                : 0,
		"curly"                      : 0,
		"indent"                     : 0,
		"react/prop-types"           : 0,
		"react/no-danger"            : 0,
		"no-warning-comments"        : 0,
		"line-break-style"           : 0,
		"space-before-function-paren": 0,
		"keyword-spacing"            : 0,
		"space-in-parens"            : 0,
		"object-curly-spacing"       : 0,
		"key-spacing"                : 0,
		"no-mixed-spaces-and-tabs"   : 0,
		"computed-property-spacing"  : 0,
		"spaced-comment"             : 0,
		"array-bracket-spacing"      : 0
	},

	"env": {
		"node"   : true,
		"browser": true,
		"jquery" : true
	},

	"globals": {},

	"plugins": [
		"react"
	],

	"react": {
		"prop-types": 0
	},

	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		}
	}
};