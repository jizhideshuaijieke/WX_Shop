Component({
    properties: {
        prop: String
    },
    methods: {
        emitEvent() {
            //          父组件里的处理来自子组件事件的函数
            this.triggerEvent('childEvent', {
                message: 'Hello from Child' //参数
            });
        }
    }
});