export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        this.stack = []
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('hearts_' + i)
        }
        shuffleArray(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCard,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            pickCardAnimation: this.pickCardAnimation
        }
    }
}

function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
}
