; (function () {


  // var doms = {
  //   0: 'dom1',
  //   1: 'dom2',
  //   length: 2
  // }

  // for(var i = 0; i< dom.length; i++) {
  //   console.log(doms[i])
  // }

  var myJq = function (el) {
    return new myJq.fn.init(el)
  }
  myJq.fn = myJq.prototype = {
    /**
     * @function [init函数选择器.将init变成构造函数，负责选取dom元素]
     * @param {this:将选取到的dom元素放在this这个对象中，是因为this 在构造函数中，任何地方都可以访问到} 
     * @param {push:将数组的push方法重新写在构造函数的原型上}
     * @param {*} el 
     * @param {作用域怎么互通：init的作用域 和 myJq的作用域 将myJq的原型对象赋值给了init的原型对象}
     */
    init: function (el) {
      if (typeof el === 'string') {
        var dom = document.querySelectorAll(el)
        for (var i = 0; i < dom.length; i++) {
          this.push(dom[i])
        }
      }
    },
    push: [].push,
    /**
     * @function [判断上下滑动，判断三角形的邻边和对边的大小关系]
     * 
     * @param {*通过回调函数将判断出的结果传递出去.回调函数在执行的过程会将实际参数传递给形式参数} fn 
     */
    swipe: function (fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', mytouch)
        this[i].addEventListener('touchend', mytouch)
      }
      var startx, starty, endx, endy;
      function mytouch(e) {
        var touchs = e.changedTouches[0];
        switch (e.type) {
          case "touchstart":
            startx = touchs.pageX;
            starty = touchs.pageY;
            break;
          case "touchend":
            endx = touchs.pageX;
            endy = touchs.pageY;

            if (Math.abs(endx - startx) < Math.abs(endy - starty) && starty - endy <= -25) {
              fn.call(this, e, 'bottom')
            }
            if (Math.abs(endx - startx) < Math.abs(endy - starty) && starty - endy >= 25) {
              fn.call(this, e, 'top')
            }
            if (Math.abs(endx - startx) > Math.abs(endy - starty) && startx - endx >= 25) {
              // console.log('left')
              fn.call(this, e, 'left')
            }
            if (Math.abs(endx - startx) > Math.abs(endy - starty) && startx - endx <= -25) {
              // console.log('right')
              fn.call(this, e, 'right')
            }
            break;
        }
      }

    },
    /**
     * @function [click300ms延迟问题]
     */
    tap: function (fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', mytouch)
        this[i].addEventListener('touchend', mytouch)
      }
      var startTime, endTime;
      function mytouch(e) {
        var touchs = e.changedTouches[0];
        switch (e.type) {
          case "touchstart":
            startTime = Date.now();
            break;
          case "touchend":
            endTime = Date.now();
            if (endTime - startTime <= 300) {
              fn.call(this, e)
            }
            break;
        }
      }
    },
    /**
     * @param {return this；实现链式调用的关键}
     */
    fn1: function() {
      console.log('我是fn1的函数')
      return this;
    },
    fn2: function() {
      console.log('我是fn2的函数')
      return this;
    },
  }
  // {作用域怎么互通：init的作用域 和 myJq的作用域 将myJq的原型对象赋值给了init的原型对象}
  myJq.fn.init.prototype = myJq.fn;
  window.$ = window.myJq = myJq;
  // $()
})()