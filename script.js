const canv = document.getElementById('canv');
const ctx = canv.getContext("2d");
let count = 0;
let painting = false;

//let lineWidth = 1;
ctx.lineCap = 'round';

const paint = (e) => {
    if(!painting){
        return;
    }

    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

}

canv.addEventListener('mousedown', (e)=>{
    painting = true;
});

canv.addEventListener('mouseup', e => {
    painting = false;
    ctx.stroke();
    ctx.beginPath();
});

canv.addEventListener('mousemove', paint);


/*
    I totally realise that the best way to account for the flex
    disrupting the 'hitbox' of the canvas would just be to set
    the width and height to compensate based on the window size,
    however, I doubt I will have learnt much if I just impliment
    an existing HTML element, i.e - the canvas. Maybe I'll take
    a different approach instead?
*/