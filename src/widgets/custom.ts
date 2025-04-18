// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState} from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Circle, Text, Box} from "../core/ui";

class Custom extends Widget {
    private _circle: Circle;
    private _circleSize: number;
    private _text: Text;
    private _text_y: number;
    private _input: string;
    private _emotion: string;
    private _fontSize: number;
    private _callback: (args: EventArgs) => void;
    private defaultCircleSize: number = 44;
    private defaultText: string = "o ╭╮ o";
    private defaultEmotion: string = "o ╭╮ o";
    private defaultFontSize: number = 10;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this._circleSize = this.defaultCircleSize;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._emotion = this.defaultEmotion;
        // set Aria role
        this.role = RoleType.custom;
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._circle.y() + ((+this._circle.height()/2)) - (box.height/2));
        this._text.x(+this._circle.x() + ((+this._circle.width()/2) - box.width/2));
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._circle = this._group.circle(this._circleSize);
        this._circle.fill("#FFA4A4");
        this._circle.move(150, 300)
        this._text = this._group.text(this._input);

        let eventCircle = this._group.circle(this._circleSize).opacity(0).attr('id', 0);
        eventCircle.move(150, 300)
        this.registerEvent(eventCircle);
        eventCircle.on('click', () => {
            this._changeEmotion();
        });
        // Set the outer svg element 
        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    _changeEmotion(): void {
        this._circleSize *= 1.12;
        this._fontSize *= 1.12;
        // make circle sad
        if (this._circleSize <= 94) {
            this.backcolor = "#FFA4A4";
            this._input = "o ╭╮ o";
            this._emotion = this._input;
        }
        // make circle neutral
        else if (this._circleSize <= 144) {
            this.backcolor = "#A4A4FF";
            this._input = "— ᴗ —";
            this._emotion = this._input;
        }
        // make circle happy
        else if (this._circleSize <= 194) {
            this.backcolor = "#A4FFA4";
            this._input = "˶ᵔ ᵕ ᵔ˶";
            this._emotion = this._input;
        }
        // make circle evil
        else if (this._circleSize <= 294) {
            this.backcolor = "#FFA4FF";
            this._input = " •̀  ᴗ  •́ ";
            this._emotion = this._input;
        }
        else {
            this.backcolor = "black";
            this._input = " •  ᴗ  • ";
            this._text.fill("#FF0000");
            this._emotion = this._input;
        }
        this.update();
        this.raise(new EventArgs(this));
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();
        
        if(this._circle != null)
            this._circle.size(this._circleSize);
            this._circle.fill(this.backcolor);

        super.update();
    }

    onClick(callback: (args: EventArgs) => void): void{
        this._callback = callback;
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._input = this._emotion;
        this.update();
    }
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
        if (this._callback) {
            this._callback(new EventArgs(this));
        }
    }
    hoverState(): void {
        this._input = "o _ o";
        this.update();
    }
    hoverPressedState(): void {
        this._input = "o _ o";
        this.update();
    }
    pressedoutState(): void {
        this._input = this._emotion;
        this.update();
    }
    moveState(): void {}
    keyupState(): void {}
}

export {Custom}