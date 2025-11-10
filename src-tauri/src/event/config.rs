use crate::util::CONFIG_UTILS;
use crate::vo::ConfigVo;
// 注意路径可能需要调整

#[tauri::command]
pub fn get_config(key: String) -> ConfigVo {
    let config_utils = CONFIG_UTILS.lock().unwrap();
    // 根据实际 ConfigVo 结构获取对应字段
    config_utils.get_config().clone()
}