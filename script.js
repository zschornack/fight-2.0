getPlayerName((name) => {
    playername = name

const char = createKnight(name)
const monster = createLittleMonster()

stage.start(
    char,
    monster,
    document.getElementById('char'),
    document.getElementById('monster'),
) 
})