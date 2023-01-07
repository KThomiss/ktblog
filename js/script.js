const url = "https://ktnoroff.online/ktblog/wp-json/wp/v2/posts?per_page=20&_embed";

const carouselContainer = document.querySelector(".carousel");
const loading = document.querySelector(".loadingContainer");

async function getBlogPosts() {
    try {
        const response = await fetch(url);
        const result = await response.json();

        loading.innerHTML = "";

        for (let i = 0; i < result.length; i++) {
        
            carouselContainer.innerHTML +=
            `<a href="specificblog.html?id=${result[i].id}">
                <div class="carousel-item">
                    <img src="${result[i]._embedded['wp:featuredmedia']['0'].source_url}" class="thumbnail-img" alt="${result[i]._embedded['wp:featuredmedia']['0'].alt_text}"></img>
                    <h4 class="carousel-post_title">${result[i].title.rendered}</h4>
                    <p class="card-intro">cursus eget nunc scelerisque viverra mauris...</p>
                    <a href="specificblog.html?id=${result[i].id}" class="link">Read post</a>
                </div>
            </a>`;
        }

        const carousel = document.querySelector(".carousel");
        const carouselItem = document.querySelector(".carousel-item");
        const prevButton = document.querySelector("#previous");
        const nextButton = document.querySelector("#next");

        let movePerClick;
        let moveAmount = 0;
        const imageMargin = 40;

        function carouselMoveLeft() {
            carousel.scrollTo({
                left: (moveAmount -= movePerClick),
            })

            if (moveAmount < 0) {
                moveAmount = 0;
            }
        }
            
        prevButton.onclick = function() {
            carouselMoveLeft()
        }

        function carouselMoveRight() {
            if (moveAmount <= carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollTo({
                    left: (moveAmount += movePerClick),
                })
            }
        }

        nextButton.onclick = function() {
            carouselMoveRight()
        }
        
        movePerClick = carouselItem.clientWidth + imageMargin;

    } catch (error) {
        carouselContainer.innerHTML = `<p id="catchError">"An error has occured."</p>`;
    }
}
getBlogPosts();