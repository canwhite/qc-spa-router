function Router() {

    this.routes = []
    /* 添加路由 */
    this.add = function (re, handler) {
        this.routes.push({re, handler})
    }

    /* 监听 url 变化 */
    this.listen = function (routes) {

        /*==================================================================
        由于history.popstate只能监听back/forward/go却不能监听history.pushState，
        所以需要额外全局复写一下history.pushState事件。让它通过自己对自己的监听事件
        的触发，做和popstate一样的事儿
        ====================================================================*/


        //重写方法，添加自动触发监听的机制
        const _wr = function (type) {
            //拿到history里边的pushState
            const orig = history[type]
            //闭包，返回一个函数，在外边()调用的时候就会自动触发
            return function () {
              //this指向的是history，因为_wr指向的就是history属性
              const rv = orig.apply(this, arguments) 
              const e = new Event(type)
              e.arguments = arguments
              window.dispatchEvent(e)
    
              return rv 
            }
        }


        //将pushState重写,添加事件监听
        history.pushState = _wr('pushState');
        history.replaceState =  _wr("replaceState");

        var handler =  function(routes){
            console.log(arguments);
            var pathname = window.location.pathname
            for (var i = 0; i < routes.length; i ++) {
                if (pathname === routes[i].re) {
                    //对上号了触发数组中的回调
                    routes[i].handler.apply({})
                }
            }
        }


        //给几个事件添加监听,让pushState和replaceState做和popstate一样的事儿
        //因为参数冲突，这里搞一个尾调用，方便传入routes，但是不会当下就执行
        window.addEventListener('popstate',(event)=>{
            handler(routes);
        });
        window.addEventListener('pushState',(event)=>{
            handler(routes);
        });
        window.addEventListener('replaceState',(event)=>{
            handler(routes);
        });


        
    }
    /* 前进到一个新的url */
    this.push = function (path) {
        console.log(path);
        window.history.pushState({}, '', path)
    }
    /* 替换成一个新的url */
    this.replace = function (path) {
        window.history.replaceState({}, '', path)
    }
    /* 返回到上一个url */
    this.back = function () {
        window.history.back()
    }
}
    