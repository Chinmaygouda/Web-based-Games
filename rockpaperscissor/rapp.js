let userScore=0;
let compScore=0;
const msgc=document.querySelector("#umsg");
const cscoreup=document.querySelector("#compscore");
const uscoreup=document.querySelector("#userscore");
const choices=document.querySelectorAll(".choice");


const gencompchoice=()=>{
    const option=["rock","paper","scissor"];
//    console.log(Math.floor(Math.random()*3));//generates random number 
    const rand=Math.floor(Math.random()*3);
    return option[rand];
}


const gamedraw=()=>{
    console.log("Games a draw");
    msgc.innerText="Draw!!!";
    msgc.style.backgroundColor="#081b31";
}



const showwinner=(userwin,userchoice,compchoice)=>{
    if(userwin){
        userScore++;
        uscoreup.innerText=userScore; 
        console.log("You Won!!!!!");
        msgc.innerText=`You Won!!!!! ${userchoice} beats ${compchoice}`;
        msgc.style.backgroundColor="green";
        
    }
    else{
        console.log("You lost!!!!!");
        msgc.innerText=`You lost!!!!! ${compchoice} beats ${userchoice}`;
        msgc.style.backgroundColor="red";
        compScore++;
        cscoreup.innerText=compScore;
    }

}






const playgame=(userchoice)=>{
    console.log("user choice=",userchoice);
    //Generate computer choice
   const compchoice= gencompchoice();
   console.log("computer choice=",compchoice);

   if(userchoice===compchoice){                     //both the choices are same then its a draw
       gamedraw();                                     
       }
   else{                                            //else the game is not draw
        let userwin=true;
        if(userchoice==="rock"){                    //comp choice may be paper or scissor
            userwin=compchoice==="paper"?false:true;    //paper,scissor    //if comp choice is paper then userwin becomes false,if its scissor then userwin becomes true
        }
        else if(userchoice==="paper"){                       //comp choice may be rock or scissor
            userwin=compchoice==="scissor"?false:true;   //scissor,rock               //if comp choice is scissor then userwin becomes false,if its rock then userwin becomes true
        }
        else{
            userwin=compchoice==="rock"?false:true;      //rock,paper           //if comp choice is rock then userwin becomes false,if its paper then userwin becomes true
        }
        showwinner(userwin,userchoice,compchoice);
   }

  

}


choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id");
        // console.log(choice);
        playgame(userchoice);
    })
})