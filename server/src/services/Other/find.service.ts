import executeQuery from "./queryExecuter.service"

const findData = async(tableName: string,columnNames: (string|number) [], whereCondition: string) =>{
    const findUserData =  `select ${columnNames} from ${tableName} where ${whereCondition} `
    // console.log('finduserdata',findUserData)
    const responseData = await executeQuery(findUserData)
    
    if(responseData.length > 0){
        return {result:true}
    }
    else{
        return {result:false}
    }
}

export =  findData