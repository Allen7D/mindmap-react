import { create } from 'zustand';
import exampleData from 'simple-mind-map/example/exampleData';

// 定义状态类型
interface LocalConfig {
  isZenMode: boolean;
  openNodeRichText: boolean;
  useLeftKeySelectionRightKeyDrag: boolean;
  isShowScrollbar: boolean;
  isUseHandDrawnLikeStyle: boolean;
  isDark: boolean;
}

interface MindMapData {
  // 根据实际数据结构定义
}

export interface State {
  mindMapData: MindMapData | null;
  isHandleLocalFile: boolean;
  localConfig: LocalConfig;
  activeSidebar: string;
  isOutlineEdit: boolean;
  isReadonly: boolean;
  isSourceCodeEdit: boolean;
  extraTextOnExport: string;
  supportHandDrawnLikeStyle: boolean;
  supportMark: boolean;
  supportNumbers: boolean;
  supportFreemind: boolean;
  supportExcel: boolean;
  isDragOutlineTreeNode: boolean;
  setMindMapData: (data: MindMapData) => void;
  setIsHandleLocalFile: (value: boolean) => void;
  setLocalConfig: (config: Partial<LocalConfig>) => void;
  setActiveSidebar: (sidebar: string) => void;
  setIsOutlineEdit: (value: boolean) => void;
  setIsReadonly: (value: boolean) => void;
  setIsSourceCodeEdit: (value: boolean) => void;
  setExtraTextOnExport: (text: string) => void;
  setSupportHandDrawnLikeStyle: (value: boolean) => void;
  setSupportMark: (value: boolean) => void;
  setSupportNumbers: (value: boolean) => void;
  setSupportFreemind: (value: boolean) => void;
  setSupportExcel: (value: boolean) => void;
  setIsDragOutlineTreeNode: (value: boolean) => void;
}

// 创建 Zustand store
const useStore = create<State>((set) => ({
  mindMapData: null,
  isHandleLocalFile: false,
  localConfig: {
    isZenMode: false,
    openNodeRichText: true,
    useLeftKeySelectionRightKeyDrag: false,
    isShowScrollbar: false,
    isUseHandDrawnLikeStyle: false,
    isDark: false,
  },
  activeSidebar: '',
  isOutlineEdit: false,
  isReadonly: false,
  isSourceCodeEdit: false,
  extraTextOnExport: '',
  supportHandDrawnLikeStyle: false,
  supportMark: false,
  supportNumbers: false,
  supportFreemind: false,
  supportExcel: false,
  isDragOutlineTreeNode: false,
  setMindMapData: (data) => set({ mindMapData: data }),
  setIsHandleLocalFile: (value) => set({ isHandleLocalFile: value }),
  setLocalConfig: (config) => set((state) => ({ localConfig: { ...state.localConfig, ...config } })),
  setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),
  setIsOutlineEdit: (value) => set({ isOutlineEdit: value }),
  setIsReadonly: (value) => set({ isReadonly: value }),
  setIsSourceCodeEdit: (value) => set({ isSourceCodeEdit: value }),
  setExtraTextOnExport: (text) => set({ extraTextOnExport: text }),
  setSupportHandDrawnLikeStyle: (value) => set({ supportHandDrawnLikeStyle: value }),
  setSupportMark: (value) => set({ supportMark: value }),
  setSupportNumbers: (value) => set({ supportNumbers: value }),
  setSupportFreemind: (value) => set({ supportFreemind: value }),
  setSupportExcel: (value) => set({ supportExcel: value }),
  setIsDragOutlineTreeNode: (value) => set({ isDragOutlineTreeNode: value }),
}));

// 设置初始思维导图数据的动作
export const getUserMindMapData = () => {
  const setMindMapData = useStore.getState().setMindMapData;
  try {
    setMindMapData(exampleData);
  } catch (error) {
    console.log(error);
  }
};

export default useStore;