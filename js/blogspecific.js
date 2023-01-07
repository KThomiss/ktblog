const queryString = document.location.search;

const para = new URLSearchParams(queryString);

const postId = para.get("id");

const postUrl = "https://ktnoroff.online/ktblog/wp-json/wp/v2/posts/" + postId + "?_embed";

const contentContainer = document.querySelector(".blog-content");
const loading = document.querySelector(".loadingContainer");

async function getBlogPosts() {
  try {
    const response = await fetch(postUrl);
    const result = await response.json();

    loading.innerHTML = "";

    contentContainer.innerHTML = `<h1>${result.title.rendered}</h1>
        <div>${result.content.rendered}</div>
        <div class="post-author">
            <p>By: ${result._embedded["author"]["0"].name} <strong><span>|</span></strong> Published: ${result.date} <strong><span>|</span></strong> <strong>KTBlog.</strong></p>
        </div`;

    document.title = `Blog | ${result.title.rendered} | by KTBlog.`;

    const figures = document.querySelectorAll("figure");

    for (let i = 0; i < figures.length; i++) {
      const body = document.querySelector(".body-specific");
      figures[i].addEventListener("click", function (e) {
        body.classList.toggle("disable-scroll");
        this.classList.toggle("zoom");
        e.stopPropagation();
      });
    }
  } catch (error) {
    console.log(error);
    contentContainer.innerHTML = `<p id="catchError">"An error has occured."</p>`;
  }
}
getBlogPosts();
