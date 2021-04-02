# qc-spa-router
单页面应用路由的实现原理，实例

## 原理  
>========================    
>首先第一个问题，在同一个页面上如何实现路径的变化,而不去自动刷新页面呢？
* hash
* pushState和replaceState  
>以上两种可以只更改路径，不刷新界面  

>========================     
>然后第二个问题，不自动刷新页面，我们如何随着路径变化手动刷新页面呢？    
>这里我们写一个routes去初始化添加path和path对用callback    
>注意，这个callback是我们手动刷新的关键    
```
routes.add({path,callback})
```
>在具体执行上边两种类型更改路径的方法时;  
>触发监听，调用callback，按自己的意愿去通过代码选择展示的内容
