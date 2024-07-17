const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  const totalPages = Math.ceil(newsFeed.length / 10);

  newsList.push("<ul>");

  newsFeed
    .slice((store.currentPage - 1) * 10, store.currentPage * 10)
    .map((item) => {
      newsList.push(`
      <li>
        <a href="#/show/${item.id}">
          ${item.title} (${item.comments_count})
        </a>
      </li>
    `);
    });

  newsList.push("</ul>");

  newsList.push(
    `
    <div>
      <a href="#/page/${
        store.currentPage > 1 ? store.currentPage - 1 : 1
      }">이전 페이지</a>
       <a href="#/page/${
         store.currentPage < totalPages ? store.currentPage + 1 : totalPages
       }">다음 페이지</a>
    </div>
    `
  );

  container.innerHTML = newsList.join("");
}

function newsDetail() {
  const id = location.hash.substring(7);

  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
