import { DataSource } from 'typeorm'
import path from 'path'
class DatabaseConnection {
    public myDataSource: DataSource

    constructor (type: any, host: any, port: any, database: any) {
        this.myDataSource = new DataSource({
            type,
            host,
            port,
            database,
            name: 'default',
            entities: [
                path.join(__dirname, '/*.entity.ts')
            ],
            logging: true,
            synchronize: true
        })
        this.myDataSource.initialize().then(() => {
            console.log(__dirname, 'Database is connected')
        })
        .catch((err) => {
            console.error('Error during Data Source initialization(Database connection):', err)
        })
    }

    public getDbConnetion (): any {
        return this.myDataSource
    }
}

const dbConnection: DatabaseConnection = new DatabaseConnection(process.env.TYPE, process.env.HOST, process.env.DB_PORT, process.env.DB_NAME)
const db = dbConnection.getDbConnetion()
export { db }
