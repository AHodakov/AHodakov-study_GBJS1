const digit = {
    hundreds: 0,
    tens: 0,
    units: 0,
    transformNumber: function (userEnteredNumber) {
        if (userEnteredNumber >= 0 && userEnteredNumber < 1000) {
            this.units = Math.floor(userEnteredNumber % 10);
            this.tens = Math.floor(userEnteredNumber / 10 % 10);
            this.hundreds = Math.floor(userEnteredNumber / 100 % 10);
            console.log('Заданое число: ' + userEnteredNumber + ' сотни: ' + digit.hundreds + ' десятки: ' + digit.tens + ' еденицы : ' + digit.units );
        }else {
            alert('Введено не верное значение!');
            console.log(digit);
        }
    }
};

let userEnteredNumber = parseInt(prompt('Введите любое число от 0 до 999: '), 10);      
digit.transformNumber(userEnteredNumber);





