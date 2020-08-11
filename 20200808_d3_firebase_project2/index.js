const form = document.querySelector("form");
const btns = document.querySelectorAll("button");
const formAct = document.querySelector("form span");
const input = document.querySelector("input");
const error = document.querySelector(".error");

var activity = 'cycling';

btns.forEach(btn => {
  btn.addEventListener('click', e => { // e is automatically generated
    // get activity
    activity = e.target.dataset.activity;
    // remove active class
    btns.forEach(btn => btn.classList.remove('active'));
    // change active class
    e.target.classList.add('active');
    // set ID of input field
    input.setAttribute('id', activity);
    // set text of form span
    formAct.textContent = activity;
  })
});

// form submit
form.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault(); // by default, when we hit enter, page is reloaded...

  const distance = parseInt(input.value);
  if(distance){
    db.collection('activities').add({
      distance: distance,
      activity: activity, // can also just write as activity,
      date: new Date().toString()
    }).then(() => {
      error.textContent = '';
      input.value = '';
    })
  } else {
    error.textContent = 'Please enter a valid distance'
  }
});
