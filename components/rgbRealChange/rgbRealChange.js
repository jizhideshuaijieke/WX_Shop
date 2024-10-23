Component({
  properties: {
    // RGB取值区间
    min_limit: {
      type: Number,
      value: 0
    },
    max_limit: {
      type: Number,
      value: 255
    }
  },
  data: {
    // 颜色对象
    rgb: {
      r: 100,
      g: 100,
      b: 100
    },
    rgbColor: 'rgb(100, 100, 100)'
  },
  methods: {
    rAdd() {
      const newR = this.data.rgb.r + 1;
      if (newR < this.data.min_limit || newR > this.data.max_limit) return;
      this.setData({
        'rgb.r': newR
      });
    },
    gAdd() {
      const newG = this.data.rgb.g + 1;
      if (newG < this.data.min_limit || newG > this.data.max_limit) return;
      this.setData({
        'rgb.g': newG
      });
    },
    bAdd() {
      const newB = this.data.rgb.b + 1;
      if (newB < this.data.min_limit || newB > this.data.max_limit) return;
      this.setData({
        'rgb.b': newB
      });
    },
    rMinus() {
      const newR = this.data.rgb.r - 1;
      if (newR < this.data.min_limit || newR > this.data.max_limit) return;
      this.setData({
        'rgb.r': newR
      });
    },
    gMinus() {
      const newG = this.data.rgb.g - 1;
      if (newG < this.data.min_limit || newG > this.data.max_limit) return;
      this.setData({
        'rgb.g': newG
      });
    },
    bMinus() {
      const newB = this.data.rgb.b - 1;
      if (newB < this.data.min_limit || newB > this.data.max_limit) return;
      this.setData({
        'rgb.b': newB
      });
    },
  },
  observers: {
    'rgb.r, rgb.g, rgb.b': function (r, g, b) {
      this.setData({
        rgbColor: `rgb(${r}, ${g}, ${b})`
      }),
      console.log(this.data.rgb.r),
      console.log(this.data.rgb.g),
      console.log(this.data.rgb.b)
    }
  }
});
