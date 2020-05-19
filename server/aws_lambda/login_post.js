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
            'SELECT ID, USER_ID, USER_PW FROM USER_DATA WHERE USER_ID=? AND USER_PW=?',[event.id,convertPassword(event.password)],
            (error,result,fields)=>{
                conn.release();
                console.log(result);
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result[0]);
                    console.log(JSON.stringify(result[0]))
                    if(result.length===0){
                        callback({
                            statusCode:401
                        })
                    }
                    callback({
                        statusCode:200,
                        data:JSON.parse(JSON.stringify(result[0]))
                    })
                    
                }
            }
        )
        
    })
      
}
exports.handler = function(event,context,callback){
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event);
    let return_data ={};
    getUserData(event,(data)=>{

        console.log("result:",data)
        callback(null,data)

    })
    
}