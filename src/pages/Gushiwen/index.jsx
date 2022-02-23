/* eslint-disable no-new */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { getGushiwen } from '@/utils/request';
import DotsBorder from '@/utils/canvas-dot-border';
import sealSvg from './seal.svg';

import '@/styles/function.scss';
import './index.scss';
import './content.scss';

const Gushiwen = () => {
  const [conInfo, setConInfo] = useState(null);
  const getContent = async () => {
    const x = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const res = await getGushiwen(x.gsw_name || '师说');
    const result = res?.data?.result || {};
    const {
      title,
      author,
      dynasty,
      content,
    } = result;

    setConInfo({
      title,
      author,
      dynasty,
      content: content?.flat(Infinity).join('\n'),
    });
  };
  useEffect(() => {
    getContent();
  }, []);
  useEffect(() => {
    if (conInfo) {
      setTimeout(() => {
        const container = document.querySelector('.gushiwen-container');
        container.scrollLeft = 10000;
        document.querySelector('.gushiwen-mask').className += ' gushiwen-mask-ani';
      }, 3000);
      new DotsBorder({
        selectEl: '.gushiwen-container',
        borderWidth: 10,
        borderColor: '#333',
        borderDotColor: '#ffffff',
      });
    }
  }, [
    conInfo,
  ]);

  return (
    <div className="gushiwen-container-outer">
      <div className="gushiwen-xy" />
      <div className="gushiwen-mask" />
      <div className="gushiwen-container">
        <div className="gushiwen-inner">
          <div className="gsw-header f-cb">
            <span className="f-fl">
              {conInfo?.title}<b>·</b>
            </span>
            <div className="gsw-header-attach f-fl">
              <div className="gsw-person f-fl">
                <p>{conInfo?.dynasty}</p>
                <p>{conInfo?.author}</p>
              </div>
              <img src={sealSvg} className="gushiwen-seal0" alt="seal" />
            </div>
          </div>
          {conInfo?.content}
        </div>
      </div>
    </div>
  );
};

export default Gushiwen;
