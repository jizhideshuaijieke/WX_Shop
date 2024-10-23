Component({
    data: {
        parentData: 'Hello from Parent',
        dataFromChild: String
    },
    methods: {
        handleChildEvent(event) {
            // 子组件传递来的数据
            this.setData({
                dataFromChild: event.detail.message
            });
        },
        getChildEntity(){
            const child=this.selectComponent('.test2');
            console.log(child)
        }
    }
});