class Gladiator {
    constructor(h, p, s, n) {
        this.initialHealth = h;
        this.currentHealth = h;
        this.power = p;
        this.initialSpeed = s;
        this.currentSpeed = s;
        this.name = n;
    }
}

let isGameStopped = false;
let glad1 = new Gladiator( Math.floor(Math.random() * 21 + 80),
                        Math.floor(Math.random() * 4 + 2),
                        Math.floor(Math.random() * 5 + 1),
                        "Bob" );
let glad2 = new Gladiator( Math.floor(Math.random() * 21 + 80),
                        Math.floor(Math.random() * 4 + 2),
                        Math.floor(Math.random() * 5 + 1),
                        "Jack" );
let glad3 = new Gladiator( Math.floor(Math.random() * 21 + 80),
                        Math.floor(Math.random() * 4 + 2),
                        Math.floor(Math.random() * 5 + 1),
                        "Andrew" );
let glads = [glad1, glad2, glad3];

function attackGladiator(attacker, victim) {
    console.log(`[${attacker.name} x ${attacker.currentHealth}] hits [${victim.name} x ${victim.currentHealth}] with power ${attacker.power}.`);
    victim.currentHealth -= attacker.power;

    if(victim.currentHealth <= 0) {
        isGameStopped = true;
        console.log(`[${victim.name}] is dying.`);
        let randomNumber = Math.random(); // if number is more than 0.5 Caesar decides +1 else -1
        if(randomNumber < 0.5) {
            console.log(`Caesar showed -1`);
            let indexOfVictim = glads.indexOf(victim);
            glads = glads.slice(0, indexOfVictim).concat(glads.slice(indexOfVictim + 1));
        } else {
            console.log(`Caesar showed +1`);
            victim.currentHealth += 50;
        }
    }
    if(victim.currentHealth >= 15 && victim.currentHealth <= 30) {
        victim.currentSpeed *= 3;
    } else {
        victim.currentSpeed = victim.initialSpeed * (victim.currentHealth / victim.initialHealth);
    }
    isGameStopped = false;
}

function hasWinner() {
    if (glads.length === 1) {
        console.log(`[${glads[0].name}] won the battle with health ${glads[0].currentHealth}!`);
        return true;
    }
    return false;
}

function start() {
    while(!hasWinner()) {
        for(let i = 0; i < glads.length; i++) {
            let currentGlad = glads[i];
            let victim = glads[Math.floor(Math.random() * glads.length)];
            while (victim === currentGlad) {
                victim = glads[Math.floor(Math.random() * glads.length)];
            }
            if (!isGameStopped) {
                attackGladiator(currentGlad, victim);
            }
        }
    }
}

start();