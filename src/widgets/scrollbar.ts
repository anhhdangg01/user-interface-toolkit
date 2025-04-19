// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect} from "../core/ui";

class ScrollBar extends Widget {
    private _thumb: Rect;
    private _track: Rect;
    private _upButton: Rect;
    private _downButton: Rect;
    private _callback: (args: number) => void;
    private _x: number = 0;
    private _y: number = 0;
    private _thumbPosition: number = 0;
    private _thumbHeight: number;
    private _minThumbHeight: number = 20;
    private _buttonHeight: number;
    private _isDragging: boolean = false;
    private _dragStartY: number = 0;
    private _dragStartThumbY: number = 0;
    private defaultHeight: number = 100;
    private defaultWidth: number = 10;
    private defaultThumbHeight: number = 30;
    private defaultButtonHeight: number = 10;
    
    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._thumbHeight = this.defaultThumbHeight;
        this._buttonHeight = this.defaultButtonHeight;
        // set Aria role
        this.role = RoleType.scrollbar;
        // render widget
        this.render();
        // set default state!
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        // create track
        this._track = this._group.rect(this.width, this.height);
        this._track.stroke("black");
        this._track.fill("#F9F9F9");
        this._track.x(this._x);
        this._track.y(this._y);
        this.registerEvent(this._track);
        this._track.on('click', (event: MouseEvent) => {
            let rect = (event.target as SVGGraphicsElement).getBoundingClientRect();
            let y = event.clientY - rect.top + this._y;
            this.trackClick(y);
        });
        // create up button
        this._upButton = this._group.rect(this.width, this._buttonHeight);
        this._upButton.stroke("black");
        this._upButton.fill("#C9C9C9");
        this._upButton.x(this._x);
        this._upButton.y(this._y);
        this.registerEvent(this._upButton);
        this._upButton.on('click', (event: MouseEvent) => {
            this.upButtonClick();
        });
        // create down button
        this._downButton = this._group.rect(this.width, this._buttonHeight);
        this._downButton.stroke("black");
        this._downButton.fill("#C9C9C9");
        this._downButton.x(this._x);
        this._downButton.y(this._y + this.height - this._buttonHeight);
        this.registerEvent(this._downButton);
        this._downButton.on('click', (event: MouseEvent) => {
            this.downButtonClick();
        });
        // create thumb
        let thumbHeight = this._getThumbHeight();
        this._thumb = this._group.rect(this.width, thumbHeight);
        this._thumb.stroke("black");
        this._thumb.fill("#C9C9C9");
        this._thumb.x(this._x);
        this._thumb.y(this._y + this._buttonHeight);
        this.registerEvent(this._thumb);
        this._thumb.on('mousedown', (event: MouseEvent) => {
            event.stopPropagation();
            this.thumbMouseClickState(event.clientY);
            let eventMouseMove = (moveEvent: MouseEvent) => {
                this.thumbMouseMoveState(moveEvent.clientY);
            };
            let eventMouseUp = () => {
                this.thumbMouseReleaseState();
                window.removeEventListener('mousemove', eventMouseMove);
                window.removeEventListener('mouseup', eventMouseUp);
            };
            window.addEventListener('mousemove', eventMouseMove);
            window.addEventListener('mouseup', eventMouseUp);
        });
        // Set the outer svg element 
        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    override update(): void {
        if (this._track != null) {
            this._track.height(this.height);
            this._track.width(this.width);
            this._track.x(this._x);
            this._track.y(this._y);
            this._upButton.width(this.width);
            this._upButton.height(this._buttonHeight);
            this._upButton.x(this._x);
            this._upButton.y(this._y);
            this._downButton.width(this.width);
            this._downButton.height(this._buttonHeight);
            this._downButton.x(this._x);
            this._downButton.y(this._y + this.height - this._buttonHeight);
        }
        
        if (this._thumb != null) {
            let thumbHeight = this._getThumbHeight();
            this._thumb.height(thumbHeight);
            this._thumb.width(this.width);
            let thumbThreshold = this.height - this._buttonHeight - thumbHeight;
            this._thumbPosition = Math.max(0, Math.min(thumbThreshold, this._thumbPosition));
            this._thumb.x(this._x);
            this._thumb.y(this._y + this._buttonHeight + this._thumbPosition);
        }
        
        super.update();
    }

    _getThumbHeight(): number {
        return Math.max(this._minThumbHeight, this._thumbHeight);
    }

    set setHeight(value: number) {
        this.height = value;
        this.update();
    }

    get scrollHeight(): number {
        return this.height;
    }

    get thumbPosition(): number {
        return this._thumbPosition;
    }
    
    trackClick(y: number): void {
        // move based on where mouse clicks
        let trackY = y - +this._track.y() - this._buttonHeight;
        let thumbThreshold = this.height - this._buttonHeight - +this._thumb.height();
        // move up if above thumb
        if (trackY < this._thumbPosition) {
            console.log("Direction: up");
            this._thumbPosition = Math.max(0, this._thumbPosition - +this._thumb.height());
        } 
        // else move down if below thumb
        else if (trackY > this._thumbPosition + +this._thumb.height()) {
            console.log("Direction: down");
            this._thumbPosition = Math.min(thumbThreshold, this._thumbPosition + +this._thumb.height());
        }
        this._thumb.y(+this._track.y() + this._buttonHeight + this._thumbPosition);
        
        if (this._callback) {
            this._callback(this._thumbPosition);
        }
    }
    
    upButtonClick(): void {
        console.log("Direction: up");
        // move thumb up
        this._thumbPosition = Math.max(0, this._thumbPosition - 10);
        this._thumb.y(+this._track.y() + this._buttonHeight + this._thumbPosition);
        
        if (this._callback) {
            this._callback(this._thumbPosition);
        }
    }
    
    downButtonClick(): void {
        console.log("Direction: down");
        // move thumb down
        let thumbThreshold = this.height - this._buttonHeight - +this._thumb.height();
        this._thumbPosition = Math.min(thumbThreshold, this._thumbPosition + 10);
        this._thumb.y(+this._track.y() + this._buttonHeight + this._thumbPosition);
        
        if (this._callback) {
            this._callback(this._thumbPosition);
        }
    }
    
    thumbMouseMoveState(y: number): void {
        // move based on where mouse goes
        if (this._isDragging) {
            if (y < this._dragStartY) {
                console.log("Direction: up");
            }
            else {
                console.log("Direction: down");
            }
            let distanceBetweenYAndStart = y - this._dragStartY;
            let newThumbY = this._dragStartThumbY + distanceBetweenYAndStart;
            let thumbThreshold = this.height - this._buttonHeight - +this._thumb.height();            
            this._thumbPosition = Math.max(0, Math.min(thumbThreshold, newThumbY));
            this._thumb.y(+this._track.y() + this._buttonHeight + this._thumbPosition);
            
            if (this._callback) {
                this._callback(this._thumbPosition);
            }
        }
    }

    thumbMouseClickState(y: number): void {
        this._isDragging = true;
        this._dragStartY = y;
        this._dragStartThumbY = this._thumbPosition;
    }
    
    thumbMouseReleaseState(): void {
        this._isDragging = false;
    }

    onScroll(callback: (args: number) => void): void {
        this._callback = callback;
    }
    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState) {
            this.raise(new EventArgs(this));
        }
    }
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    move(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this.update();
    }
    keyupState(): void {}
}

export { ScrollBar } 