window.addEventListener("DOMContentLoaded", (event) =>
{
    document.querySelectorAll(":scope select.osrui-list-js").forEach((optionList) =>
    {
        let optionUl = document.createElement("ul");
        optionUl.classList.add("osrui-list");
        if(optionList.length > 5)
        {
            optionUl.classList.add("large");
        }
        for(i = 0; i < optionList.length; i++)
        {
            optionList.options[i].selected = false;
            let optionLi = document.createElement("li");
            optionLi.appendChild(document.createTextNode(optionList.options[i].text));
            optionLi.addEventListener("click", listDeselect.bind(optionLi), false);
            optionUl.insertAdjacentElement("beforeend", optionLi);
        }
        optionList.insertAdjacentElement("afterend", optionUl);
    })
});
function listDeselect(event)
{
    let deselect = this.parentNode.getElementsByTagName("li");
    for(j = 0; j < deselect.length; j++)
    {
        deselect[j].classList.remove("osrui-list-selected");
    }
    this.classList.add("osrui-list-selected");
    deselect = this.parentNode.previousElementSibling;
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