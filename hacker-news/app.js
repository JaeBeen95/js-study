const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

newsFeed.map((item) => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.innerHTML = item.title;

  li.appendChild(a);
  ul.appendChild(li);
});

document.getElementById("root").appendChild(ul);
