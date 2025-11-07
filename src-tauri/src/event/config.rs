
pub struct Config {
    pub fullscreen: bool,
    pub debug: bool,
    pub log_level: log::Level,
}

#[tauri::command]
pub fn load_config() -> Config {
    // Load config from file
    let config_file = std::fs::File::open("config.toml").unwrap();
    if let Ok(config) = toml::from_reader::<_, Config>(config_file) {
        return config;
    }

    let default = Config {
        fullscreen: true,
        debug: true,
        log_level: log::Level::Debug,
    }

    log::info!("No config file found, creating one with default values.");
    if std::fs::create_dir_all("config").is_err() {
        log::error!("Failed to create config directory.");
    }
    if std::fs::create_dir_all("save").is_err() {
        log::error!("Failed to create save directory.");}
    }
    toml::to_writer_pretty(std::fs::File::create("config.toml").unwrap(), &default).unwrap();

    return default;
}
