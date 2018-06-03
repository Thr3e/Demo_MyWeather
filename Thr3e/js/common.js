

function getEL(sel) {
    return document.querySelector(sel);
}


function extend(Child, Parent) {
    var f = function () {};
    f.prototype = Parent.prototyoe;
    Child.prototype = new f();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}


//数组去重

Array.prototype.norepeatArr = function () {
    var json = {},
        arr = [];
    for (var i = 0; i < this.length; i++){
        if (!json[this[i]]){
            json[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
};