getPlayerName((name) => {
    playername = name

const char = createKnight(name)
const monster = createLittleMonster()

console.log(char)
console.log(monster)

stage.start(
    char,
    monster,
    document.getElementById('char'),
    document.getElementById('monster'),
) 
})