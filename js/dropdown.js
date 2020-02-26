window.addEventListener("DOMContentLoaded", (event) =>
{
    document.querySelectorAll(":scope select.osrui-dropdown-js").forEach((dropdownList) =>
    {
        let dropdownDiv = document.createElement("div");
        dropdownDiv.classList.add("osrui-dropdown");
        let mothersDiv = document.createElement("div");
        mothersDiv.classList.add("osrui-dropdown-div");

        divP = document.createElement("p");


        let optionUl = document.createElement("ul");
        optionUl.classList.add("osrui-dropdown");
        optionUl.classList.add("hidden");
        if(dropdownList.length > 5)
        {
            optionUl.classList.add("large");
        }
        for(i = 0; i < dropdownList.length; i++)
        {
            dropdownList.options[i].selected = false;
            let optionLi = document.createElement("li");
            optionLi.appendChild(document.createTextNode(dropdownList.options[i].text));
            optionLi.addEventListener("click", osruiDeselect.bind(optionLi), false);
            if(i == 0)
            {
                divP.textContent = dropdownList.options[i].text;
                dropdownList.options[i].selected = true;
                optionLi.classList.add("osrui-dropdown-selected");
            }
            optionUl.insertAdjacentElement("beforeend", optionLi);
        }
        dropdownDiv.insertAdjacentElement("beforeend", divP);
        dropdownDiv.addEventListener("click", osruiOpenDropdown.bind(dropdownDiv), false);
        mothersDiv.insertAdjacentElement("beforeend", dropdownDiv);
        mothersDiv.insertAdjacentElement("beforeend", optionUl);
        dropdownList.insertAdjacentElement("afterend", mothersDiv);
    })
});
function osruiOpenDropdown(event)
{
    event.stopPropagation();
    osruiCloseSelect(this);
    this.nextSibling.classList.toggle("hidden");
}

function osruiCloseSelect(elmnt)
{
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    let arrayDropdown = [];
    let dropdownDiv = document.querySelectorAll(":scope div.osrui-dropdown");
    dropdownUl = document.querySelectorAll(":scope ul.osrui-dropdown");
    for(i = 0; i < dropdownDiv.length; i++)
    {
        if(elmnt == dropdownDiv[i])
        {
            arrayDropdown.push(i)
        }
    }
    for(i = 0; i < dropdownUl.length; i++)
    {
        if(arrayDropdown.indexOf(i))
        {
            dropdownUl[i].classList.add("hidden");
        }
    }
}
function osruiDeselect(event)
{
    let deselect = this.parentNode.parentNode.getElementsByTagName("li");
    for(j = 0; j < deselect.length; j++)
    {
        deselect[j].classList.remove("osrui-dropdown-selected");
    }
    this.classList.add("osrui-dropdown-selected");
    divContainer = this.parentNode.previousElementSibling;
    divContainer.firstElementChild.textContent = this.textContent;
    deselect = divContainer.parentNode.previousElementSibling;
    for(j = 0; j < deselect.length; j++)
    {
        if(deselect.options[j].textContent == this.textContent)
        {
            deselect.options[j].selected = true;
        }
        else
        {
            deselect.options[j].checked = false;
        }
    }
}


/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", osruiCloseSelect);