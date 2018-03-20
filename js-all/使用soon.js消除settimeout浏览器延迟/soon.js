// See http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon
// 使用 soon.js 处理在浏览器端 settimeout（大量调用），4ms * n 的延迟问题


var soon = (function() {
	
		var fq = []; // 事件队列;
	
		function callQueue()
		{
			while(fq.length) // 执行队列中事件
			{
				var fe = fq[0];
				fe.f.apply(fe.m,fe.a) // 执行队列中事件
				fq.shift(); 
			}
		}
	
        // 异步执行队列事件，最大效率
		var cqYield = (function() {
	
				// 通过 MutationObserver 来监听 Dom 来执行回调，此法最快
				if(typeof MutationObserver !== "undefined")
				{
					var dd = document.createElement("div");
					var mo = new MutationObserver(callQueue);
					mo.observe(dd, { attributes: true });
	
					return function(fn) { dd.setAttribute("a",0); } // trigger callback to
				}
	
				// 如果支持 setImmediate ，采取此策略，其实 setImmediate 和 setTimeout(callQueue,0) 差不多
				if(typeof setImmediate !== "undefined")
					return function() { setImmediate(callQueue) }
	
				// 没办法了，就用 setTimeOut 的办法
				return function() { setTimeout(callQueue,0) }
			})();
	
		return function(fn) {
                // 队列事件装载进一个数组
				fq.push({f:fn,a:[].slice.apply(arguments).splice(1),m:this});
	
				if(fq.length == 1) // 在添加第一个条目时，启动回调函数
					cqYield();
			};
	
	})();