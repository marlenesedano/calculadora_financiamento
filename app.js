let value;
let fees;
let time;
let cash;

function tipe_fees(fees) {
  let select_fees = document.getElementById("select_fees").value;
  if (select_fees == "ano") {
    fees = document.getElementById("fees-financing").value;

    let new_fees = fees / 12;
    fees = new_fees;
    return fees;
  } else {
    fees = document.getElementById("fees-financing").value;
    return fees;
  }
}

function tipe_time(time) {
  let select_time = document.getElementById("select_time").value;
  if (select_time == "anual") {
    time = document.getElementById("time-financing").value;

    let new_time = time * 12;
    time = new_time;
    return time;
  } else {
    time = document.getElementById("time-financing").value;
    return time;
  }
}

function portion(value, fees, time, cash) {
  value = document
    .getElementById("value")
    .value.replace(".", "")
    .replace(",", ".");
  time = tipe_time();

  fees = tipe_fees();
  let value_final;

  fees = fees / 100;
  data1 = Math.pow(1 + fees, time) - 1;
  data2 = Math.pow(1 + fees, time) * fees;
  value_final = value / (data1 / data2);
  cash = value_final.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  cash = document.getElementById("portion").innerHTML = cash;
  return value_final;
}

function loan() {
  let value_lent = Number(
    document.getElementById("value").value.replace(".", "").replace(",", ".")
  );
  let print;

  print = value_lent.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  print = document.getElementById("total_loan").innerHTML = print;
}

function fees_acumulado(value, time) {
  value = document
    .getElementById("value")
    .value.replace(".", "")
    .replace(",", ".");
  time = tipe_time();
  let result = portion() * time;
  let result_final = result - value;
  let print;
  print = result_final.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  print = document.getElementById("accumulated").innerHTML = print;
}

function payment_total() {
  value = document.getElementById("value").value;
  time = tipe_time();
  let result = time * portion();
  let print;
  print = result.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  print = document.getElementById("payment").innerHTML = print;
}

// BOTÃO CALCULAR
document.getElementById("calculate").addEventListener("click", () => {
  tipe_time(time);
  tipe_fees(fees);
  portion(value, fees, time, cash);
  loan();
  fees_acumulado(value, time, fees);
  payment_total();
});

// FUNÇÃO PARA LIMPAR CAMPOS
function data_clear() {
  value = document.getElementById("value").value;
  time = tipe_time();
  fees = tipe_fees();
  value = "";
  time = "";
  fees = "";
  document.getElementById("value").value = value;
  document.getElementById("time-financing").value = time;
  document.getElementById("fees-financing").value = fees;
  document.getElementById("payment").innerHTML = "R$ 0,00";
  print = document.getElementById("accumulated").innerHTML = "R$ 0,00";
  print = document.getElementById("total_loan").innerHTML = "R$ 0,00";
  cash = document.getElementById("portion").innerHTML = "R$ 0,00";
}

// BOTÃO LIMPAR
document.getElementById("clear").addEventListener("click", () => {
  data_clear();
});

document.getElementById("printer").addEventListener("click", () => {
  window.print();
});

function formatCurrency() {
  let element = document.getElementById("value");
  let value = element.value;

  value = value + "";
  value = parseInt(value.replace(/[\D]+/g, ""));
  value = value + "";
  value = value.replace(/([0-9]{2})$/g, ",$1");

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  element.value = value;
  if (value == "NaN") element.value = "";
}
