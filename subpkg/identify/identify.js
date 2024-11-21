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
  // 绘制定位框的函数，接收后端返回的框信息
  drawMarks(frames) {
    const query = wx.createSelectorQuery();
    // 获取 Canvas 节点
    query.select('#actionMarks')
      .fields({
        node: true,
        size: true
      }) // 获取 Canvas 节点和尺寸
      .exec((res) => {
        const canvas = res[0].node; // 获取 Canvas 节点
        const ctx = canvas.getContext('2d'); // 获取 Canvas 的 2d 渲染上下文
        canvas.width = res[0].width; // 设置 Canvas 宽度
        canvas.height = res[0].height; // 设置 Canvas 高度

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 遍历后端返回的框信息，绘制每个定位框
        frames.forEach(frame => {
          // 提取框的信息，如种类、坐标、大小等
          const { type, x, y, width, height} = frame;

          // 根据框的类型设置不同的颜色或样式
          if (type === 'type1') {
            ctx.setStrokeStyle('#ff0000'); // 红色框
          } else if (type === 'type2') {
            ctx.setStrokeStyle('#00ff00'); // 绿色框
          } else {
            ctx.setStrokeStyle('#0000ff'); // 默认蓝色框
          }

          ctx.setLineWidth(3); // 设置线条宽度

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