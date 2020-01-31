const renderQuestions = object => `
      <div class="card">
         <div class="card-body">
            <h4 class="card-title">${object.subject}</h4>
            <p class="card-text">${object.text}</p>
            <a href="#${object.id}" class="card-link" data-toggle = collapse>Посмотреть ответ</a>
            <p id="${object.id}" class="card-text collapse">${object.correctAnswer}</p> 
         </div>
         <div class="card-footer text-right">
         
            <p class="card-text">${object.author}</p>
         </div>
      </div>`;
      
const renderMenu = param => `
      <button type="button" class="btn btn-secondary btn-block" data-subject='${param.subject}'>${param.subject}</button>
      `;

const renderForm = value => `
      <option value="${object.subject}">${object.subject}</option>
      `;

const loadMenu = (event) => {
   createRequest({ path: `/api/v001/questions`, method: "GET"})
    .then(response => {
       document.querySelector('#menu').innerHTML = response.questions
       .map(renderMenu)
       .join("");
       const menuItems = document.querySelectorAll('#menu button');
       let supervise = {};
       $('button').each(function() {
         let txt = $(this).text();
         if (supervise[txt])
            $(this).remove();
         else
            supervise[txt] = true;
       });
       menuItems.forEach(item => {
         item.addEventListener('click', loadQuestions)
       })
       console.log("Результат вопросов", response);
    });
};

const loadQuestions = (event) => {
   console.log(event.target.dataset.subject)
   createRequest({ path: `/api/v001/questions?subject=${event.target.dataset.subject}`, method: "GET"})
    .then(response => {
         document.querySelector('#body').innerHTML = response.questions
         .map(renderQuestions)
         .join("");
    });
};

const loadAllQuestions = (event) => {
   createRequest({ path: `/api/v001/questions/?page=0`, method: "GET"})
    .then(response => {
         document.querySelector('#body').innerHTML = response.questions
         .map(renderQuestions)
         .join("");
         document.querySelector('#allsub').addEventListener('click', loadAllQuestions);
    });
};

const loadForm = (event) => {
   console.log(event.target.dataset.subject)
   createRequest({ path: `/api/v001/questions?subject=${event.target.dataset.subject}`, method: "GET"})
    .then(response => {
         document.querySelector('#form').innerHTML = response.questions
         .map(renderForm)
         .join("");
    });
};

document.addEventListener('DOMContentLoaded', loadMenu);

window.onload = loadAllQuestions;

const addQuestionForm = document.querySelector('#addQuestion');
addQuestionForm.addEventListener("submit", event => {
   event.preventDefault();
   
   const data = getFieldData(event.target);
   console.log("main", "data", data);
   
   toggleClass(".addQuestion", "loading")
   
   createRequest({ path: `/api/v001/questions?subject=${event.target.dataset.subject}`, method: "POST" }, {}, data)
    .then(response => {
      toggleClass(".addQuestion", "loading");
      console.log("Вопрос добавлен", response);
      loadQuestions;
    })
    .catch(() => {
      toggleClass(".addQuestion", "loading");
      console.log("Не удалось добавить вопрос");
    });
});

const userSelector = document.querySelector('.select_control-user');
userSelector.addEventListener('change', event => {
  userId = event.target.value;
});
