/*!
 * AmberJS JavaScript Library v0.1
 * https://github.com/denx-b/amberDrag
 *
 * Date: 2017-04-03
 */
var amberDrag = {};

amberDrag.options = {
    zIndex: 1000,
    shiftX: 0,
    shiftY: 0,
    coords: {
        top:    0,
        left:   0
    }
};

/**
 * Init plugin
 * @param dragObject
 * @param params
 */
amberDrag.init = function (dragObject, params) {
    try {
        if (!this.isElement(dragObject)) {
            throw new Error("Failed to execute amberDrag.init: first argument is not of type 'Node'");
        }
    }
    catch(e) {
        throw e;
    }

    this.dragObject = dragObject;
    this.dragObject.onmousedown = this.onmousedown;
    this.dragObject.ondragstart = function () {
        return false;
    };

    this.options = Object.assign(this.options, params);
}

/**
 * Клик и перемещение элемента
 * @param e
 */
amberDrag.onmousedown = function (e) {
    amberDrag.getCoords(e);

    amberDrag.dragObject.style.zIndex    = amberDrag.options.zIndex;
    amberDrag.dragObject.style.position  = "absolute";

    amberDrag.moveAt(e);

    document.body.appendChild(amberDrag.dragObject);
    document.onmousemove = function (e) {
        amberDrag.moveAt(e);
    }
    amberDrag.dragObject.onmouseup = function() {
        document.onmousemove = null;
        amberDrag.dragObject.onmouseup = null;
    };
}

/**
 * Смена координат элемента
 * @param e
 */
amberDrag.moveAt = function (e) {
    this.dragObject.style.left = e.pageX - this.options.shiftX  + "px";
    this.dragObject.style.top = e.pageY - this.options.shiftY + "px";
}

/**
 * Определение и инициализация координат
 * @param e
 */
amberDrag.getCoords = function (e) {
    var box         = this.dragObject.getBoundingClientRect(),
        body        = document.body,
        docEl       = document.documentElement;

    var scrollTop   = window.pageYOffset || docEl.scrollTop || body.scrollTop,
        scrollLeft  = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop   = docEl.clientTop || body.clientTop || 0,
        clientLeft  = docEl.clientLeft || body.clientLeft || 0;

    var top         = box.top + scrollTop - clientTop,
        left        = box.left + scrollLeft - clientLeft;

    this.options.shiftX         = e.pageX - left;
    this.options.shiftY         = e.pageY - top;
}

/**
 * Проверка элемента
 * @param obj
 * @returns {boolean}
 */
amberDrag.isElement = function(obj) {
    try {
        return obj instanceof HTMLElement;
    }
    catch(e){
        return (typeof obj==="object") &&
            (obj.nodeType===1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument ==="object");
    }
}