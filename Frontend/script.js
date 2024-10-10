const API_KEY="109572a17ca04a80930e792eb599ec7e"
const url ="https://newsapi.org/v2/everything?q="
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const IPL = document.getElementById('ipl');
const Finance = document.getElementById('finance')
const Politice = document.getElementById('politics')
window.addEventListener('load', ()=> fetchNews("India"));


async function fetchNews(query) {
    try{
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);// Using the proxy server
        const data = await res.json();
        console.log(data);
        bindData(data.articles);

    }catch(error){
        console.log(error);
    }
   
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newsCardtemplate = document.getElementById('template-news-card')
    cardsContainer.innerHTML= "";
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
    function fillDataInCard(cardClone, article){
        const newsImg = cardClone.querySelector("#news-img");
        const newsTitle = cardClone.querySelector("#news-title");
        const newsSource = cardClone.querySelector("#news-source");
        const newsDesc =  cardClone.querySelector("#news-Desc");
        const newsLink = cardClone.querySelector("#news-link")
        if (newsImg) {
            newsImg.src = article.urlToImage;
        } else {
            console.error("Image element not found in the template.");
        }
    
        if (newsTitle) {
            newsTitle.innerHTML = article.title;
        } else {
            console.error("Title element not found in the template.");
        }
    
        if (newsDesc) {
            newsDesc.innerHTML = article.description;
        } else {
            console.error("Description element not found in the template.");
        }
    
        if (newsSource) {
            const date = new Date(article.publishedAt).toLocaleString("en-us", {
                timeZone: "Asia/Jakarta"
            });
            newsSource.innerHTML = `${article.source.name} 🤝 ${date}`;
        } else {
            console.error("Source element not found in the template.");
        }
        if(newsLink){
            newsLink.href= article.url;
        }else{
            console.log("element not found")
        }
    }
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchNews(query);
        }
    });
    
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                fetchNews(query);
            }
        }
    });
    IPL.addEventListener('click', () => fetchNews('IPL'));
    Finance.addEventListener('click', () => fetchNews('Finance'));
    Politice.addEventListener('click', () => fetchNews('Politics'));