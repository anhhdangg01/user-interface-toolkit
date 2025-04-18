import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {CheckBox} from "./widgets/checkbox";
import {Heading} from "./widgets/heading"
import {RadioButton} from "./widgets/radiobutton";
import {Custom} from "./widgets/custom";


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
    console.log("box checked");
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
    console.log("Radio button that was clicked: ");
});

//custom
let lbl5 = new Heading(w);
lbl5.text = "Foster this circle and make it happy :)";
lbl5.tabindex = 1;
lbl5.fontSize = 16;
lbl5.move(10, 280);

let custom = new Custom(w);
custom.tabindex = 2;
custom.move(10, 310);
custom.onClick((args) => {
    console.log("circle grew");
})