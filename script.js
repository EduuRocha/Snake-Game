let board=document.getElementById('board')
let snake=document.querySelectorAll('.snake')
let row=5;
let column=5;
snake[0].style.gridRow=row;
snake[0].style.gridColumn=column;
let counter=document.getElementById('counterApple')
let counterMovements=document.getElementById('counterMovements')
let movements=[{
    row: snake[0].style.gridRow,
    column: snake[0].style.gridColumn
}];
let snakeBody=[]


class Movement{
    constructor(x,y){
        this.row= x;
        this.column= y
    }
}



let apple=document.getElementById('apple')
let a;
generateApple()
function generateApple(){
    a= randomApple()
    const [aRowCoordinate,aColumnCoordinate]=a
    apple.style.gridRow=aRowCoordinate
    apple.style.gridColumn=aColumnCoordinate
}
window.addEventListener('keydown',move)

function move(e){
    switch(e.key){
        case 'ArrowUp':
            if (row>1){
                row--;
                snake[0].style.gridRow=row
                } 
            break;

        case 'ArrowDown':
            if (row<9){
                row++;
                snake[0].style.gridRow=row
            }
            break;

        case 'ArrowLeft':
            if (column>1){
                column--;
                snake[0].style.gridColumn=column
            }
            break;

            case 'ArrowRight':
                if (column<9){
                    column++;
                    snake[0].style.gridColumn=column
                }
                break;
    }
    //I will probably have to change this counterMovements when i make the snake walk alone and the player only guide the path
    counterMovements.innerHTML++
    movements.push(new Movement(snake[0].style.gridRow,snake[0].style.gridColumn))
    //check if apple position and snake are the same, and generate a new apple if so
    //this is only in the master branch

    //and this is only on the tests branch
    eatApple([row,column],a)
    moveBody()

}

function randomApple(){
    let aRow=Math.ceil(Math.random()*10)
    let aColumn=Math.ceil(Math.random()*10);
    if (aRow==row || aRow>9){
       
      aRow= randomApple()[0]
    }
    if (aColumn==column || aColumn>9){
      
        aColumn= randomApple()[1]
    }
    return [aRow, aColumn]
}

function eatApple(x,y){
    if (x[0]===y[0] && x[1]===y[1]){
        generateApple()
        counter.innerHTML++
        grow()
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