function dangky() {

  let dn = form.dn.value;
  let mk = form.mk.value;
  let email = form.email.value;
  let phone = form.phone.value;
  let address = form.address.value;


  if (findemail(email)) {
    emaillb.style.visibility = "visible";
    return false;
  } else {
    emaillb.style.visibility = "hidden";
  }

  let user = new User(dn, mk, email, phone, address);

  let users = getLocalStorage();
  users.push(user);
  setLocalStorage(users);
  return true;
}

function validate(input, lable) {
  if (input.value.length === 0) {
    lable.style.visibility = "visible";
    return false;
  }

  lable.style.visibility = "hidden";
  return true;
}

function findemail(email) {
  let users = getLocalStorage();
  
  for (let user of users) {
    if (user.mail === email) {
      return true;
    }
  }
  return false;
}

const userListKey = "userListKey";

function setLocalStorage(data) {
  localStorage.setItem(userListKey, JSON.stringify(data))
}

function getLocalStorage() {
  let json = localStorage.getItem(userListKey)
  if (json !== null)
    return JSON.parse(json);
  else
    return [];
}

form.addEventListener('submit', function (event) {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    if (!dangky()) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}, false)