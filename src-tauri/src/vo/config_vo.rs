

#[derive(serde::Deserialize)]
pub struct ConfigVo {
    pub fullscreen: bool,
    pub start_at_login: bool,
    // 退出后在托盘
    pub quit_to_tray: bool,
    pub debug: bool,
    pub log_level: String,
}

impl Default for ConfigVo {
    fn default() -> Self {
        ConfigVo {
            fullscreen: false,
            start_at_login: false,
            quit_to_tray: false,
            debug: false,
            log_level: "info".to_string(),
        }
    }
}
