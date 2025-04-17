import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"


let w = new Window(window.innerHeight-10,'100%');

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

let lbl2 = new Heading(w);
lbl2.text = "Click this check box";
lbl2.tabindex = 1;
lbl2.fontSize = 16;
lbl2.move(10,20);