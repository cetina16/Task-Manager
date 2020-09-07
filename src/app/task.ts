  
export class Task {
    public title: string;
    public state: string;
    public note: string;
    constructor() {
        this.title = '';
        this.note = '';
        this.state = 'show';
    }
 }