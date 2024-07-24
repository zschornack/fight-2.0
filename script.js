getPlayerName((character) => {
    let playername = character.name
    let gender = character.gender

    if (gender == 'man') {
        icon = 'url(img/man.png)'
    } else {
        icon = 'url(img/girl.png)'
    }

const char = createKnight(playername, icon)
const monster = createLittleMonster()

stage.start(
    char,
    monster,
    document.getElementById('char'),
    document.getElementById('monster'),
) 
})