
let calculations = JSON.parse(localStorage.getItem('calculations')) || []; // Загрузка расчетов из localStorage
function calculateCost(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const area = parseFloat(document.getElementById('area').value);
    const floors = parseInt(document.getElementById('floors').value);
    const roofType = document.getElementById('roofType').value;
    const wallMaterial = document.getElementById('wallMaterial').value;
    const foundationType = document.getElementById('foundationType').value;
    const finishingMaterial = document.getElementById('finishingMaterial').value;

    // Примерные коэффициенты для расчета стоимости
    const baseCostPerSquareMeter = 1000; // Базовая стоимость за квадратный метр
    const floorCost = 5000; // Стоимость за этаж
    const roofCost = {
        flat: 10000,
        gable: 15000,
        hip: 20000,
        mansard: 25000
    };
    const wallCost = {
        brick: 2000,
        wood: 1500,
        concrete: 1800,
        foam: 1200
    };
    const foundationCost = {
        strip: 30000,
        pile: 40000,
        slab: 50000,
        column: 35000
    };
    const finishingCost = {
        plaster: 5000,
        paint: 3000,
        tile: 7000,
        woodPanel: 8000
    };

    // Расчет стоимости
    const totalCost = (area * baseCostPerSquareMeter) +
                      (floors * floorCost) +
                      roofCost[roofType] +
                      wallCost[wallMaterial] +
                      foundationCost[foundationType] +
                      finishingCost[finishingMaterial];

    // Отображение результата
    document.getElementById('result').innerText = `Итоговая стоимость: ${totalCost.toFixed(2)} рублей`;

    // Показать форму для ввода данных
    document.getElementById('contactForm').style.display = 'block';

    // Сохраняем расчет в массив
    calculations.push({ area, floors, totalCost });
}

function submitContact() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    console.log(`ФИО: ${fullName}, Email: ${email}`);

    localStorage.setItem('calculations', JSON.stringify(calculations));

    // Отображение всех сохраненных расчетов
    displaySavedCalculations();

    // Показать сообщение об успешной отправке
    alert("Ваши данные успешно отправлены!");

    // Сбросить форму
    document.getElementById('contactForm').style.display = 'none'; // Скрыть форму
}

function displaySavedCalculations() {
    const savedCalculationsList = document.getElementById('savedCalculations');
    savedCalculationsList.innerHTML = ''; // Очистить список перед добавлением новых

    calculations.forEach((calc, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Расчет ${index + 1}: Площадь = ${calc.area} м², Этажи = ${calc.floors}, Стоимость = ${calc.totalCost.toFixed(2)} рублей`;
        savedCalculationsList.appendChild(listItem);
    });
}

// Функция для проверки пароля перед переходом в админку
function checkPasswordAndRedirect() {
    const password = prompt("Введите пароль для доступа к админке:");
    if (password === "999") {
        window.location.href = "admin.html"; // Переход на страницу admin.html
    } else {
        alert("Неверный пароль!");
    }
}

// Привязываем функцию к кнопке
document.getElementById('adminButton').onclick = checkPasswordAndRedirect;

