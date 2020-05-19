const mysql = require('mysql');
const async = require('async');
const crypto = require('crypto')
let db_conn = mysql.createPool({
    host:'ec2-13-124-200-211.ap-northeast-2.compute.amazonaws.com',
    user:'highrun_login',
    password:'runnershigh',
    database:'HIGHRUN',
    port:'3306'
    })
function convertPassword(password){
    return crypto.createHash('sha512').update(password).digest('base64');
}
function getUserData(event,callback){
    db_conn.getConnection((err,conn)=>{
        if(err){
            throw err;
        }
        conn.query(
            'INSERT INTO USER_DATA ( USER_ID, USER_PW, USER_NAME  ) VALUES ()',[event.id,convertPassword(event.password),event.name],
            (error,result,fields)=>{
                conn.release();
                console.log(result);
                if(error){
                    console.log(error);
                }
                else
                    callback({
                        statusCode:200,
                        data:JSON.parse(JSON.stringify(result[0]))
                    })
                    
                
            }
        )

    })   
}
exports.handler = function(event,context,callback){
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event);
    getUserData(event,(data)=>{

        console.log("result:",data)
        callback(null,data)

    })
    
}