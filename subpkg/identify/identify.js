Page({
  data: {
    frameCount: 0
  },
  onFrame(event) { //默认每秒提供 30 帧
    frameData++;
    if (frameData % 5 != 0) return; //改为每秒6帧
    const frameData = event.detail.data;
    const base64Data = this.arrayBufferToBase64(frameData)
    wx.request({
      url: '',
      method: 'POST',
      data: {
        frame: base64Data
      },
      success: (res) => { //回调
        this.drawMarks(res.data);
      }
    });
  },
  //ArrayBuffer转Base64
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer); // 创建一个 Uint8Array 来读取 ArrayBuffer
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]); // 转换每个字节为字符
    }
    return btoa(binary); // 使用 btoa 将二进制字符串转换为 Base64
  },

  drawMarks(frames) {
    const query = wx.createSelectorQuery();

    query.select('#actionMarks')
      .fields({
        node: true,
        size: true
      }) // 获取 Canvas 节点和尺寸
      .exec((res) => {
        const canvas = res[0].node; // 获取 Canvas 节点
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width; // 设置 Canvas 绘制区域宽度
        canvas.height = res[0].height; // 设置 Canvas 绘制区域高度

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 遍历后端返回的框信息，绘制每个定位框
        frames.forEach(frame => {
          const { type, x, y, width, height} = frame;
          if (type === 'type1') {
            ctx.setStrokeStyle('#ff0000');
          } else if (type === 'type2') {
            ctx.setStrokeStyle('#00ff00');
          } else {
            ctx.setStrokeStyle('#0000ff');
          }

          ctx.setLineWidth(3);

          // 绘制矩形框
          ctx.beginPath();
          ctx.rect(x, y, width, height);
          ctx.stroke(); // 执行绘制
        });

        // 渲染画布
        ctx.draw();
      });
  }
});