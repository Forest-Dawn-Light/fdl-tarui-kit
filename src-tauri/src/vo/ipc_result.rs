pub struct IpcResult<T> {
    pub success: bool,
    pub value: Option<T>,
    pub error_code: Option<i32>,
    pub error_message: Option<String>,
}

impl<T> IpcResult<T> {
    pub fn new(success: bool, value: Option<T>, error_code: Option<i32>, error_message: Option<String>) -> Self {
        IpcResult {
            success,
            value,
            error_code,
            error_message,
        }
    }

    pub fn success(value: T) -> Self {
        IpcResult {
            success: true,
            value: Some(value),
            error_code: None,
            error_message: None,
        }
    }

    pub fn failure(error_code: i32, error_message: String) -> Self {
        IpcResult {
            success: false,
            value: None,
            error_code: Some(error_code),
            error_message: Some(error_message),
        }
    }
}