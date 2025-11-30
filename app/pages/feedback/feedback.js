Page({
  data: {
    content: '',
    charCount: 0
  },

  onInput(e) {
    const content = e.detail.value;
    this.setData({
      content: content,
      charCount: content.length
    });
  },

  onSubmit() {
    if (this.data.content.trim().length === 0) {
      wx.showToast({
        title: '反馈内容不能为空',
        icon: 'none'
      });
      return;
    }

    // Here you would typically call an API to submit the feedback
    // For now, we'll just show a success message and navigate back
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
