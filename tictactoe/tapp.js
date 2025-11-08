let boxes=document.querySelectorAll(".box");                         //accesing 
let resetbtn=document.querySelector("#reset");                      //accesing 
let ngb=document.querySelector("#newga");
let mcont= document.querySelector(".msg-cont"); 
let msg=document.querySelector("#msg");
let body=document.querySelector("body");

let turnO=true;//playerX,playerO

const winpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

boxes.forEach((box)=>{                                      //for loop for each box in boxes
    box.addEventListener("click",()=>{                      //adding eventlisterner to each box
    console.log("Button has been clicked",turnO);
    if(turnO===true){                                       //playerO turn
        box.innerText="O";
        turnO=false;
    }
    else{                                                    //playerX turn
    box.innerText="X";
    turnO=true; 
    }
    box.disabled=true;
        checkwinner();
});
});

const showwinner=(winner)=>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    mcont.classList.remove("hide");
    
}

const dis=()=>{                     //disable the entry to boxes after the winner is found
    for(let box of boxes){
        box.disabled=true;
    }
}

const ena=()=>{                     //enable the entry to boxes for the new game or reset
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resett=()=>{
    turnO=true;
    ena();
    mcont.classList.add("hide");
}

const checkwinner=()=>{
    for(let elements of winpattern){
        // console.log(elements[0],elements[1],elements[2]);
        // console.log(boxes[elements[0]].innerText,boxes[elements[1]].innerText,boxes[elements[2]].innerText);
        
        let post1=boxes[elements[0]].innerText;
        let post2=boxes[elements[1]].innerText;
        let post3=boxes[elements[2]].innerText;
        if(post1!=""&&post2!=""&&post3!=""){
            if(post1===post2&&post2===post3){
                console.log("Winner",post1);
                dis();
                showwinner(post1);
            }
        }
    }
}

ngb.addEventListener("click",resett);
resetbtn.addEventListener("click",resett);