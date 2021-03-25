let value;
let fees;
let time;
let cash;

function portion(value, fees, time, cash) {
  value = document.getElementById("value").value;
  time = document.getElementById("time-financing").value;
  fees = document.getElementById("fees-financing").value;
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

function lent() {
  value_lent = document.getElementById("value").value;

  let print;
  print = value_lent.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  print = document.getElementById("total_lent").innerHTML = print;
}

function fees_acumulado(value, time) {
  value = document.getElementById("value").value;
  time = document.getElementById("time-financing").value;

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
  time = document.getElementById("time-financing").value;
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
  portion(value, fees, time, cash);
  lent();
  fees_acumulado(value, time, fees);
  payment_total();
});

// FUNÇÃO PARA LIMPAR CAMPOS
function data_clear() {
  value = document.getElementById("value").value;
  time = document.getElementById("time-financing").value;
  fees = document.getElementById("fees-financing").value;

  value = "";
  time = "";
  fees = "";

  document.getElementById("value").value = value;
  document.getElementById("time-financing").value = time;
  document.getElementById("fees-financing").value = fees;

  document.getElementById("payment").innerHTML = "R$ 0,00";
  print = document.getElementById("accumulated").innerHTML = "R$ 0,00";
  print = document.getElementById("total_lent").innerHTML = "R$ 0,00";
  cash = document.getElementById("portion").innerHTML = "R$ 0,00";
}

// BOTÃO LIMPAR
document.getElementById("clear").addEventListener("click", () => {
  data_clear();
});
