const updateResult = (value) => {
  const elements = document.querySelectorAll("[data-result='result']");
  elements.forEach((elem) => {
    elem.innerText = value;
  });
};

const closeModal = () => {
  document.querySelector(".modal-container").classList.remove("modal");
};

const predict = () => {
  document.querySelector(".modal-container").classList.add("modal");
  fetch("https://shrouded-thicket-14794.herokuapp.com/predict", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wc_ratio: Number(document.getElementsByName("w/c")[0].value),
      curing_time: Number(document.getElementsByName("curing_time")[0].value),
      nanosilica: Number(document.getElementsByName("nanosilica")[0].value),
      microsilica: Number(document.getElementsByName("microsilica")[0].value),
    }),
  })
    .then((response) => {
      document.querySelector(".page-loader").classList.add("hide");
      response.json().then((data) => {
        updateResult(data.strength.toFixed(2));
        document.querySelector(".result-container").classList.add("result");
      });
    })
    .catch((error) => {
      document.querySelector(".page-loader").classList.add("hide");
      document.querySelector(".error-container").classList.add("result");
    });
  return false;
};
