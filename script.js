var phone = document.getElementById("phone");
var email = document.getElementById("email");
var cities = document.getElementById("city");
var districts = document.getElementById("district");
var btnSubmit = document.getElementById("submit-btn");
var saveData = [];
var tableBodyEl = document.getElementById("tbody");
const nav_sidebar_active = document.getElementById("sidebar-title");
const nav_active = document.getElementById("sidebar");

var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "json",
};

var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  saveData = data;
  for (const x of data) {
    cities.options[cities.options.length] = new Option(x.Name, x.Id);
  }
  cities.onchange = function () {
    district.length = 1;

    if (this.value != "") {
      const result = data.filter((n) => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
}

var validate = () => {
  if (phone.value === "") {
    alert("Please input your phone number!");
    return false;
  } else if (email.value === "") {
    alert("Please input your email");
    return false;
  } else if (!email.value.includes("@")) {
    alert("Your email is not valid, please input as ABC@gmail.com");
    return false;
  } else if (cities.value === "") {
    alert("Please select City");
    return false;
  } else if (districts.value === "") {
    alert("Please select District");
    return false;
  }
};

var renderData = (userObj) => {
  const row = document.createElement("tr");
  tableBodyEl.appendChild(row);

  const phone = document.createElement("th");
  row.appendChild(phone);
  phone.innerHTML = userObj.phone;

  const email = document.createElement("td");
  row.appendChild(email);
  email.innerHTML = userObj.email;

  const city = document.createElement("td");
  row.appendChild(city);
  city.innerHTML = userObj.city;

  const district = document.createElement("td");
  row.appendChild(district);
  district.innerHTML = userObj.district;
};

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
  var user = {
    phone: phone.value,
    email: email.value,
    city: saveData.filter((city) => city.Id === cities.value)[0].Name,
    district: saveData
      .filter((city) => city.Id === cities.value)[0]
      .Districts.filter((district) => district.Id === districts.value)[0].Name,
  };
  console.log(user);
  renderData(user);
});

nav_sidebar_active.addEventListener("click", function (e) {
  e.preventDefault();

  nav_active.classList.toggle("active");
});
