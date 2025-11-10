use crate::util::ConfigUtils;

#[tauri::command]
pub fn get_config(key: String) {
    return ConfigUtils.get_config(key);
}
