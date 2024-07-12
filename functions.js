
const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0,
}

function createKnight(name) {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8,
    }
}

function createSorcerer() {
    return {
        ...defaultCharacter,
        name: 'Sorcerer',
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 5,
    }
}

function createLittleMonster() {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 40,
        maxLife: 40,
        attack: 8,
        defense: 4,
    }
}

function createBigMonster() {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6,
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.update()
        
        let btn1 = fighter1El.querySelector('#attackbutton')
        let btn2 = fighter2El.querySelector('#attackbutton')
        let bt1parent = document.querySelector('#bt1parent')
        let bt2parent = document.querySelector('#bt2parent')
        let newbtn1 = btn1.cloneNode(true)
        let newbtn2 = btn2.cloneNode(true)
        bt1parent.replaceChild(newbtn1, btn1)
        bt2parent.replaceChild(newbtn2, btn2)


        this.fighter2El.querySelector('#attackbutton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
        this.fighter1El.querySelector('#attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))

    }, 
    update() {
        // fighter 1 lifebar
        let f1pct
        let f2pct
        //let bar1 = this.fighter1El.querySelector('.bar')
        //let bar2 = this.fighter2El.querySelector('.bar')
        if (this.fighter1.life <= 0) {
            f1pct = 0
        } else {
            f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100
        }
        this.fighter1El.querySelector('.bar').style.width = f1pct + '%'
        

        // fighter 2 lifebar
        if (this.fighter2.life <= 0){
            f2pct = 0
        } else {
            f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        }
        this.fighter2El.querySelector('.bar').style.width = f2pct + '%'

        // fighter text stats
        let life1 = this.fighter1.life
        let life2 = this.fighter2.life
        if (life1 <= 0) {
            life1 = 0
        }
        if (life2 <= 0) {
            life2 = 0
        }
        
        this.fighter1El.querySelector('#charname').innerHTML = this.fighter1.name
        this.fighter1El.querySelector('.stats').innerHTML = life1.toFixed(2)
        this.fighter2El.querySelector('.name').innerHTML = this.fighter2.name
        this.fighter2El.querySelector('.stats').innerHTML = life2.toFixed(2)

        if (this.fighter1.life <= 0) {
            defeat()
        }
        
        if (this.fighter2.life <= 0) {
            victory(this.fighter1)
        }

    },
    doAttack(attacking, attacked) {
        if (attacking.life <=0 || attacked.life <= 0) {
            return;
        }
        let defenseFactor = (Math.random() * 2).toFixed(2)
        let attackFactor = (Math.random() * 2).toFixed(2)
        let realDefense = attacked.defense * defenseFactor
        let realAttack = attacking.attack * attackFactor
        let log = document.getElementById('log')

        if (realDefense >= realAttack) {
            let text = document.createTextNode(`${attacked.name} defendeu`)
            const node = document.createElement('li')
            node.appendChild(text)
            log.appendChild(node)

        } else {
            let dano = realAttack - realDefense
            attacked.life -= dano
            let text = document.createTextNode(`${attacking.name} causou ${dano.toFixed(2)} de dano.`)
            const node = document.createElement('li')
            node.appendChild(text)
            log.appendChild(node)
        }

        this.update()
    }
    
}

function getPlayerName(callback) {
    let elements = document.querySelectorAll('.newplayer')
        elements[0].style.display = 'block'
        elements[1].style.display = 'block'

    let form = document.querySelector('form')
    form[1].addEventListener('click', (e) => {
        e.preventDefault()

        let text = form[0].value
        elements[0].style.display = 'none'
        elements[1].style.display = 'none'
        callback(text)
    })
}

function defeat() {
    document.querySelector('.gameovercontainer').style.display='flex'
    document.querySelector('#blurr').style.display='block'    
}

function getmonster() {
    let choice = getRandomInt(3)
    console.log(choice)
    if (choice == 0) {
        return createLittleMonster()
    } else if (choice == 1) {
        return createSorcerer()
    } else if (choice == 2) {
        return createBigMonster()
    }
}

function getRandomInt(max) {
    let getnum = Math.floor(Math.random() * max)
    return getnum;
}

function victory(fighter) {
    document.querySelector('.victorycontainer').style.display='flex'
    document.querySelector('#blurr').style.display='block'
    let btn = document.querySelector('#victorybutton')
    let container = document.querySelector('.victorycontainer')
    let newbtn = btn.cloneNode(true)
    container.replaceChild(newbtn, btn)

    let logcontainer = document.querySelector('#logcontainer')
    let log = document.querySelector('#log')
    let newlog = log.cloneNode(false)
    logcontainer.replaceChild(newlog, log)


    newbtn.addEventListener('click', () => {
        let char = fighter
        char.life = fighter.maxLife
        let monstEl = document.querySelector("#monster")
        let charEl = document.querySelector("#char")

        let monst = getmonster()
        
        document.querySelector('.victorycontainer').style.display='none'
        document.querySelector('#blurr').style.display='none'
        stage.start(char, monst, charEl, monstEl)
        console.log(monst)
        console.log(char)
    })
}