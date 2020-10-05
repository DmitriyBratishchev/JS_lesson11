"use strict";

let response;

function listResultStart() {
  let personQuery = document.querySelector(".person_search").value;

  document.querySelector("ul").innerHTML = "";

  if (!personQuery) {
    let newLi = document.createElement("li");
    newLi.innerHTML = `Вы ничего не ввели. Введите текст запроса!`;

    document.querySelector("ul").prepend(newLi);
  } else {
    onload(personQuery);
  }
}

function onload(personQuery) {
  // Сохраняем адрес API
  console.time("start");
  var api = "https://swapi.dev/api/";

  // Формируем полный адрес запроса:
  var url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
  url += personQuery; // значение переменной запроса search

  // Таким образом формируется строка вида:
  // https://swapi.dev/api/people/?search=obi

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  var request = new XMLHttpRequest();

  // Назначаем обработчик события load для запроса
  request.addEventListener("load", function () {
    // отображаем в консоли текст ответа сервера

    // парсим его из JSON-строки в JavaScript-объект
    response = JSON.parse(request.response);

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или не подходят
    if (request.status !== 200) {
      alert(
        "Произошла ошибка при получении ответа от сервера:\n\n" +
          response.message
      );
      return;
    }

    // Проверяем, если поле имя в ответе на запрос
    // if (response.count == 0) {
    //   alert("К сожалению, данные не получены по запросу: " + url);
    //   return;
    // }

    // Если все в порядке, то отображаем количество результатов поиска
    console.timeEnd("start");
    listResult(response);
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  request.open("get", url);
  request.send();
}

function listResult(response) {
  document.querySelector("ul").innerHTML = "";

  if (!response.count) {
    let newLi = document.createElement("li");
    newLi.innerHTML = "К сожалению нет данных по вашему запросу.";

    document.querySelector("ul").prepend(newLi);
  } else {
    let personArray = response.results;

    for (let i = 0; i < personArray.length; i++) {
      let newLi = document.createElement("li");
      newLi.className = "list_item";
      newLi.setAttribute("onclick", "renderDetails(" + i + ")");
      newLi.innerHTML = response.results[i].name;

      document.querySelector("ul").append(newLi);
    }
  }
}

function renderDetails(i) {
  document.querySelector("#name").textContent = response.results[i].name;
  document.querySelector("#height").textContent = response.results[i].height;
  document.querySelector("#mass").textContent = response.results[i].mass;
  document.querySelector("#birth_year").textContent =
    response.results[i].birth_year;
  document.querySelector("#films_count").textContent =
    response.results[i].films.length;
}
