import exampleData from 'simple-mind-map/example/exampleData';
import { simpleDeepClone } from 'simple-mind-map/src/utils/index';

const SIMPLE_MIND_MAP_LOCAL_CONFIG = 'SIMPLE_MIND_MAP_LOCAL_CONFIG';

/**
 * @Desc: 获取缓存的思维导图数据
 */
export const getData = async () => {
	let store;
	if (store == null) {
		return simpleDeepClone(exampleData);
	} else {
		try {
			return JSON.parse(store);
		} catch (error) {
			console.error(error);
			return simpleDeepClone(exampleData);
		}
	}
};

/**
 * @Desc: 获取本地配置
 */
export const getLocalConfig = () => {
	if (window.takeOverApp) {
		return window.takeOverAppMethods?.getLocalConfig();
	}
	const config = localStorage.getItem(SIMPLE_MIND_MAP_LOCAL_CONFIG);
	if (config) {
		return JSON.parse(config);
	}
	return null;
};
