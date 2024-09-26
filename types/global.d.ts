export { };

declare global {
	interface Window {
		takeOverApp?: boolean;
		takeOverAppMethods?: {
			getLocalConfig: () => unknown;
		};
	}
}