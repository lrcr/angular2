import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `<div class='home'>home</div>`,
    styles: [`.home{ background : #fff; height : 80px; width : 80%}`]
})

export class HomeComponent {
}

@Component({
    selector: 'app-chat',
    template: `<textarea placeholder='wrtie message' class='chat'></textarea>`,
    styles: [`.chat{ background : #eee; height : 80px; width : 10%}`]
})

export class ChatComponent {

}
