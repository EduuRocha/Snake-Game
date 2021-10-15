let gameOverControl;
let playAgain=document.getElementById('playAgain')
let scores=document.getElementById('score');
let winOrlose= document.getElementById('winOrlose');
let board=document.getElementById('board')
let snake=document.querySelectorAll('.snake')

snake[0].style.gridRow=5;
snake[0].style.gridColumn=5;
let counter=document.getElementById('counterApple')
let counterMovements=document.getElementById('counterMovements')
let movements=[{
    row: 5,
    column:5
}];
let snakeBody=[]


class Movement{
    constructor(x,y){
        this.row= x;
        this.column= y
    }
}



let apple=document.getElementById('apple')
let randomAppleValue;
generateApple()
function generateApple(){
    randomAppleValue= randomApple()
    const [aRowCoordinate,aColumnCoordinate]=randomAppleValue
    apple.style.gridRow=aRowCoordinate
    apple.style.gridColumn=aColumnCoordinate
}


function randomApple(){
    let aRow=Math.ceil(Math.random()*10)
    let aColumn=Math.ceil(Math.random()*10);
    if (aRow==snake[0].style.gridRow || aRow>9){
       
      aRow= randomApple()[0]
    }
    if (aColumn==snake[0].style.gridColumn || aColumn>9){
      
        aColumn= randomApple()[1]
    }

    for(let i =0; i<snakeBody.length;i++){
        if (aRow== snakeBody[i].style.gridRow && aColumn==snakeBody[i].style.gridColumn){
            [aRow,aColumn]=randomApple()
        }
    }
    return [aRow, aColumn]
}

function eatApple(x,y){
    if (x[0]==y[0] && x[1]==y[1]){
        generateApple()
        counter.innerHTML--
        grow()
    }
    if (counter.innerHTML==0){
        return gameOver('WIN')
    }   
}


//Now all I need to do is find a way to make this follow the master 
function grow(){
    let el=document.createElement('div')
    el.className='snake'
    el.style.gridRow=movements[counterMovements.innerHTML-1].row;
    el.style.gridColumn=movements[counterMovements.innerHTML-1].column;
    board.appendChild(el);
    snakeBody.push(el);
}



function moveBody(){
    for (let i=0; i<snakeBody.length;i++){
        snakeBody[i].style.gridColumn=movements[counterMovements.innerHTML-(i+1)].column
        snakeBody[i].style.gridRow=movements[counterMovements.innerHTML-(i+1)].row
    }
}


setInterval(walk,400);


let switchControl;
window.addEventListener('keydown',(e)=>{
    switchControl=e.key
})
function walk(){
    if (gameOverControl){
        return 
    }
   switch(switchControl){
       case 'ArrowUp':
           if( snake[0].style.gridRow>1){
            snake[0].style.gridRow--
           }
           else{
               return gameOver('You Lose')
           }
           break;

        
        case 'ArrowDown':
            if (snake[0].style.gridRow<9){
                snake[0].style.gridRow++
            }
            else{
                return gameOver('You Lose')
            }
            break;
        
        case 'ArrowLeft':
            if (snake[0].style.gridColumn>1){
                snake[0].style.gridColumn--
            }
            else{
                return gameOver('You Lose')
            }
            break;

        case 'ArrowRight':
            if (snake[0].style.gridColumn<9){
                snake[0].style.gridColumn++
            }
            else{
                return gameOver('You Lose')
            }
            break

        case undefined:
            if (snake[0].style.gridColumn>1){
                snake[0].style.gridColumn--
            }
            else{
                return gameOver('You Lose')
            }
            break;
   }
      die()
   counterMovements.innerHTML++
   movements.push(new Movement(snake[0].style.gridRow,snake[0].style.gridColumn))
   if (counterMovements.innerHTML=='180'){
       return gameOver('You Lose')
   }
   eatApple([snake[0].style.gridRow,snake[0].style.gridColumn],randomAppleValue)
   moveBody()
}

function gameOver(x){        
    let finalDiv= document.getElementById('finalDiv')
    finalDiv.style.cssText='height:400px; width:700px;'
    finalDiv.style.margin='0'
    winOrlose.innerHTML=x
    scores.style.display='block';
    scores.children[0].innerHTML=`${20 - counter.innerHTML} Apple(s)`
    scores.children[1].innerHTML=`${counterMovements.innerHTML} Movements`
    winOrlose.style.display='flex';
    playAgain.style.display='flex';
    window.clearInterval();
    gameOverControl=true
}

playAgain.addEventListener('click',repeatGame)

function repeatGame(){
    snake[0].style.gridRow=5;
    snake[0].style.gridColumn=5;        
    counter.innerHTML='20';
    counterMovements.innerHTML='0';
    for (let i=0; i<snakeBody.length;i++){
    board.removeChild(snakeBody[i])
    }
    snakeBody=[];
    finalDiv.style.cssText='height:0px; width:0px; margin-left:350px; margin-right:350px; margin-top:200px; margin-bottom:200px;'
    scores.style.display='none';;
    winOrlose.style.display='none';
    playAgain.style.display='none';
    movements=[{
        row: 5,
        column:5
    }];
    switchControl=undefined;
    gameOverControl=false;
    generateApple()

}

function die(){
    for (let i=0; i<snakeBody.length;i++){
        if (snake[0].style.gridColumn== snakeBody[i].style.gridColumn && snake[0].style.gridRow==snakeBody[i].style.gridRow){
            return gameOver('You Lose')
        }
    }
}