use crate::vo::IpcResult;

#[tauri::command]
pub fn test() -> IpcResult<String> {
    return IpcResult::success("test".to_string());
}
