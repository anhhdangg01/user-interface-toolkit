import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {CheckBox} from "./widgets/checkbox";
import {Heading} from "./widgets/heading"
import {RadioButton} from "./widgets/radiobutton";
import {Custom} from "./widgets/custom";
import {ProgressBar} from "./widgets/progressbar";
import {ScrollBar} from "./widgets/scrollbar";


let w = new Window(window.innerHeight-10,'100%');

//button
let lbl1= new Heading(w);
lbl1.text = "Click this button";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14;
btn.move(12, 50);
btn.backcolor = "#FFA4A4";
let clickAction = function() {
    lbl1.text = "Congrats, you clicked the button!";
    console.log(":D");
};
btn.onClick(clickAction);

//checkbox
let lbl2 = new Heading(w);
lbl2.text = "Click this check box";
lbl2.tabindex = 1;
lbl2.fontSize = 16;
lbl2.move(10,100);

let checkbox = new CheckBox(w);
checkbox.tabindex = 2;
checkbox.fontSize = 14;
checkbox.move(12, 130);
checkbox.backcolor = "#FFFFFF";
let checkboxAction = function () {
    console.log("Check box state has changed");
    // check the box if unchecked
    if (checkbox.isChecked == false) {
        this.backcolor = "#8BE8A4";
        this._isChecked = true;
    }
    // otherwise, uncheck the box
    else {
        this.backcolor = "#FFFFFF";
        this._isChecked = false;
    }
};
checkbox.onClick(checkboxAction);


//radio button
let lbl3 = new Heading(w);
lbl3.text = "Click one of these radio buttons";
lbl3.tabindex = 1;
lbl3.fontSize = 16;
lbl3.move(10, 180);

let radio = new RadioButton(w);
radio.tabindex = 2;
radio.move(10, 210);
radio.onClick((args, index) => {
    console.log("Radio button that was clicked and changed state to: ");
});

//scroll bar
let lbl4 = new Heading(w);
lbl4.text = "Scroll on this scroll bar";
lbl4.tabindex = 1;
lbl4.fontSize = 16;
lbl4.move(10, 280);

let scrollbar = new ScrollBar(w);
scrollbar.tabindex = 2;
scrollbar.setHeight = 200;
scrollbar.move(100, 310);
scrollbar.onScroll((args) => {
    console.log("Thumb moved");
});

//progress bar
let lbl5 = new Heading(w);
lbl5.text = "Click the progress bar to progress it";
lbl5.tabindex = 1;
lbl5.fontSize = 16;
lbl5.move(10, 520);

let progressbar = new ProgressBar(w);
progressbar.tabindex = 2;
progressbar.move(10, 550);
progressbar.onClick((args) => {
    console.log("Widget state changed");
})

//custom
let lbl6 = new Heading(w);
lbl6.text = "Foster this circle and make it happy :)";
lbl6.tabindex = 1;
lbl6.fontSize = 16;
lbl6.move(10, 610);

let custom = new Custom(w);
custom.tabindex = 2;
custom.move(10, 440);
custom.onClick((args) => {
    console.log("Circle grew");
})