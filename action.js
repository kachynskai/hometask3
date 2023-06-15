
let allNames = document.getElementsByClassName("name");
let grocery = document.getElementsByClassName("but");
let removeButtons=document.getElementsByClassName("removeItem");
//додати атрибут для зміни імені при запуску програми
function editable() {
    let allNames = document.getElementsByClassName("name");
    for (let i = 0; i < allNames.length; i++) {
        let parent = allNames[i].parentNode;
        if (parent.classList.contains("notBought")) {
            allNames[i].setAttribute("onclick", "editName(this)");
        }
    }
}

editable();
//зміна атрибуту=> зовнішнього вигляду при натисканні кнопки купити
function changeClassForStatus(button) {
    let parent = button.parentNode.parentNode;
    let nameItem = parent.querySelector(".name");
    if (parent.classList.contains("notBought")) {
        parent.classList.remove("notBought");
        parent.classList.add("bought");
        nameItem.removeAttribute("onclick");
    } else if (parent.classList.contains("bought")) {
        parent.classList.remove("bought");
        parent.classList.add("notBought");
        nameItem.setAttribute("onclick", "editName(this)");
    }
}

//додавання лісенера для кнопок покупки для дефолтного списку
for (let i = 0; i < grocery.length; i++) {
    grocery[i].addEventListener("click", function () {
        changeClassForStatus(this);
    });
}

//функція для видалення елемента і hr над ним якщо такий існує
function removeItem(item) {
    const itemContainer = item.closest(".item");
    const hrElement = itemContainer.previousElementSibling; // Отримати попередній елемент

    itemContainer.remove();
    if (hrElement && hrElement.tagName === "HR") {
        hrElement.remove();
    }
    console.log(allNames);
}
//додавання лісенера для кнопок видалення для дефолтного списку
for(let i=0; i<removeButtons.length; i++){
    removeButtons[i].addEventListener("click",function (){
        removeItem(this);
    })
}

function editName(element) {
    if(isNotBought(element)){

    const input = document.createElement("input");
    const currentName = element.innerText;
    input.type = "text";
    input.value = currentName;
    input.maxLength = 16;
    input.style.font = window.getComputedStyle(element).getPropertyValue("font");
    element.parentNode.replaceChild(input, element);
    input.focus();

    input.addEventListener("blur", function () {
        const newName = input.value.trim();
        const parent = input.parentNode;

        if (isUnique(newName, allNames) && newName !== "") {
            let section = document.createElement("section");
            section.className = "name";
            section.innerText = newName;

            section.addEventListener("click", function () {
                editName(section);
            });

            parent.replaceChild(section, input);
        } else {
            let section = document.createElement("section");
            section.className = "name";
            section.innerText = currentName;

            section.addEventListener("click", function () {
                editName(section);
            });

            parent.replaceChild(section, input);
        }
    });
}
}
const addButton=document.querySelector(".butAdd");
function makeItem(itemName) {
    const newItem = document.createElement("section");
    newItem.className = "item notBought";

    const nameSection = document.createElement("section");
    nameSection.className = "name";
    nameSection.innerText = itemName;

    const numSection = document.createElement("section");
    numSection.className = "num";
    const minusSpan=document.createElement("span");
    minusSpan.className="remove circle tooltip";
    minusSpan.setAttribute("data-tooltip","minus");
    minusSpan.innerText="-";
    numSection.appendChild(minusSpan);
    const numberSpan = document.createElement("span");
    numberSpan.className = "number";
    numberSpan.innerText = "1";
    numSection.appendChild(numberSpan);
    const plusSpan=document.createElement("span");
    plusSpan.className="add circle tooltip";
    plusSpan.setAttribute("data-tooltip","plus");
    plusSpan.innerText="+";
    numSection.appendChild(plusSpan);

    const statusSection = document.createElement("section");
    statusSection.className = "status";
    const button1 = document.createElement("button");
    button1.className = "but tooltip";
    button1.addEventListener("click",function (){
        changeClassForStatus(this);
    })
    const button2 = document.createElement("button");
    button2.className = "removeItem tooltip";
    button2.setAttribute("data-tooltip", "delete item");
    button2.innerText = "x";
    button2.addEventListener("click", function (){
        removeItem(this);
    })
    statusSection.appendChild(button1);
    statusSection.appendChild(button2);

    newItem.appendChild(nameSection);
    newItem.appendChild(numSection);
    newItem.appendChild(statusSection);

    const hr = document.createElement("hr");

    const firstSection = document.querySelector(".first");

    firstSection.appendChild(hr);
    firstSection.appendChild(newItem);
    editable();
}


function addItem(){
    const itemInput=document.querySelector(".inpName");
    const itemName=itemInput.value;
    if(itemName){
        if(isUnique(itemName,allNames)&&itemName!==""){
            makeItem(itemName);
        }else{
            let message="Продукт з такою назвою вже існує! Будь ласка, придумайте щось нове!!"
            alert(message);
        }
        itemInput.value="";
    }
    itemInput.focus();
    console.log(document.getElementsByClassName("item"));
}
addButton.addEventListener("click",addItem);
document.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        addItem();
    }
})
function isNotBought(element){
    let parent= element.parentNode;
    return parent&&parent.classList.contains("notBought");

}

function isUnique(name, names) {
    for (let i = 0; i < names.length; i++) {
        if (name.toLowerCase() === names[i].innerText.toLowerCase()) {
            return false;
        }
    }
    return true;
}

