import executeQuery from "../Other/queryExecuter.service"

const selectData = async(tableName: string, colNameArr: string[], where?: string )=>{
    try{
        // console.log('select started')
        const selectQuery = `select ${colNameArr} from ${tableName} ${where ? `where ${where}` : "" }`
        // console.log("selectQuery",selectQuery)
        let resultData = await executeQuery(selectQuery)
        // console.log("select service",resultData)
        return resultData
    }
    catch(err: any){
        throw new Error(err)
    }
}
export = selectData