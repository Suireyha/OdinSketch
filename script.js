const cont = document.querySelector('.cont');
const rainbow = document.querySelector('.cycle');
const sizeCounter = document.querySelector('.size');
const picker = document.querySelector('.picker');
const reset = document.querySelector('.reset');
const slider = document.querySelector('.slider');
const eraBtn = document.querySelector('.eraser');

let colCount = 0;
let colIteration = 0;
let erasing = false;
let canvSide = slider.value;
let pixelSize = 510 / canvSide;
let count = 0;
let column = [];
let mDown;
let RGB = [245, 45, 45];
let cycling = false;
let red = 204;
let blue = 80;
let green = 80;

function paint(cell, overwrite){
    if ((mDown || overwrite) && erasing){
        cell.style.backgroundColor  = 'white';
    }
    else if ((mDown || overwrite) && cycling){
        cell.style.backgroundColor = 
        "rgb(" + (+RGB[0]) + "," + (+RGB[1]) + "," + (+RGB[2]) +")";
        colIteration++;

        switch (colCount){

            case 0:
                RGB[1] += 40;
                break;
            case 1:
                RGB[0] -= 40;
                break;
            case 2:
                RGB[2] += 40;
                break;
            case 3:
                RGB[1] -= 40;
                break;
            case 4:
                RGB[0] += 40;
                break;
            case 5:
                RGB[2] -= 40;
                colCount = 0;
                RGB = [245, 45, 45];
                break;
            default:
                console.log("ERROR: colCount = " + colCount);
        }

        if (colIteration % 5 == 0){
            colCount++;
            console.log("R= " + (+RGB[0]) + ", G= " + (+RGB[1]) + ", B= " + (+RGB[0]));
        }

        //Either red, blue or green will increase/decrease based on colCount, use switch statement
        //Add/Subtract 200 at a time in increments of 40 - meaning 5 pixels for color change (Maybe change on canv size?)
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

rainbow.addEventListener('click', ()=>{
    
    if(cycling == false){
        cycling = true;
        rainbow.setAttribute('style', 'border-color: lime; color: lime; box-shadow: 0 0 15px lime;');
    }
    else{
        cycling = false;
        rainbow.setAttribute('style', 'border-color: white; color: white; box-shadow: none;');
    }
    console.log(cycling);
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

eraBtn.addEventListener('mouseover', ()=>{
    eraBtn.setAttribute('style', 'cursor: grabbing; color: lightgray; border-color: lightgray; box-shadow: 0 0 15px lightgray;');
})

rainbow.addEventListener('mouseover', ()=>{
    rainbow.setAttribute('style', 'cursor: grabbing; color: lightgray; border-color: lightgray; box-shadow: 0 0 15px lightgray;');
})

rainbow.addEventListener('mouseleave', ()=>{
    if (cycling){
        rainbow.setAttribute('style', 'border-color: lime; color: lime; box-shadow: 0 0 15px lime;');
    }
    else{
        rainbow.setAttribute('style', 'border-color: white; color: white; box-shadow: none;');
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