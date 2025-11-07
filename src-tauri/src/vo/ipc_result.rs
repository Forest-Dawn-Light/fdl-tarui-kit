pub struct IpcResult<T> {
    pub success: bool,
    pub value: Option<T>,
    pub error_code: Option<i32>,
    pub error_message: Option<String>,
}
