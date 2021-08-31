import axios from 'axios'
import {baseURL} from './config'
function getIndex(suoyin){
    // console.log("向/index 发送了一次请求");
    // console.log(`向${baseURL+"/index"}发送请求`)
    return new Promise(function(resolve,reject){
        axios.get(baseURL+suoyin)
        .then(result=>{
            resolve(result.data)
            // console.log(result.data);
        })
    })
}
export {
    getIndex
}