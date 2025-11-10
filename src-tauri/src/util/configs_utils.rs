use tauri::Config;
use crate::vo::config_vo::ConfigVo;

pub struct ConfigUtils {
    static config: ConfigVo,
}

impl ConfigUtils {

    pub fn get_config(&self) -> &ConfigVo {
        &self.config
    }


    pub fn init_config(&mut self) -> Result<ConfigVo, config::ConfigError> {
        let configs = config::Config::builder()
            .add_source(config::File::with_name("configuration.yaml"))
            .build()?;

        self.config = configs.try_deserialize::<ConfigVo>()?;
    }
}

