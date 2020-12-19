const HelperPicker = {};

HelperPicker.addActive = function (item) {
    item.classList.add('active');
};

HelperPicker.removeActive = function (item) {
    item.classList.remove('active');
};

HelperPicker.removeAllActive = function (items) {
    let _this = this;
    for (let i = 0; i < items.length; i++) {
        _this.removeActive(items[i])
    }
}
HelperPicker.setInitMousedown = function (elm, i) {
    let _this = this;
    let items = elm.children;
    let lengthList = items.length - 1;
    if (i > lengthList) i = lengthList;
    if (i < 0) i = 0;
    

    _this.removeAllActive(items);
    _this.addActive(items[i]);
}

HelperPicker.setInitActive = function (elm, s, e) {
    let _this = this;
    let items = elm.children;
    let position = _this.findFirstPosition(items, s, e);
    console.log(position)
    for (let i = 0; i < items.length; i++) {
        if (position[0] <= i && i <= position[1]) {
            _this.addActive(items[i])
        } else {
            _this.removeActive(items[i])
        }
    }
    return false;
}

HelperPicker.findFirstPosition = function (items, s, e) {
    let _this = this;
    let arrayPosition = [];
    for (let i = 0; i < items.length; i++) {
        if (parseInt(items[i].getAttribute('data-month')) === _this.getQuarter(items.length, s)) {
            arrayPosition.push(i);
            console.log(i)
        }
        if (parseInt(items[i].getAttribute('data-month')) === _this.getQuarter(items.length, e)) {
            arrayPosition.push(i);
            console.log(i)
        }
    }
console.log('findFirstPosition', arrayPosition)
    return arrayPosition.sort();
}

HelperPicker.getQuarter = function(length, month) {
    return (length > 4) ? month : Math.ceil(month / 3);
}
HelperPicker.setActiveWhenMousemove = function (elm, i, j) {
    let _this = this;
    let items = elm.children
    let lengthList = items.length - 1;
    if(i > lengthList) i = lengthList;
    if(i < 0) i = 0;
    if(j < 0) j = 0;
    if(j > lengthList) j = lengthList;
    let _start, _end;
    if (i > j) {
        _start = j;
        _end = i;
    } else {
        _start = i;
        _end = j;
    }
    for (let k = 0; k < items.length; k++) {
        if(_start <= k && k <= _end) {
            _this.addActive(items[k]);
        } else {
            _this.removeActive(items[k]);
        }
    }
}
HelperPicker.specifyStartMonthOfQuarter = function(month) {
    switch(parseInt(month)) {
        case 1:
            return 1;
        case 2:
            return 4;
        case 3:
            return 7;
        case 4:
            return 10;
    }
}
HelperPicker.specifyEndMonthOfQuarter = function(month) {
    switch(parseInt(month)) {
        case 1:
            return 3;
        case 2:
            return 6;
        case 3:
            return 9;
        case 4:
            return 12;
    }
}

export default HelperPicker;