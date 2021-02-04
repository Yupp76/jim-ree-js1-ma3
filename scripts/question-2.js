const url =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";

const responseList = document.querySelector(".response__list");
const loader = document.querySelector(".loader");

const showLoader = () => {
  loader.classList.add("active");
};

const hideLoader = () => {
  loader.classList.remove("active");
};

const renderDataCard = (data) => {
  const liElement = document.createElement("li");
  const divElement = document.createElement("div");

  const content = `<span><b>Name:</b> ${data.name}</span>
                    <span><b>Rating:</b> ${data.rating}</span>
                    <span><b>Number of tags:</b> ${data.tags.length}</span>`;

  divElement.innerHTML = content;

  liElement.appendChild(divElement);
  responseList.appendChild(liElement);
};

const getData = async () => {
  try {
    showLoader();
    const response = await fetch(url);
    const results = await response.json();
    const dataList = results.results;

    if (!!dataList) {
      hideLoader();
      for (val of dataList) {
        renderDataCard(val);
      }
    }
  } catch (error) {
    hideLoader();

    const liElement = document.createElement("li");

    liElement.className = "error";
    liElement.innerHTML = "Error loading data, please check your network";

    responseList.appendChild(liElement);

    console.error(error);
  }
};

getData();
