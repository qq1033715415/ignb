/* 检查ie浏览器版本 */
			(function() {
				var o = navigator.userAgent.match(/MSIE (\d+)/);
				o = o && o[1];
				//console.log('o', o);
				// ie9 以下 || o != null
				if(!!o && o < 9) {
					// 更新页面
					var newUrl = location.protocol + '//' + location.host +location.pathname+'ieupdate/index.html';
					location.href = newUrl;
				}
			})();