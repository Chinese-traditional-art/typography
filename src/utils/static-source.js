export const loadFont = (name, url) => {
  // name 字体名称
  // url  字体链接
  const style = document.createElement('style');

  style.innerText = '@font-face {font-family:' + name + ';src:url(' + url + ')};font-display: swap';
  document.getElementsByTagName('head')[0].appendChild(style);
};