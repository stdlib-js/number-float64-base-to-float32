/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var isNegativeZero = require( '@stdlib/math-base-assert-is-negative-zero' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var polyfill = require( './../../dist/polyfill.js' );
var float64ToFloat32 = require( './../../dist' );


// FIXTURES //

var negativeLarge = require( './../..xtures/julia/negative_large.json' );
var negativeNormal = require( './../..xtures/julia/negative_normal.json' );
var negativeSmall = require( './../..xtures/julia/negative_small.json' );
var negativeSubnormal = require( './../..xtures/julia/negative_subnormal.json' );
var negativeTiny = require( './../..xtures/julia/negative_tiny.json' );
var positiveLarge = require( './../..xtures/julia/positive_large.json' );
var positiveNormal = require( './../..xtures/julia/positive_normal.json' );
var positiveSmall = require( './../..xtures/julia/positive_small.json' );
var positiveSubnormal = require( './../..xtures/julia/positive_subnormal.json' );
var positiveTiny = require( './../..xtures/julia/positive_tiny.json' );


// NOTES //

/*
* => In many comparisons, we rely on implicit promotion of single-precision floating-point numbers to double-precision equivalents; e.g., +-infinity, NaN. This stems from comparison operators defaulting to float64 operands.
*/


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof float64ToFloat32, 'function', 'main export is a function' );
	t.end();
});

tape( 'if an environment supports `Math.fround` (ES2015+), the main export is the built-in method', function test( t ) {
	var float64ToFloat32 = proxyquire( './../dist', {
		'./main.js': foo
	});
	t.equal( float64ToFloat32, foo, 'returns expected value' );
	t.end();

	function foo() {
		// No-op...
	}
});

tape( 'if an environment does not support `Math.fround` (non-ES2015+), the main export is a polyfill', function test( t ) {
	var float64ToFloat32 = proxyquire( './../dist', {
		'./main.js': false
	});
	t.equal( float64ToFloat32, polyfill, 'returns expected value' );
	t.end();
});

tape( 'if provided `0`, the function returns `0`', function test( t ) {
	var v = float64ToFloat32( 0.0 );
	t.equal( v, 0.0, 'equals 0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', function test( t ) {
	var v = float64ToFloat32( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `+infinity`', function test( t ) {
	var v = float64ToFloat32( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `-infinity`', function test( t ) {
	var v = float64ToFloat32( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = float64ToFloat32( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveLarge.x;
	expected = positiveLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveNormal.x;
	expected = positiveNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSmall.x;
	expected = positiveSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveTiny.x;
	expected = positiveTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSubnormal.x;
	expected = positiveSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeLarge.x;
	expected = negativeLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeNormal.x;
	expected = negativeNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSmall.x;
	expected = negativeSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeTiny.x;
	expected = negativeTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSubnormal.x;
	expected = negativeSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});
