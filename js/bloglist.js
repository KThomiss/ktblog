const url = "https://ktnoroff.online/ktblog/wp-json/wp/v2/posts?per_page=20&_embed";

const listOfBlogs = document.querySelector(".blogList");
const loading = document.querySelector(".loadingContainer");

async function getBlogList() {
    try {
        const response = await fetch(url);
        const result = await response.json();

        loading.innerHTML = "";

        for (let i = 0; i < 10; i++) {

            listOfBlogs.innerHTML += `<a href="specificblog.html?id=${result[i].id}">
                                                <div class="carousel-item">
                                                    <img src="${result[i]._embedded['wp:featuredmedia']['0'].source_url}" class="thumbnail-img" alt="${result[i]._embedded['wp:featuredmedia']['0'].alt_text}"></img>
                                                    <h4 class="post-title">${result[i].title.rendered}</h4>
                                                    <p class="card-intro">cursus eget nunc scelerisque viverra mauris...</p>
                                                    <a href="specificblog.html?id=${result[0].id}" class="link">Read post</a>
                                                </div>    
                                       </a>`;

            const viewMoreBtn = document.querySelector(".view-more-btn");
            const scrlStartBtn = document.querySelector(".scrl-top-btn");

            let numPosts = 10;

            viewMoreBtn.onclick = function() {
                for (let i = numPosts; i < result.length; i++) {
              
                    listOfBlogs.innerHTML +=
                    `<a href="specificblog.html?id=${result[i].id}">
                        <div class="carousel-item transition-in">
                            <img src="${result[i]._embedded['wp:featuredmedia']['0'].source_url}" class="thumbnail-img" alt="${result[i]._embedded['wp:featuredmedia']['0'].alt_text}"></img>
                            <h4 class="post-title">${result[i].title.rendered}</h4>
                            <p class="card-intro">cursus eget nunc scelerisque viverra mauris...</p>
                            <a href="specificblog.html?id=${result[0].id}" class="link">Read post</a>
                        </div>    
                    </a>`;

                        viewMoreBtn.classList.add("hideButton");

                        if (viewMoreBtn.classList.contains("hideButton")) {
                            scrlStartBtn.style.display = "block";
                        }

                        scrlStartBtn.addEventListener("click", function() {
                            window.scrollTo({
                                top: 0,
                            });
                        });
                    }
                }
        }
    } catch (error) {
        listOfBlogs.innerHTML = `<p id="catchError">"An error has occured."</p>`;
    }
}
getBlogList();