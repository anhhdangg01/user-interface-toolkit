import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { RadioButton } from "./widgets/radiobutton";


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Click this button";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

//button
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

//radio button
let lbl3 = new Heading(w);
lbl3.text = "Click one of these radio buttons";
lbl3.tabindex = 1;
lbl3.fontSize = 16;
lbl3.move(10, 20);
let radioSelectAction = function () {
    console.log("The universe speaks");
};

let rdo = new RadioButton(w);