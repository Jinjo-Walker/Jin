let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
// 以下是滑动退出事件
 function touchstart({changedTouches}){
    startPoint = {
            x: changedTouches[0].pageX,
            y: changedTouches[0].pageY
        }
    // console.log(startPoint)
    };
function touchend(e){
    let touch = e.changedTouches[0];
    let nowPoint = {
        x: touch.pageX,
        y: touch.pageY
    };
    disPoint = {
        x: nowPoint.x - startPoint.x,
        y: nowPoint.y - startPoint.y
    };
    if(startPoint.x<20&&disPoint.x>120){
        history.go(-1)
    }
};
export default({touchstart,touchend})