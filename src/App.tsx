import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

import Toolbar from '@/components/Toolbar';
import Edit from '@/components/Edit';
import { getLocalConfig } from '@/api';
import useStore, { getUserMindMapData } from '@/store';

import './App.less';

const Index: React.FC = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const isZenMode = useStore((state) => state.localConfig.isZenMode);
  const isDark = useStore((state) => state.localConfig.isDark);
  const activeSidebar = useStore((state) => state.activeSidebar);
  const setLocalConfig = useStore((state) => state.setLocalConfig);

  useEffect(() => {
    initLocalConfig();
    loadData();
  }, []);

  useEffect(() => {
    setBodyDark();
  }, [isDark]);

  const initLocalConfig = () => {
    const config = getLocalConfig();
    if (config) {
      setLocalConfig({
        ...config
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    await getUserMindMapData();
    setShow(true);
    setLoading(false);
    setBodyDark();
  };

  const setBodyDark = () => {
    if (isDark) {
      document.body.classList.add('isDark');
    } else {
      document.body.classList.remove('isDark');
    }
  };

  return (
    <Spin spinning={loading} tip="加载中...">
      <div className={[
        'container',
        isDark ? 'isDark' : '',
        activeSidebar ? 'activeSidebar' : ''
      ].filter(Boolean).join(' ')}>
        {show && (
          <>
            {!isZenMode && <Toolbar />}
            <Edit />
          </>
        )}
      </div>
    </Spin>
  );
};

export default Index;