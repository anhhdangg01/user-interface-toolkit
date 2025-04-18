// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState} from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class CheckBox extends Widget{
    private _rect: Rect;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private _text: Text;
    private _callback: () => void;
    private _isChecked: boolean;
    private defaultWidth: number = 30;
    private defaultHeight: number = 30;
    private defaultText: string = "You are happy";
    private defaultFontSize: number = 18;
    private _defaultCheckState: boolean = false;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._isChecked = this._defaultCheckState;
        // set Aria role
        this.role = RoleType.none;
        // render widget
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 40);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._text = this._group.text(this._input);
        
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        this.registerEvent(eventrect);

        // Set the outer svg element 
        this.outerSvg = this._group;
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }

    set text(text: string) {
        this._input = text;
        this.update();
    }

    get isChecked(): boolean {
        return this._isChecked;
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void):void{
        this._callback = callback;
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void{
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

export {CheckBox}