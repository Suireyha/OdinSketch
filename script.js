const canv = document.getElementById('canv');
const ctx = canv.getContext("2d");
const picker = document.querySelector('.picker');
const reset = document.querySelector('.reset');
const slider = document.querySelector('.slider');
const penBtn = document.getElementById('pen');
const eraBtn = document.getElementById('eraser');

let count = 0;
let painting = false;
let lineWidth = 20;
let firstWidth;
let tool = true;


ctx.lineCap = 'round';

const paint = (e) => {
    if(!painting){
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = picker.value;

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
reset.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canv.width, canv.height);
})



window.onload = function() {
    firstWidth = (document.body.clientWidth) - 100;
    canv.width = (firstWidth);
    picker.style.backgroundColor = (picker.value);
    picker.style.boxShadow = ( '0 0 15px ' + (picker.value));
    penBtn.setAttribute('style', 'box-shadow: 0 0 5px white;');
};

window.onresize = function() {
    adjust(document.body.clientWidth);
    
}

function adjust(width){
    canv.width -= (firstWidth - width) + 100;
    firstWidth = canv.width;
    console.log(canv.width);
}

picker.addEventListener('input', ()=>{
    picker.style.backgroundColor = (picker.value);
    picker.style.boxShadow = ( '0 0 15px ' + (picker.value));
    console.log(picker.value);

});

slider.addEventListener('change', ()=>{
    lineWidth = slider.value;
});

penBtn.addEventListener('click', ()=>{
    tool = true;
    penBtn.setAttribute('style', 'box-shadow: 0 0 5px white;');
    eraBtn.setAttribute('style', 'box-shadow: none;');
});

eraBtn.addEventListener('click', ()=>{
    tool = false;
    eraBtn.setAttribute('style', 'box-shadow: 0 0 5px white;');
    penBtn.setAttribute('style', 'box-shadow: none;');
});