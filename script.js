const cont = document.querySelector('.cont');
const sizeCounter = document.querySelector('.size');
const picker = document.querySelector('.picker');
const reset = document.querySelector('.reset');
const slider = document.querySelector('.slider');
const eraBtn = document.querySelector('.eraser');


let erasing = false;
let canvSide = slider.value;
let pixelSize = 510 / canvSide;
let count = 0;
let column = [];
let mDown;

function paint(cell, overwrite){
    if ((mDown || overwrite) && erasing){
        cell.style.backgroundColor  = 'white';
    }
    else if(mDown || overwrite){
    cell.style.backgroundColor = picker.value;
    } 
}

function buildCanv(){

    cont.setAttribute('style', 'width: ' + (+canvSide*pixelSize) + 'px; height: ' + (+canvSide*pixelSize) + 'px;');

    for (var x = 0; x < canvSide; x++){
        let row = [];
        for (var i = 0; i < canvSide; i++, count++){
                row[i] = document.createElement('div');
                row[i].classList.add('pixel');
                row[i].setAttribute('id', (+count));
                row[i].setAttribute('style', 'width: ' + (+pixelSize) + 'px; height: ' + (pixelSize) + 'px;');
                row[i].addEventListener('mouseover', (e)=>{paint(e.target);});
                row[i].addEventListener('click', (e)=>{paint(e.target, true);})
                if(i == (canvSide - 1)){
                    row[i].setAttribute('style', 'display: inline-block; width: ' + (+pixelSize) + 'px; height: ' + (pixelSize) + 'px;');
                }
            }
        column[x] = row;
    }
}

function appendCanv(){
    for (var x = 0; x < canvSide; x++){
        for (var y = 0; y < canvSide; y++){
            cont.appendChild(column[x][y]);
        }
    }
}

function resetCanv(){
    for (var i = 0; i < canvSide; i++){
        for (var x = 0; x < canvSide; x++){
            cont.removeChild(column[i][x]);        
        }
    }
}

slider.addEventListener('input', ()=>{
    sizeCounter.textContent = (+slider.value) + ' x ' + (+slider.value);
});

slider.addEventListener('change', ()=>{
    resetCanv();
    canvSide = slider.value
    pixelSize = 510 / canvSide; 
    buildCanv();
    appendCanv();
});

picker.addEventListener('input', ()=>{
    picker.style.backgroundColor = (picker.value);
    picker.style.boxShadow = ( '0 0 15px ' + (picker.value));
});

eraBtn.addEventListener('click', ()=>{
    
    if(erasing == false){
        erasing = true;
        eraBtn.setAttribute('style', 'border-color: lime; color: lime; box-shadow: 0 0 15px lime;');
    }
    else{
        erasing = false;
        eraBtn.setAttribute('style', 'border-color: white; color: white; box-shadow: none;');
    }
    console.log(erasing);
})

eraBtn.addEventListener('mouseover', ()=>{
    eraBtn.setAttribute('style', 'cursor: grabbing; color: lightgray; border-color: lightgray; box-shadow: 0 0 15px lightgray;');
})

eraBtn.addEventListener('mouseleave', ()=>{
    if (erasing){
        eraBtn.setAttribute('style', 'border-color: lime; color: lime; box-shadow: 0 0 15px lime;');
    }
    else{
        eraBtn.setAttribute('style', 'border-color: white; color: white; box-shadow: none;');
    }
})

//Main
buildCanv();
appendCanv();
document.addEventListener('mousedown', ()=>{mDown = true;});
document.addEventListener('mouseup', ()=>{mDown = false;});
reset.addEventListener('click', ()=>{
    resetCanv(); 
    buildCanv();
    appendCanv();
});