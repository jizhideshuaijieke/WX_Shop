// components/test.js
Component({
  /*组件的属性列表*/
  properties: {
    max: {
      type: Number,
      value: 0
    }
  },

  /*组件的初始数据 */
  data: {
    a: 0,
    b: 0,
    sum: 0,
    limit: 20
  },

  /* 组件的方法列表*/
  methods: {
    addMax() {
      if (this.properties.max >= this.data.limit) return
      this.setData({
        max: this.properties.max + 1
      })
      this._showMax()
    },
    addA() {
      this.setData({
        a: this.data.a + 1
      })
    },
    addB() {
      this.setData({
        b: this.data.b + 1
      })
    },
    //自定义函数
    _showMax() {
      wx.showToast({ //消息提示框
        title: 'Success!Max=' + this.properties.max,
        icon: "success"
      })
    }
  },
  //数据监听器
  observers: {
    'a,b': function (a, b) {//监听a,b值的变化
      this.setData({
        sum: a + b
      })
    }
  }
})