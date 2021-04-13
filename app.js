function getFinancingData() {
  const amount = document
    .getElementById("value")
    .value.replace(".", "")
    .replace(",", ".");

  const interest = document.getElementById("fees-financing").value;
  const time = document.getElementById("time-financing").value;
  const selectInterest = document.getElementById("select_fees").value;
  const selectTime = document.getElementById("select_time").value;

  return {
    amount,
    interest,
    time,
    selectInterest,
    selectTime,
  };
}

function typeFinancingInterest({ interest, selectInterest }) {
  if (selectInterest == "ano") {
    let new_fees = interest / 12;
    return new_fees;
  } else {
    return interest;
  }
}

function typeFinancingTime({ time, selectTime }) {
  if (selectTime == "anual") {
    let new_time = time * 12;
    return new_time;
  } else {
    return time;
  }
}

function portion({ amount, time, interest }) {
  time = typeFinancingTime(getFinancingData());
  interest = typeFinancingInterest(getFinancingData()) / 100;

  let data1 = Math.pow(1 + interest, time) - 1;
  let data2 = Math.pow(1 + interest, time) * interest;
  let value_final = amount / (data1 / data2);
  let cash = value_final.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  document.getElementById("portion").innerHTML = cash;
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

function accumulated_interest() {
  value = document
    .getElementById("value")
    .value.replace(".", "")
    .replace(",", ".");
  time = typeFinancingTime(getFinancingData());
  let result = portion(getFinancingData()) * time;
  let result_final = result - value;
  let print;

  print = result_final.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  print = document.getElementById("accumulated").innerHTML = print;
}

function payment_total(portion_value) {
  value = document.getElementById("value").value;
  time = typeFinancingTime(getFinancingData());
  let result = time * portion_value;
  let print;

  print = result.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  print = document.getElementById("payment").innerHTML = print;
}

document.getElementById("calculate").addEventListener("click", () => {
  let portion_value = portion(getFinancingData());
  loan();
  accumulated_interest();
  payment_total(portion_value);
});

document.getElementById("clear").addEventListener("click", () => {
  location.reload();
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
