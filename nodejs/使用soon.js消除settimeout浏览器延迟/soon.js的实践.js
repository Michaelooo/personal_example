// https://jsfiddle.net/0tscgwe6/2/

//  html ： <div id="log"></div>

// output:
// Testing with setTimeout(fn,0)
// Total time: 351525
// Testing with soon()
// Total time: 3

function log(msg)
{
    document.getElementById("log").innerHTML += ("<br/>" + msg);
}

	
function loop1000(count,yield,cb)
{
    if(count++ < 1000)
        yield(loop1000,count,yield,cb);
    else
        cb();
}

function timeTest(yield,cb)
{
    var start = Date.now();
    loop1000(0,yield,function() {
            log("Total time: " + (Date.now() - start));
            if(cb)
                cb();
        });
}

function test1()
{
    log("Testing with setTimeout(fn,0)");
    var st = function(fn,a,b,c) { setTimeout(fn,0,a,b,c); }
    timeTest(st, test2);
}

function test2()
{
    log("Testing with soon()");
    timeTest(soon);
}

test1();

		// See http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon
		// Here is our lightening fast setImmediate "shim" - this is MUCH faster than
		// setTimeout(fn,0) for yielding threads - its also faster than other setImmediate
		// shims, as it uses Mutation Observer and "mainlines" successive calls internally.
		// WARNING: This does not yield to the browser UI loop, so by using this repeatedly
		// 		you can starve the UI and be unresponsive to the user.
var soon = (function() {

					var fq = []; // function queue;

					function callQueue()
					{
						while(fq.length) // this approach allows new yields to pile on during the execution of these
						{
							var fe = fq[0];
							fe.fn.apply(fe.me,fe.args) // call our fn with the args and preserve context
							fq.shift(); // remove element just processed... do this after processing so we don't go 0 and trigger soon again
						}
					}

					// yeild processing and execute this code later - i.e. setImmediate
					var fnYield = (function() {

							// This is the fastest way browsers have to yield processing
							if(typeof MutationObserver !== "undefined")
							{
								// first, create a div not attached to DOM to "observe"
								var dd = document.createElement("div");
								return function(fn) {
									var mo = new MutationObserver(function() {
											mo.disconnect();	// cleanup
											fn();
										});
									mo.observe(dd, { attributes: true });
									dd.setAttribute("a",0); // trigger callback
								}
							}

							// if No MutationObserver - this is the next best thing - handles Node and MSIE
							if(typeof setImmediate !== "undefined")
								return setImmediate;

							// final fallback - shouldn't be used for much except very old browsers
							return function(fn) { setTimeout(fn,0) }
						})();

					// this is the function that will be assigned to soon
					// it takes the function to call and examines all arguments
					return function(fn) {

							// push the function and any remaining arguments along with context
							fq.push({fn:fn,args:[].slice.apply(arguments).splice(1),me:this});

							if(fq.length == 1) // upon adding our first entry, kick off the callback
								fnYield(callQueue);
						};

				})();