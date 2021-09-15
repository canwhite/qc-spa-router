function Router() {

    this.routes = []
    /* 添加路由 */
    this.add = function (re, handler) {
        this.routes.push({re, handler})
    }

    /* 监听 url 变化 */
    this.listen = function (routes) {

        /*==================================================================
        Pre:
        当活动历史记录条目更改时，将触发popstate事件。----这里需要注意，是更改，更改包含正向和负向两个方向
        如果被激活的历史记录条目是通过对history.pushState（）的调用创建的，
        或者受到对history.replaceState（）的调用的影响，
        popstate事件的state属性包含历史条目的状态对象的副本。
        ------但是不会触发事件;-------------
        只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮
        或者在Javascript代码中调用history.back()或者history.forward()方法
        so:
        我们希望在pushState和replaceState的时候具有和popState一样的功能

        ====================================================================*/
        //--------
        //1.返回未触发的自定义、自触发事件，取代原来的pushState和replaceState默认定义的事件
        //通过给history同名事件赋值重写
        const _wr = function (type) {
            const orig = history[type]
            
            return function () {
              const rv = orig.apply(this, arguments) 
              const e = new Event(type)
              e.arguments = arguments
              window.dispatchEvent(e)
              return rv 
            }
        }
        history.pushState = _wr('pushState');
        history.replaceState =  _wr("replaceState");


        //从预置数组中查找更改，
        var handler =  function(routes){
            console.log(arguments);
            var pathname = window.location.pathname
            for (var i = 0; i < routes.length; i ++) {
                if (pathname === routes[i].re) {
                    //对上号了触发数组中的回调
                    routes[i].handler.apply({})//执行路由handler
                }
            }
        }

        //--------------------------------------------------
        //3.触发监听，让pushState、replaceState拥有和popState一样的事件回调
        //执行相同的事件,就是从预置数组中查找，而不是新增
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
    //----------------------
    //2.执行是在这里，这里调用了pushState和replaceState，就会触发监听
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
        //---------------------------------------
        //4.back会触发popState的监听，但是这里的监听和pushState是一致的
        //都是从数组中查找
        window.history.back()
    }
}
    