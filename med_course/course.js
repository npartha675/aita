const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');
const userage = urlParams.get('userage');
const usergender = urlParams.get('usergender');
const userhobbies = urlParams.get('userhobbies');

localStorage.setItem("username", username);
localStorage.setItem("userage", userage)
localStorage.setItem("usergender", usergender)
localStorage.setItem("userhobbies", userhobbies)
