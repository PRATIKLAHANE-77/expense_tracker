// const { default: axios } = require("axios");

// const { response } = require("express");

// const { response } = require("express");

// const { response } = require("express");
const mainlist = document.getElementById("mainlist");

const addExpense = document.getElementById("add-expense");

addExpense.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const obj = {
    amount: amount,
    description: description,
    category: category,
  };

  postdata(obj);
});

function postdata(param) {
  axios.post("http://localhost:5000/addexpense", param).then((response) => {
    const li = document.createElement("li");
    const deldata = document.createElement("button");
    deldata.textContent = "DELETE";
    const { amount, description, category } = response.data;
    li.textContent = `Amount: ${amount} Description: ${description} Category: ${category}`;
    li.appendChild(deldata);
    mainlist.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  showAllExpenses();
});

function showAllExpenses() {
  axios
    .get("http://localhost:5000/getall")
    .then((response) => {
      const ans = response.data.forEach((data) => {
        const { amount, description, category, id } = data;
        const li = document.createElement("li");
        const deldata = document.createElement("button");
        deldata.textContent = "DELETE";
        li.textContent = `Amount: ${amount} Description: ${description} Category: ${category}`;
        li.appendChild(deldata);
        mainlist.appendChild(li);
        deldata.addEventListener("click", () => delData(id,li));
      });
    })
    .catch((err) => {
      const li = document.createElement("li");
      li.textContent = `Something went wrong`;
    });
}

function delData(id,li) {
  axios.delete("http://localhost:5000/deldata", { data: { id } })
    .then((response) => {
      // console.log(response.data);
      alert("data deleted sucessfully");
      mainlist.removeChild(li); 
      
      
    })
    .catch((error) => {
      alert("something went wrong");
    });
}

