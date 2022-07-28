const canv = document.getElementById('canv');
const ctx = canv.getContext("2d");
let count = 0;

canv.addEventListener('mousedown', (e)=>{
    console.log(e.clientX);
    console.log(e.clientY);

    if(count = 0){
    ctx.moveTo(e.clientX, e.clientY);
    count++
    }   

    else{
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    count = 0;
    }


});