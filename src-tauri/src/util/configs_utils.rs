use tauri::Config;
use crate::vo::config_vo::ConfigVo;
use lazy_static::lazy_static;

pub struct ConfigUtils {
    pub config: ConfigVo,
}

impl ConfigUtils {
    pub fn new() -> Self {
        ConfigUtils {
            config: ConfigVo::default(),
        }
    }

    pub fn get_config(&self) -> &ConfigVo {
        &self.config
    }


    pub fn init_config(&mut self) -> Result<&ConfigVo, config::ConfigError> {
        let configs = config::Config::builder()
            .add_source(config::File::with_name("configuration.yaml"))
            .build()?;

        self.config = configs.try_deserialize::<ConfigVo>()?;
        return Ok(&self.config);
    }
}

lazy_static! {
    pub static ref CONFIG_UTILS: std::sync::Mutex<ConfigUtils> = std::sync::Mutex::new(ConfigUtils::new());
}
