import json
import pymysql

# 读取 JSON 文件
with open('E:\\vue\\a1\\a1\comment\家具 copy.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 连接到数据库
connection = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='123',
    database='house_furniture',
    charset='utf8mb4'
)

try:
    with connection.cursor() as cursor:
        # 清空表数据
        cursor.execute("DELETE FROM status_enum")
        cursor.execute("DELETE FROM status_range")
        cursor.execute("DELETE FROM status_metadata")
        cursor.execute("DELETE FROM furniture")
        cursor.execute("DELETE FROM room")

        # 插入房间数据
        for room in data['room_list']:
            cursor.execute("INSERT INTO room (room_name) VALUES (%s)", (room['name'],))
            room_id = cursor.lastrowid

            # 插入家具数据
            for furniture in room['furniture']:
                cursor.execute(
                    "INSERT INTO furniture (room_id, furniture_name, furniture_type, unique_id) VALUES (%s, %s, %s, %s)",
                    (room_id, furniture['name'], furniture['type'], furniture['unique_id'])
                )
                furniture_id = cursor.lastrowid

                # 插入状态元数据
                for status in furniture['status']:
                    cursor.execute(
                        "INSERT INTO status_metadata (furniture_id, status_name, data_type, description, data_api_name) VALUES (%s, %s, %s, %s, %s)",
                        (furniture_id, status['name'], status['type'], status['description'], status['data_api_name'])
                    )
                    status_id = cursor.lastrowid

                    # 插入数值范围数据
                    if status['type'] == 'int':
                        cursor.execute(
                            "INSERT INTO status_range (status_id, min_value, max_value) VALUES (%s, %s, %s)",
                            (status_id, status['range'][0], status['range'][1])
                        )

                    # 插入枚举选项数据
                    elif status['type'] == 'enum':
                        for enum_value in status['range']:
                            cursor.execute(
                                "INSERT INTO status_enum (status_id, enum_value) VALUES (%s, %s)",
                                (status_id, enum_value)
                            )

    # 提交事务
    connection.commit()
finally:
    connection.close()
