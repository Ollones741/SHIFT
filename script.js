const renderQuestions = object => `
      <div class="card">
         <div class="card-body">
            <h4 class="card-title">${object.subject}</h4>
            <p class="card-text">${object.text}</p>
            <a href="#" class="card-link">Редактировать</a>
            <a href="#" class="card-link">${object.author}</a>
         </div>
      </div>`;

const menuItems = document.querySelectorAll('#menu button');

const loadQuestions = (event) => {
   console.log(event.target.dataset.course)
   const course = event.target.dataset.course;
   createRequest({ path: `/api/v001/questions`, method: "GET"})
    .then(response => {
       document.querySelector('#body').innerHTML = response
       .map(renderQuestions)
       .join("");
       console.log("Результат вопросов", response);
    });
};

menuItems.forEach(item => {
   item.addEventListener('click', loadQuestions)
})

const addQuestionForm = document.querySelector('#addQuestion');
addQuestionForm.addEventListener("submit", event => {
   event.preventDefault();
   
   const data = getFieldData(event.Target);
   console.log("main", "data", data);
   
   toggleClass(".addQuestion", "loading")
   
   createRequest({ path: `/api/v001/books`, method: "POST" }, {}, data)
    .then(response => {
      toggleClass(".addQuestion", "loading");
      console.log("Вопрос добавлен", response);
    })
    .catch(() => {
      toggleClass(".addQuestion", "loading");
      console.log("Не удалось добавить вопрос");
    });
});
