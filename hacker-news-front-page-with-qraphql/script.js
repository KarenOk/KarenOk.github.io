const URL = "https://www.graphqlhub.com/graphql";
let data;
let storyListElem = document.querySelector(".story-list");

const query = `query{
    hn {
      topStories {
        id
        score
        title
        by {
          id
        }
        time
        kids{
          id
        }
        url
      }
    }
  }
`;


const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
};

fetch(URL, options)
    .then(res => {
        return res.json();
    })
    .then(response => {
        console.log(response);
        data = response;

        document.querySelector("img.loading").style.display = "none";
        document.querySelector(".more-stories").style.display = "block";

        for (var i = 0; i < 30; i++) {
            let stories = data.data.hn.topStories;
            let htmlString = `
            <li class="story">
                <span class="title"> ${stories[i].title} </span> ${stories[i].url ? `<a class="source" href="${stories[i].url}"> ( ${getDomainName(stories[i].url)})` : ""}
                </a>
                <p class="details"> ${stories[i].score} points by ${stories[i].by.id} ${timeDiff((Math.round((new Date()).getTime())), 1000 * stories[i].time)} | hide  ${stories[i].kids ? `| ${stories[i].kids.length} comments` : ""}</p>
            </li>
        `;
            storyListElem.innerHTML = storyListElem.innerHTML + htmlString;
        }
    })
    .catch(err => {
        console.error(err);
    });


function getDomainName(url) {
    return url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0];
}


function timeDiff(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000 - 1) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute - 1) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour - 1) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay - 1) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth - 1) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear - 1) + ' years ago';
    }
}
