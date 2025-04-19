// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState} from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect} from "../core/ui";

class ProgressBar extends Widget{
    private _rect: Rect;
    private _callback: (args: EventArgs) => void;
    private _incrementValue: number;
    private _minValue: number = 0;
    private _maxValue: number = 100;
    private _border: Rect;
    private _currentValue: number = 0;
    private defaultWidth: number = 0;
    private defaultHeight: number = 30;
    private defaultIncrementValue: number = 10;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._incrementValue = this.defaultIncrementValue;
        // set Aria role
        this.role = RoleType.progressbar;
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();

        this._border = this._group.rect(this._maxValue + 1, this.height + 1);
        this._border.stroke("black");
        this._border.fill("#FFFFFF");
        this._rect = this._group.rect(this.width, this.height);
        this._rect.fill("#A4FFA4");

        let eventrect = this._group.rect(this._maxValue, this.height).opacity(0).attr('id', 0);
        this.registerEvent(eventrect);
        eventrect.on('click', () => {
            this._increment();
        });
        // Set the outer svg element 
        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    override update(): void {
        if(this._rect != null)
            this._rect.size(this._currentValue, this.height);
            this._rect.fill(this.backcolor);

        super.update();
    }

    set setWidth(width: number) {
        this.width = width;
        this._maxValue = width;
    }

    set setIncrement(value: number) {
        this._incrementValue = value;
    }

    get barWidth(): number {
        return this.width;
    }

    _increment(): void {
        if (this._currentValue == this._maxValue) {
            return;
        }
        console.log("Progress bar incremented");
        this._currentValue += this._incrementValue;
        if (this._currentValue < this._minValue) {
            this._currentValue = this._minValue;
        }
        else if (this._currentValue >= this._maxValue) {
            this._currentValue = this._maxValue;
            this._rect.fill("#A4A4FF");
        }
        this.update();
        this.raise(new EventArgs(this));
    }

    onClick(callback: (args: EventArgs) => void): void{
        this._callback = callback;
    }

    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
        if (this._callback) {
            this._callback(new EventArgs(this));
        }
    }
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export {ProgressBar}