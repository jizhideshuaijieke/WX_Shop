Page({
    data: {
        places: [],
        showPopup: false,
        inputtingPlace: {
            name: "",
            tele: "",
            address: ""
        }
    },
    onLoad(options) {
        this.getAllPlaces()
    },
    showPopup() {
        this.setData({
            showPopup: true
        })
    },
    offPopup() {
        this.setData({
            showPopup: false
        })
    },
    onFieldChange(e) {
        const { field } = e.currentTarget.dataset; // 获取字段名
        const value = e.detail; // 获取输入的值

        this.setData({
            [`inputtingPlace.${field}`]: value, // 动态更新对应字段
        });
    },
    saveNewPlace() {
        const newPlace = this.data.inputtingPlace;
        console.log(newPlace)
        if (!newPlace.name || !newPlace.tele || !newPlace.address) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none',
            });
            return;
        }

        this.setData({
            places: [...this.data.places, newPlace],
            inputtingPlace: {
                name: "",
                tele: "",
                address: ""
            }, // 重置输入框
            showPopup: false, // 关闭弹窗
        });
        this.saveAllPlaces();
        wx.showToast({
            title: '保存成功',
            icon: 'success',
        });
    },
    deletePlace(e) {
        const index = e.currentTarget.dataset.idx;

        if (index === undefined || index < 0 || index >= this.data.places.length) {
            wx.showToast({
                title: '操作失败',
                icon: 'none',
            });
            return;
        }

        wx.showModal({
            title: '确认删除',
            content: `确定删除地址：${this.data.places[index].name}的地址吗？`,
            success: (res) => {
                if (res.confirm) {
                    let updatedPlaces = [...this.data.places]; // 复制数组
                    updatedPlaces.splice(index, 1); // 删除对应索引的地址

                    this.setData({
                        places: updatedPlaces, // 更新数据
                    });
                    this.saveAllPlaces(); // 同步存储
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                    });
                }
            },
        });
    },
    saveAllPlaces() {
        wx.setStorage({
            key: "AllPlaces",
            data: {
                list: this.data.places
            }
        });
    },
    getAllPlaces() {
        wx.getStorage({
            key: "AllPlaces",
            success: (res) => {
                this.setData({
                    places: res.data.list
                })
            }
        })
    },
})