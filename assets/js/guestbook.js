let guestbook = [];
const imgs = [
  "https://images.unsplash.com/photo-1553830591-42e4fd7035ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553519610-a53235d1b8b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553544989-622c07f6aace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553479078-7d8b13b51b3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/flagged/photo-1553570444-457bc317359b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1553568188-ad36518734fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1553710120-23dd1551da41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1315&q=80",
  "https://images.unsplash.com/photo-1553482790-e3fcacee02c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
];

$(document).ready(function () {
  $.ajax({
    url: "https://nodeserver.ssue0805.now.sh/api/guestbooks",
    type: "GET",
    dataType: "json",
  }).done(function ({ guestbooks }) {
    if (guestbooks == null) return;
    guestbookList = Object.keys(guestbooks).map((key) => ({
      ...guestbooks[key],
    }));
    guestbookList.forEach((el, index) => {
      if (index >= guestbookList.length - 3) {
        var wrap = $(".guestbook");
        var htmlString = `<div class="post">
                                    <div class="post__media"><img src="${
                                      el.imgUrl
                                    }" alt=""/></div>
                                    <div class="post__body">
                                        <div class="post__meta"><span class="date">${new Date(
                                          el.date
                                        ).toDateString()}</span><span class="author"><a>by ${
          el.name
        }</a></span></div>
                                        <h2 class="post__title">${
                                          el.subject
                                        }</h2>
                                        <p class="post__text">${el.message}</p>
                                    </div>
                                </div>`;
        wrap.prepend(htmlString);
      }
      guestbook.unshift(el);
    });
  });
});

$("#guestbook-submit").click(function () {
  let form = $("#guestbook input, #guestbook textarea");

  let name = form[0].value;
  let email = form[1].value;
  let subject = form[2].value;
  let message = form[3].value.split("\n").join("<br>");
  let imgUrl = imgs[Math.floor(Math.random() * imgs.length)];

  let post = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    date: new Date().toDateString(),
    imgUrl: imgUrl,
  };

  if (name.length == 0 || subject.length == 0 || message.length == 0) {
    alert("이름, 제목 혹은 내용을 입력해주세요");
    return;
  }

  $.ajax({
    url: "https://nodeserver.ssue0805.now.sh/api/guestbooks/insert",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
  }).done(function (data) {
    if (data.guestbooks === 1) {
      var wrap = $(".guestbook");
      var htmlString = `<div class="post">
                                <div class="post__media"><img src="${
                                  post.imgUrl
                                }" alt=""/></div>
                                <div class="post__body">
                                    <div class="post__meta"><span class="date">${new Date(
                                      post.date
                                    ).toDateString()}</span><span class="author"><a>by ${
        post.name
      }</a></span></div>
                                    <h2 class="post__title">${post.subject}</h2>
                                    <p class="post__text">${post.message}</p>
                                </div>
                            </div>`;
      if (wrap.children().length % 3 == 0) wrap.children().last().remove();
      wrap.prepend(htmlString);
      guestbook.unshift(post);
      form[0].value = "";
      form[1].value = "";
      form[2].value = "";
      form[3].value = "";
      $(document).scrollTop($("#guestbook").offset().top);
    }
  });
});

$("#guestbook-load").click(function () {
  let currshow = $(".post").length;
  let i = currshow;
  let end = i + 3 < guestbook.length ? i + 3 : guestbook.length;
  for (i; i < end; i++) {
    var wrap = $(".guestbook");
    var htmlString = `<div class="post">
                            <div class="post__media"><img src="${
                              guestbook[i].imgUrl
                            }" alt=""/></div>
                            <div class="post__body">
                                <div class="post__meta"><span class="date">${new Date(
                                  guestbook[i].date
                                ).toDateString()}</span><span class="author"><a>by ${
      guestbook[i].name
    }</a></span></div>
                                <h2 class="post__title">${
                                  guestbook[i].subject
                                }</h2>
                                <p class="post__text">${
                                  guestbook[i].message
                                }</p>
                            </div>
                        </div>`;
    wrap.append(htmlString);
  }
});
