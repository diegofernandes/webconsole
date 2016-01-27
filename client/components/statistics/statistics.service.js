function NormalDensityZx( x, Mean, StdDev ) {
  var a = x - Mean;
  return Math.exp( -( a * a ) / ( 2 * StdDev * StdDev ) ) / ( Math.sqrt( 2 * Math.PI ) * StdDev );
}


function StandardNormalQx( x ) {
  if ( x === 0 ) // no approximation necessary for 0
    return 0.50;

  var t1, t2, t3, t4, t5, qx;
  var negative = false;
  if ( x < 0 ) {
    x = -x;
    negative = true;
  }
  t1 = 1 / ( 1 + ( 0.2316419 * x ) );
  t2 = t1 * t1;
  t3 = t2 * t1;
  t4 = t3 * t1;
  t5 = t4 * t1;
  qx = NormalDensityZx( x, 0, 1 ) * ( ( 0.319381530 * t1 ) + ( -0.356563782 * t2 ) +
    ( 1.781477937 * t3 ) + ( -1.821255978 * t4 ) + ( 1.330274429 * t5 ) );
  if ( negative == true )
    qx = 1 - qx;
  return qx;
}

function StandardNormalPx( x ) {
  return 1 - StandardNormalQx( x );
}

function StandardNormalAx( x ) {
  return 1 - ( 2 * StandardNormalQx( Math.abs( x ) ) );
}

var verticals = [
  -1.4, -0.2, 1.2
];

function createNormalCurve(Mean, StdDev) {
	var chartData = [];
	for ( var i = -10; i < 10.1; i += 0.1 ) {
	  var dp = {
	    x: i,
	    y: NormalDensityZx( i, Mean, stdev )
	  };
	  if ( verticals.indexOf( Math.round( i * 10 ) / 10 ) !== -1 ) {
	    dp.vertical = dp.value;
	  }
	  chartData.push( dp );
	}
	return chartData;
}
