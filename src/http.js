import axios from 'axios';
//创建axios实例
let service = axios.create({
  baseURL: "https://www.51gso.com/arvato/app/arvato_shop_api.php?i=194&r=",
  timeout: 5000,
  headers: {
    'content-type': "application/json"
  }
})
export default{
    //get请求
    get(url,param){
        return new Promise((callback,reject)=>{
            service({
                method:"get",
                url,
                params:param
            }).then(res=>{
                //axios返回一个promise对象
                let res_code=res.status.toString();
                if(res_code.charAt(0)==2){
                    callback(res.data);//callback在promise执行器内部
                }else{
                    console.log(res,"异常")
                }
            }).catch(err=>{
                if(!err.response){
                    console.log("请求错误")
                }else{
                    reject(err.response);
                    console.log(err.response,"异常2")
                }
            })
        })
    }
}
