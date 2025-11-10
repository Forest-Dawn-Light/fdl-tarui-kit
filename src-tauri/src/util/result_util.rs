
pub struct ResultUtil<T> {
    pub result: IpcResult<T>,
}

impl<T> ResultUtil<T> {

    pub fn success(data: T) -> IpcResult {
        let result = IpcResult {
            result: Some(result),
            data: Some(data),
        };

        result.success = true;
        result.message = "success".to_string();
        return result;
    }

    pub fn fail() -> IpcResult {
        ResultUtil { result: None }
    }
}
