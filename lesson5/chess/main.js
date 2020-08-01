function createChess() {
    let letter = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    let desk = document.createElement('table')
    document.body.appendChild(desk)
    let table = document.querySelector('table')

    for (let i = 0; i <= 9; i++) {
        let row = document.createElement('tr')
        table.appendChild(row)
        if ((i === 0) || (i === 9)) {
            for (let i = 0; i <= 8; i++) {
                let th = document.createElement('th')
                row.appendChild(th)
                th.innerText = letter[i]
            }
        } else {
            for (let j = 0; j <= 9; j++) {
                if ((j === 0) || (j === 9)) {
                    let th = document.createElement('th')
                    row.appendChild(th)
                    th.innerText = i
                } else {
                    let cell = document.createElement('td')
                    row.appendChild(cell)
                }
            }
        }
    }
}

createChess()
