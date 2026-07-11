/** 網站部署設定的單一事實來源：next.config.ts 與元件都從這裡取 basePath。 */
export const BASE_PATH = "/hsuan-resume";

export const SITE_ORIGIN = "https://joohnny3.github.io";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/** public/ 底下的靜態資源都要手動加 basePath（next/image 不會自動加）。 */
export const asset = (path: string) => `${BASE_PATH}${path}`;
