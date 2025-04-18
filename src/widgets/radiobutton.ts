// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState} from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";

class RadioButton extends Widget{
    private _choices: Circle[] = [];
    private _choicesText: string[] = [];
    private _input: string;
    private _choiceSize: number;
    private _fontSize: number;
    private _chosenIndex: number;
    private _numberOfChoices: number;
    private _callback: (args: EventArgs, index: number) => void;
    private defaultFontSize: number = 14;
    private defaultText: string = "Choice";
    private defaultNumberOfChoices: number = 3;
    private defaultSize: number = 10;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this._fontSize = this.defaultFontSize;
        this._input = this.defaultText;
        this._numberOfChoices = this.defaultNumberOfChoices;
        this._choiceSize = this.defaultSize;

        // set Aria role
        this.role = RoleType.radiobutton;
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        for (let index = 0; index < this._numberOfChoices; index++) {
            // create current choice
            let choice = this._group.circle(this._choiceSize);
            choice.fill("#FFFFFF");
            choice.stroke("#C9C9C9");
            choice.move(0, index * 20);
            this._choices.push(choice);

            // event listener for current choice
            let eventrect = this._group.rect(this._choiceSize, this._choiceSize).opacity(0).attr('id', 0);
            eventrect.move(0, index * 20);
            this.registerEvent(eventrect);
            eventrect.on('click', () => {
                this._chooseButton(index);
            });

            // create text for the current choice
            let text = this._group.text(this._input + " " + +(index + 1));
            text.font({size: this._fontSize});
            text.move(25, index * 20);
            this._choicesText.push(this._input + " " + +(index + 1));
        }
        // Set the outer svg element 
        this.outerSvg = this._group;

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    _chooseButton (index: number): void {
        console.log(this._choicesText[index]);
        if (this._chosenIndex == index) {
            return
        }
        else if (this._chosenIndex != null) {
            this._choices[this._chosenIndex].fill("#FFFFFF");
        }
        this._choices[index].fill("#C9C9C9");
        this._chosenIndex = index;
        this.raise(new EventArgs(this, null, this._chosenIndex));
    }

    set text(text: string) {
        this._input = text;
        this.update();
    }

    onClick(callback: (args: EventArgs, index: number) => void): void{
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
            this._callback(new EventArgs(this, null, this._chosenIndex), this._chosenIndex);
        }
    }
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export {RadioButton}