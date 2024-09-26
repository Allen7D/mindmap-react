import React, { useEffect, useRef, useState } from 'react';
import MindMap from 'simple-mind-map';
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js';
import Watermark from 'simple-mind-map/src/plugins/Watermark.js';
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js';
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js';
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js';
import Export from 'simple-mind-map/src/plugins/Export.js';
import Drag from 'simple-mind-map/src/plugins/Drag.js';
import Select from 'simple-mind-map/src/plugins/Select.js';
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js';
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js';
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js';
import SearchPlugin from 'simple-mind-map/src/plugins/Search.js';
import Painter from 'simple-mind-map/src/plugins/Painter.js';
import Formula from 'simple-mind-map/src/plugins/Formula.js';
import RainbowLines from 'simple-mind-map/src/plugins/RainbowLines.js';
import Demonstrate from 'simple-mind-map/src/plugins/Demonstrate.js';
import OuterFrame from 'simple-mind-map/src/plugins/OuterFrame.js';
import { useTranslation } from 'react-i18next';

import icon from '@/config/icon';
import Loading from '@/utils/loading';
import handleClipboardText from '@/utils/handleClipboardText';
import { getData } from '@/api';
import useStore from '@/store';
import defaultNodeImage from '@/assets/img/imageLoadFailed.svg';

import './index.less';

const Edit: React.FC = () => {
  const state = useStore((state) => state);
  const { t } = useTranslation();
  const mindMapContainerRef = useRef<HTMLDivElement>(null);
  const [mindMap, setMindMap] = useState<any>(null);
  const [showDragMask, setShowDragMask] = useState(false);

  useEffect(() => {
    Loading.show();
    getData().then((data) => {
      // dispatch({ type: 'SET_MIND_MAP_DATA', payload: data });
      initMindMap(data);
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mindMap) {
        mindMap.destroy();
      }
    };
  }, []);

  const initMindMap = (data: any) => {
    const { root, layout, theme, view, config } = data;
    const mindMapInstance = new MindMap({
      el: mindMapContainerRef.current,
      data: root,
      fit: false,
      layout: layout,
      theme: theme.template,
      themeConfig: theme.config,
      viewData: view,
      nodeTextEditZIndex: 1000,
      nodeNoteTooltipZIndex: 1000,
      customNoteContentShow: {
        show: (content: any, left: number, top: number, node: any) => {
          // 自定义显示节点内容
        },
        hide: () => {
          // 自定义隐藏节点内容
        },
      },
      ...(config || {}),
      iconList: [...icon],
      useLeftKeySelectionRightKeyDrag: state.localConfig.useLeftKeySelectionRightKeyDrag,
      customInnerElsAppendTo: null,
      enableAutoEnterTextEditWhenKeydown: true,
      customHandleClipboardText: handleClipboardText,
      defaultNodeImage: defaultNodeImage,
      initRootNodePosition: ['center', 'center'],
      handleIsSplitByWrapOnPasteCreateNewNode: () => {
        return window.confirm(t('edit.splitByWrap'));
      },
      errorHandler: (code: string, err: Error) => {
        console.error(err);
        if (code === 'export_error') {
          alert(t('edit.exportError'));
        }
      },
      addContentToFooter: () => {
        const text = state.extraTextOnExport.trim();
        if (!text) return null;
        const el = document.createElement('div');
        el.className = 'footer';
        el.innerHTML = text;
        const cssText = `
          .footer {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: #979797;
          }
        `;
        return {
          el,
          cssText,
          height: 30,
        };
      },
      expandBtnNumHandler: (num: number) => {
        return num >= 100 ? '…' : num;
      },
      beforeDeleteNodeImg: (node: any) => {
        return new Promise((resolve) => {
          if (window.confirm(t('edit.deleteNodeImgTip'))) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      },
    });
	  /* eslint-disable react-hooks/rules-of-hooks */
    MindMap.usePlugin(MiniMap)
      .usePlugin(Watermark)
      .usePlugin(Drag)
      .usePlugin(KeyboardNavigation)
      .usePlugin(ExportPDF)
      .usePlugin(ExportXMind)
      .usePlugin(Export)
      .usePlugin(Select)
      .usePlugin(AssociativeLine)
      .usePlugin(NodeImgAdjust)
      .usePlugin(TouchEvent)
      .usePlugin(SearchPlugin)
      .usePlugin(Painter)
      .usePlugin(Formula)
      .usePlugin(RainbowLines)
      .usePlugin(Demonstrate)
      .usePlugin(OuterFrame);

    setMindMap(mindMapInstance);
    Loading.hide();
  };

  const handleResize = () => {
    if (mindMap) {
      mindMap.resize();
    }
  };

  const onDragenter = () => {
    if (state.isDragOutlineTreeNode) return;
    setShowDragMask(true);
  };

  const onDragleave = () => {
    setShowDragMask(false);
  };

  const onDrop = (e: React.DragEvent) => {
    setShowDragMask(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      // 处理文件导入
    }
  };

  return (
    <div
      className="editContainer"
      onDragEnter={onDragenter}
      onDragLeave={onDragleave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="mindMapContainer" ref={mindMapContainerRef}></div>
      {showDragMask && (
        <div className="dragMask" onDragLeave={onDragleave} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
          <div className="dragTip">{t('edit.dragTip')}</div>
        </div>
      )}
      {/* 其他组件 */}
    </div>
  );
};

export default Edit;