import { Spin } from 'antd';
import ReactDOM from 'react-dom';

class Loading {
  private static container: HTMLDivElement | null = null;

  public static show() {
    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }
    ReactDOM.render(<Spin tip="加载中..." size="large" />, this.container);
  }

  public static hide() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
      this.container = null;
    }
  }
}

export default Loading;