import { DataSource } from "typeorm"

class DatabaseConnection{
    public myDataSource:DataSource;

    constructor(type:any, host:string, port:number, database:string){
        
        this.myDataSource = new DataSource({
            type: type,
            host: host,
            port: port,
            database: database,
        })
        
        this.myDataSource.initialize().then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })
    }
    public getDbConnetion(){
        return this.myDataSource;
    }
}

var dbConnection:DatabaseConnection = new DatabaseConnection("mongodb","localhost",27017,"user");
var db = dbConnection.getDbConnetion();
export {db}