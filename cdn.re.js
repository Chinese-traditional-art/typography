module.exports = function (props = {}) {
  return {
    ...props,
    // cdn app 标识
    cdnAppId: 'cta_typography',
    // cdn 资源文件夹路径
    resourceFolderPath: './build',
    // 需要忽略的文件名
    ignoreBasename: [
      '.DS_Store',
    ],
    // 需要忽略的文件后缀
    ignoreExtname: [
      'map',
    ],
  };
};
