// let confirmButton= document.getElementsByClassName("but");
// console.log(confirmButton);
// for(let i=0; i<confirmButton.length; i++){
//     confirmButton[i].addEventListener('click', function (){
//         let parent= this.parentNode.parentNode;
//         if (parent.contains("notBought")){
//             parent.classList.remove("notBought");
//             parent.classList.add("bought");
//         }
//         else{
//             parent.classList.remove("bought");
//             parent.classList.add("notBought");
//         }
//
//     })
// }
function changeClassForStatus(button){
    let parent= button.parentNode.parentNode;
    if(parent.classList.contains("notBought")){
        parent.classList.remove("notBought");
        parent.classList.add("bought");
    }else if(parent.classList.contains("bought")){
        parent.classList.remove("bought");
        parent.classList.add("notBought");
    }
}

    let grocery= document.getElementsByClassName("but");
    for(let i=0; i<grocery.length; i++){
        grocery[i].addEventListener("click",function (){
            changeClassForStatus(grocery[i]);
        });
    }

