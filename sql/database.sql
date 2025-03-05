-- Active: 1735023873470@@127.0.0.1@3306@house_furniture
-- 房间表
USE house_furniture;
CREATE TABLE room (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 家具表
CREATE TABLE furniture (
    furniture_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    furniture_name VARCHAR(50) NOT NULL,
    furniture_type VARCHAR(20) NOT NULL,
    --改家具的英文名称和房间名拼接
    unique_id VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 状态元数据表
CREATE TABLE status_metadata (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    furniture_id INT NOT NULL,
    status_name VARCHAR(50) NOT NULL,
    data_type ENUM('bool', 'int', 'enum') NOT NULL,
    description TEXT,
    data_api_name VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (furniture_id) REFERENCES furniture(furniture_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 数值范围表（仅当 data_type=int 时使用）
CREATE TABLE status_range (
    range_id INT AUTO_INCREMENT PRIMARY KEY,
    status_id INT NOT NULL,
    min_value INT NOT NULL,
    max_value INT NOT NULL,
    FOREIGN KEY (status_id) REFERENCES status_metadata(status_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 枚举选项表（仅当 data_type=enum 时使用）
CREATE TABLE status_enum (
    enum_id INT AUTO_INCREMENT PRIMARY KEY,
    status_id INT NOT NULL,
    enum_value VARCHAR(50) NOT NULL,
    FOREIGN KEY (status_id) REFERENCES status_metadata(status_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;