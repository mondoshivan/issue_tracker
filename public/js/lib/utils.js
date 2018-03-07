class Utils {
    
    static arrayContains(array, item) {
        return (array.indexOf(item) > -1);
    }
    
    static removeAllChilds(element) {
        while (element.firstChild) { element.removeChild(element.firstChild); }
    }
    
    static addDropDownContent(element, values) {
        Utils.removeAllChilds(element);
        for (let i=0; i<values.length; i++) {
            let node = document.createElement("p");
            let textNode = document.createTextNode(Utils.capitalize(values[i]));
            node.appendChild(textNode);
            element.appendChild(node);
        }
    }

    static addDropDownSelection(element, value) {
        element.innerHTML = Utils.capitalize(value);
    }

    static getDropDownSelection(parent) {
        return Utils.getChildsWithClassName(parent, "dropdown-selection")[0].innerHTML;
    }

    // id: of the dropdown container -> String
    // values: of the dropdown menu -> [String, String, ...]
    // selected: in the dropdown -> String
    static dropDownPrepare(id, values, selected) {
        let content = Utils.getChildsWithClassName(document.getElementById(id), "dropdown-content")[0];
        let selection = Utils.getChildsWithClassName(document.getElementById(id), "dropdown-selection")[0];
        Utils.addDropDownContent(content, values);
        Utils.addDropDownSelection(selection, selected);

        for (let i=0; i<content.childNodes.length; i++) {
            content.childNodes[i].setAttribute("onclick", "Utils.dropDownSelect(this, '"+id+"');");
        }
    }

    // id: of the dropdown container -> String
    // selected: value which is visible -> String
    // options: of the dropdown list -> ['value', 'value2', ...]
    static createDropDownMenu(selected, options, eventListener) {
        let container = document.createElement("div");
        container.setAttribute("class", "dropdown");

        let selection = document.createElement("span");
        selection.setAttribute("class", "dropdown-selection");
        selection.appendChild(document.createTextNode(selected));
        container.appendChild(selection);

        let content = document.createElement("div");
        content.setAttribute("class", "dropdown-content");
        Utils.addDropDownContent(content, options);
        eventListener(content);
        container.appendChild(content);

        return container;
    }

    // clickedElement: the clicked element
    // id: of the dropdown-selection element
    static dropDownSelect(clickedElement, id) {
        let selection = Utils.getChildsWithClassName(document.getElementById(id), "dropdown-selection")[0];
        selection.innerHTML = clickedElement.innerHTML;
    }

    static getChildsWithClassName(parent, className) {
        let notes = [];
        for (let i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].className === className) {
                notes.push(parent.childNodes[i]);
            }
        }
        return notes;
    }

    static existsInDataset(elements, value) {
        for (let i=0; i<elements.length; i++) {
            if (elements[i].value === value) {
                return true;
            }
        }
        return false;
    }
    
    static removeSelected(elements) {
        for (let i=0; i<elements.length; i++) {
            elements[i].classList.remove("selected");
        }
    }
    
    static getUrlParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    static getProjectAndIssueId(project, id) {
        return project + "-" + id;
    }

    static getProjectFromProjectId(projectId) {
        return projectId.split("-")[0];
    }

    static getIdFromProjectId(projectId) {
        return parseInt(projectId.split("-")[1]);
    }
    
    static selectRadioButton(radioButtons, selected) {
        for (let i=0; i<radioButtons.length; i++) {
            if (radioButtons[i] === selected) {
                radioButtons[i].classList.add("selected");
            } else {
                radioButtons[i].classList.remove("selected");
            }
        }
    }

    static createFloatingKeyValuePair(key, value) {
        let container = document.createElement("div");
        container.setAttribute("class", "key-value-container");
        let keyElement = document.createElement("span");
        keyElement.setAttribute("class", "keys-float");
        keyElement.appendChild(document.createTextNode(key));
        let valueElement = document.createElement("span");
        valueElement.setAttribute("class", "value-width");
        valueElement.appendChild(document.createTextNode(value));
        container.appendChild(keyElement);
        container.appendChild(valueElement);
        return container;
    }

    static capitalize(string) {
        return string.replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }

    static twoDigits(number) {
        return ("0" + number).slice(-2);
    }

    static urlParams(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
}