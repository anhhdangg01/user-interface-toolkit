// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState} from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Circle, Text} from "../core/ui";

class RadioButton extends Widget{
    private _choices: Circle[];
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private _isChecked: boolean;
    private _callback: () => void;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private defaultFontSize: number = 18;
    private defaultText: string = "Radio Button";
    private defaultCheckState = false;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._isChecked = this.defaultCheckState;

        // set Aria role
        this.role = RoleType.radiobutton;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    onClick(callback: () => void):void{
        this._callback = callback;
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
        if (this._callback) {
            this._callback();
        }
    }
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export {RadioButton}