import React, { CSSProperties, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export interface IframeProps {
  // extends React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
  id?: string;
  title?: string;
  src?: string;
  className?: string;
  style?: CSSProperties;
  templateData?: any;
}

const Iframe: React.FC<IframeProps> = (props) => {
  const dom = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(dom);
  }, []);
  const { title } = props;
  const updatePost = ({ templateData } = {}) => {
    const { type } = templateData;
    console.log('数据加载状态:');
    console.log(dom);
    // if (type === 'success'
    //   && this.iframe.contentWindow
    //   && this.iframe.contentWindow.postMessage) {
    //   // 与 iframe 通信；
    //   // console.log('与 iframe 通信成功', templateData);
    //   this.iframe.contentWindow.postMessage(templateData, '*');
    // }
  };

  const getData = () => {
    const { templateData } = props;
    console.log('iframe 加载状态:', templateData.type);
    if (templateData.type && templateData.type === 'success') {
      updatePost(templateData);
    } else {
      dispatch({ type: '' });
    }
  };
  return <iframe {...props} ref={dom} title={title} onLoad={getData} />;
};

Iframe.defaultProps = {
  id: 'iframe',
  title: 'iframe',
  src: 'https://element.eleme.cn/',
  templateData: {
    type: 'success',
  },
};

export default Iframe;
