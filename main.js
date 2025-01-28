let recipe = [] // Все ингредиенты, массив с объектами

// Кнопка Добавить ингредиент
document.querySelector('.add_btn').addEventListener('click', function() {
  let name = document.querySelector('.item_name')
  let count = document.querySelector('.item_count')
  let type = document.querySelector('.item_type')
  if(!name.value) {
    alert("Введите название ингредиента")
    return false
  }
  recipe.push({"name": name.value, "count": +count.value, "type": type.value})

  let result
  if(+count.value === 0) {
    result = `${name.value} - по вкусу`
  } else {
    result = `${name.value} - ${count.value} ${type.value}`
  }

  let div = document.createElement('div')
  div.innerHTML = `
<div class="d-flex spcb">
  <div>${result}</div>
  <button class="remove_btn" data-name="${name.value}">&times;</button>
</div>
`
  document.querySelector('.recipe').append(div)
  name.value = ''
  count.value = ''
  
  // Выводим исходный рецепт
  // console.log(recipe)
})

// Кнопка Вычислить
document.querySelector('.result_btn').addEventListener('click', function() {
  // Очистить прошлый результат
  document.querySelector('.result_recipe').innerHTML = ''
  document.querySelector('.result_new_recipe').innerHTML = ''

  let ratio_type = +document.querySelector('.item_ratio_type').value
  let ratio = +document.querySelector('.item_ratio').value
  if(!ratio) {
    alert("Введите число кроме нуля")
    return false
  }

  let new_recipe = []
  if(ratio_type === 1) {
    for(let i=0; i<recipe.length; i++) {
      new_recipe.push({"name": recipe[i]["name"], "count": +recipe[i]["count"]/ratio, "type": recipe[i]["type"]})
    }
  } else if(ratio_type === 2) {
    for(let i=0; i<recipe.length; i++) {
      new_recipe.push({"name": recipe[i]["name"], "count": +recipe[i]["count"]*ratio, "type": recipe[i]["type"]})
    }
  }
  // Выводим новый рецепт
  // console.log(new_recipe) 

  // Выводим Новый рецепт
  for(let i=0; i<new_recipe.length; i++) {
    let result
    if(+new_recipe[i]["count"] == 0) {
      result = `по вкусу`
    } else {
      result = `${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`
    }
    let div = document.createElement('div')
    div.innerHTML = `
  <div class="d-flex">
    <div>${new_recipe[i]["name"]} - ${result}</div>
  </div>
  `
    document.querySelector('.result_new_recipe').append(div)
  }
})

// Изменить название рецепта
document.querySelector('.recipe_name').addEventListener('click', function() {
  let name = prompt("Введите название рецепта")
  if(name) {
    document.querySelector('.recipe_name').textContent = name
  }
})

// Кнопка удалить кокнретный ингредиент
document.querySelector('.recipe').addEventListener('click', function(e) {
  if(!e.target.dataset.name) {
    return false
  }
  e.target.closest('.d-flex').remove()
  for(let i=0; i<recipe.length; i++) {
    if(recipe[i]["name"] == e.target.dataset.name) {
      recipe.splice(i, 1) // удалить элемент
    }
  }
  // Выводим исходный рецепт
  // console.log(recipe)
})

// Изменить размер текста
// Уменьшить
document.querySelector('.fsize button:first-child').addEventListener('click', function() {
  let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize);
  if (currentFontSize > 12) { // Проверяем, чтобы шрифт был не менее 12 пикселей
    document.body.style.fontSize = `${currentFontSize - 1}px`;
  }
})
// Увеличить
document.querySelector('.fsize button:last-child').addEventListener('click', function() {
  let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize);
  if (currentFontSize < 16) { // Проверяем, чтобы шрифт был не более 16 пикселей
    document.body.style.fontSize = `${currentFontSize + 1}px`;
  }
})

// Копирование рецепта в буфер обмена
const copyButton = document.getElementById('copy_btn');
copyButton.addEventListener('click', () => {
  // Получаем текст из блока .text
  const textToCopy = document.querySelector('.copy').innerText;

  // Копируем текст в буфер обмена
  navigator.clipboard.writeText(textToCopy)
      .then(() => {
          alert('Рецепт успешно скопирован!');
      })
      .catch(err => {
          console.error('Не удалось скопировать текст:', err);
      });
});