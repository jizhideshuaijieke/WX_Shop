Component({
    options: {
        //纯数据字段，不会被渲染
        pureDataPattern: /^PD_/
    },
    pageLifetimes: {
        show() {
            this.getRandomColor()
        },
        hide() {},
        resize() {}
    },
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
        PD_rgb: {
            r: 100,
            g: 100,
            b: 100
        },
        //直接使用字符串也可以
        Color: ''
    },
    methods: {
        getRandomColor() {
            this.setData({
                PD_rgb: { //很简洁的赋值语句
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256)
                }
            });
        },
        rAdd() {
            const newR = this.data.PD_rgb.r + 5;
            if (newR < this.data.min_limit || newR > this.data.max_limit) return;
            this.setData({
                /*在微信小程序中，当你使用 this.setData 方法来更新数据对象中的嵌套属性时，使用引号（''）包围属性名是为了让其被正确解析为字符串路径。*/
                'PD_rgb.r': newR
            });
        },
        gAdd() {
            const newG = this.data.PD_rgb.g + 5;
            if (newG < this.data.min_limit || newG > this.data.max_limit) return;
            this.setData({
                'PD_rgb.g': newG
            });
        },
        bAdd() {
            const newB = this.data.PD_rgb.b + 5;
            if (newB < this.data.min_limit || newB > this.data.max_limit) return;
            this.setData({
                'PD_rgb.b': newB
            });
        },
        rMinus() {
            const newR = this.data.PD_rgb.r - 5;
            if (newR < this.data.min_limit || newR > this.data.max_limit) return;
            this.setData({
                'PD_rgb.r': newR
            });
        },
        gMinus() {
            const newG = this.data.PD_rgb.g - 5;
            if (newG < this.data.min_limit || newG > this.data.max_limit) return;
            this.setData({
                'PD_rgb.g': newG
            });
        },
        bMinus() {
            const newB = this.data.PD_rgb.b - 5;
            if (newB < this.data.min_limit || newB > this.data.max_limit) return;
            this.setData({
                'PD_rgb.b': newB
            });
        },
    },
    observers: {
        'PD_rgb.r, PD_rgb.g, PD_rgb.b': function (r, g, b) {
            this.setData({
                //反引号是模板字面量中嵌入变量的格式要求
                //${} 是模板字面量（Template Literal）的一部分。在 JavaScript 中，模板字面量使用反引号（`）括起来，可以包含变量或表达式。${} 中的内容会被替换为对应的变量值。
                Color: `rgb(${r}, ${g}, ${b})`
            })
        }
    }
});