const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0,
    bg: document.querySelector('.bgimage')
}

function createKnight(name, i) {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 12,
        defense: 8, 
        icon: i       
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
        icon: 'url(img/sorcerer.png)',
        wallpaper: 'url(img/wallpaper-2.jpg)'
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
        icon: 'url(img/small-monster.png)',
        wallpaper: 'url(img/wallpaper-1.jpg)'
    }
}

function createBigMonster() {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        attack: 14,
        defense: 6,
        icon: 'url(img/big-monster.png)',
        wallpaper: 'url(img/wallpaper-3.jpg)'
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
        let bt1parent = document.querySelector('#bt1parent')
        let newbtn1 = btn1.cloneNode(true)
        bt1parent.replaceChild(newbtn1, btn1)
        
        this.fighter1El.querySelector('#attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))

    }, 
    update() {
        this.fighter1El.querySelector('#charicon').style.backgroundImage = this.fighter1.icon
        this.fighter2El.querySelector('#monsicon').style.backgroundImage = this.fighter2.icon

        document.querySelector('.bgimage').style.backgroundImage = this.fighter2.wallpaper

        let f1pct
        let f2pct
        let bar1 = this.fighter1El.querySelector('.bar')
        let bar2 = this.fighter2El.querySelector('.bar')

        if (this.fighter1.life <= 0) {
            f1pct = 0
        } else {
            f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100   
        }
        bar1.style.width = `calc(${f1pct}% - 10px)`
        
        if (this.fighter2.life <= 0){
            f2pct = 0
        } else {
            f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100
        }
        bar2.style.width = `calc(${f2pct}% - 10px)`

        bar1.style.backgroundColor = getColor(Math.floor(f1pct))
        bar2.style.backgroundColor = getColor(Math.floor(f2pct))
        
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
            setTimeout(()=>{
                defeat()
            }, 500)
        }
        
        if (this.fighter2.life <= 0) {
            setTimeout(() => {
                victory(this.fighter1)
            }, 500)
        }

    },
    doAttack(char, monster) {          
        let monsterDefense = monster.defense * (Math.random() * 2).toFixed(2)
        let monsterAttack = monster.attack * (Math.random() * 2).toFixed(2)
        let charDefense = char.defense * (Math.random() * 2).toFixed(2)
        let charAttack = char.attack * (Math.random() * 2).toFixed(2)

        let log = document.getElementById('log')
        const node = document.createElement('li')

        if (monsterDefense >= charAttack) {
            let text = document.createTextNode(`${monster.name} defendeu`)
            node.appendChild(text)
            log.appendChild(node)

        } else {
            let dano = charAttack - monsterDefense
            monster.life -= dano
            let text = document.createTextNode(`${char.name} causou ${dano.toFixed(2)} de dano.`)
            node.appendChild(text)
            log.appendChild(node)
        }
        this.update()

        setTimeout(() => {
            const node = document.createElement('li')
            if (monster.life > 0) {
            if (charDefense >= monsterAttack) {
                let text = document.createTextNode(`${char.name} defendeu`)
                node.appendChild(text)
                log.appendChild(node)
    
            } else {
                let dano = monsterAttack - charDefense
                char.life -= dano
                let text = document.createTextNode(`${monster.name} causou ${dano.toFixed(2)} de dano.`)
                node.appendChild(text)
                log.appendChild(node)
            }}
            this.update()
        }, 500)
        
    }
    
}

function getPlayerName(callback) {
    let blurr = document.querySelector('#blurr')
    let container = document.querySelector('#newchar')

    blurr.style.display = 'block'
    container.style.display = 'block'

    document.querySelectorAll('.options').forEach(option => {
        option.addEventListener('change', (event) => {
            document.querySelectorAll('.options-container').forEach(label => {
                label.style.outline = 'none'
            })
            if (event.target.checked) {
                event.target.parentElement.style.outline = '3px solid white'
            }
        })
    })    

    const form = document.querySelector('#form')
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let name = document.querySelector("#inputname").value
        let gender = document.querySelectorAll(".options")

        if (gender[0].checked == true) {
            gender = 'man'
        } else {
            gender = 'woman'
        }

        let character = {name, gender}

        blurr.style.display = 'none'
        container.style.display = 'none'
        
        callback(character)
    }

)
}

function defeat() {
    document.querySelector('.gameovercontainer').style.display='flex'
    document.querySelector('#blurr').style.display='block'    
}

function getmonster() {
    let choice = getRandomInt(3)
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
    })
}

function getColor(pct) {
    
    let red = Math.min(255, Math.max(0, 255 - pct * 2.55))
    let green = Math.min(255, Math.max(0, pct * 2.55 ))
    
    return `rgb(${red},${green},0)`
}
