import mysql, { Pool, PoolConnection, PoolConfig } from 'mysql';

export class MySQLManager {
    private pool: Pool;
    private config: PoolConfig;

    public static dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'house_furniture',
        connectionLimit: 10 // 连接池大小
    };

    constructor() {
        this.config =MySQLManager.dbConfig;
        this.pool = mysql.createPool(this.config);
    }
    /**
     * 执行原始 SQL 语句
     * @param sql 要执行的 SQL 字符串
     * @returns Promise 包含查询结果
     */
    public async executeQuery<T = any>(sql: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection: PoolConnection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(sql, (queryError, results) => {
                    connection.release(); // 释放连接到池
                    if (queryError) {
                        reject(queryError);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }

    /**
     * 关闭连接池
     */
    public async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
