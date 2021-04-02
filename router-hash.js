function Router() {

    //维护一个路由数组
    this.routes = []

    /* 添加路由 */
    this.add = function (re, handler) {
        //往数组中添加内容，这个re和hash对应
        this.routes.push({re, handler})
    }
    
    /* 监听 url 变化 */
    this.listen = function (routes) {
        //路由切换，hashchange是浏览器默认已经有的事件，这里只是做监听，给handler绑定执行回调
        window.addEventListener('hashchange', function(event) {
             
            var hash = window.location.hash.slice(1);//截掉#，得到hash
            //遍历维护的路由数组
            for (var i = 0; i < routes.length;i ++) {
                //如果拿到的hash值在数组中有对应的，将handler方法绑定在一个新对象上执行
                this.console.log(routes[i]);
                if (hash+"" == routes[i].re) {
                    //触发回调
                    routes[i].handler.apply({});
                }
            }
        }, false)
    }
    /* 前进到一个新的url */
    this.push = function (path) {
        //更改hash但是不会刷新
        window.location.hash = path || ''
    }
    /* 替换成一个新的url */
    this.replace = function (path) {
        //拿到新的path
        path = path || ''
        //得到#的坐标
        var i = window.location.href.indexOf('#')
        //替换为新的地址
        window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) +     "#" + path)
    }

    /* 返回到上一个url */
    this.back = function () {
        //返回用的history
        window.history.back()
    }

    
}