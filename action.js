
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

let grocery = document.getElementsByClassName("but");
for (let i = 0; i < grocery.length; i++) {
    grocery[i].addEventListener("click", function () {
        changeClassForStatus(this); // Використовуйте "this", а не "grocery[i]"
    });
}
let removeButtons=document.getElementsByClassName("removeItem");
for(let i=0; i<removeButtons.length; i++){
    removeButtons[i].addEventListener("click",function (){
        this.closest(".item").remove();
    })
}

function editName(element) {
    if(isNotBought(element)){
    let allNames = document.getElementsByClassName("name");
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

