let guestbook = []
const imgs = ['https://images.unsplash.com/photo-1553830591-42e4fd7035ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1553519610-a53235d1b8b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1553544989-622c07f6aace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1553479078-7d8b13b51b3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1553600842-dc436cacbab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/flagged/photo-1553570444-457bc317359b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1553568188-ad36518734fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            'https://images.unsplash.com/photo-1553710120-23dd1551da41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1315&q=80',
            'https://images.unsplash.com/photo-1553482790-e3fcacee02c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80']

$(document).ready(function(){
    // $.ajax({
    //     url : 'http://localhost/rest/list',
    //     type : 'GET',
    //     dataType : 'json'
    // }).done(function(data){
    //     data.forEach((el, index) => {
    //         if(index >= data.length - 3){
    //             var wrap = $('.guestbook')
    //             var htmlString = `<div class="post">
    //                                 <div class="post__media"><img src="${el.imgurl}" alt=""/></div>
    //                                 <div class="post__body">
    //                                     <div class="post__meta"><span class="date">${new Date(el.date).toDateString()}</span><span class="author"><a>by ${el.name}</a></span></div>
    //                                     <h2 class="post__title">${el.subject}</h2>
    //                                     <p class="post__text">${el.message}</p>
    //                                 </div>
    //                             </div>`
    //             wrap.prepend(htmlString)
    //         }
    //         guestbook.unshift(el)
    //     })
    // })

    var wrap = $('.guestbook')
    var htmlString = `<div class="post">
                        <div class="post__media"><img src="https://images.unsplash.com/photo-1524238063286-88c560edab8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt=""/></div>
                        <div class="post__body">
                            <div class="post__meta"><span class="date">${new Date('2019-03-29').toDateString()}</span><span class="author"><a>by 강수정</a></span></div>
                            <h2 class="post__title">방명록 서비스 중지</h2>
                            <p class="post__text">
                                AWS 계정 문제로 방명록 서비스를 잠시 중지했습니다.<br>
                                연락은 메일로 주세요!<br>
                                방명록이 써지는 것 처럼 보이긴 합니다....
                            </p>
                        </div>
                    </div>`
    wrap.prepend(htmlString)

})

$('#guestbook-submit').click(function(){

    let form = $('input, textarea')

    let name = form[0].value
    let email = form[1].value
    let subject = form[2].value
    let message = form[3].value.split('\n').join('<br>')

    let post = {name : name, email : email, subject : subject, message : message, date : new Date().toDateString()}

    if(name.length == 0 || subject.length == 0 || message.length == 0){
        alert('이름, 제목 혹은 내용을 입력해주세요')
    }

    var wrap = $('.guestbook')
    var htmlString = `<div class="post">
                        <div class="post__media"><img src="${imgs[Math.floor(Math.random() * imgs.length)]}" alt=""/></div>
                        <div class="post__body">
                            <div class="post__meta"><span class="date">${new Date().toDateString()}</span><span class="author"><a>by ${name}</a></span></div>
                            <h2 class="post__title">${subject}</h2>
                            <p class="post__text">${message}</p>
                        </div>
                    </div>`
    wrap.prepend(htmlString)
    guestbook.unshift(post)
    form[0].value = ''
    form[1].value = ''
    form[2].value = ''
    form[3].value = ''
    $(document).scrollTop(0)

    // $.ajax({
    //     url : 'http://localhost/rest/insert',
    //     type : 'POST',
    //     data : {
    //         name : name,
    //         email : email,
    //         subject : subject,
    //         message : message
    //     }
    // }).done(function(data){
    //     var wrap = $('.guestbook')
    //     var htmlString = `<div class="post">
    //                         <div class="post__media"><img src="${data.imgurl}" alt=""/></div>
    //                         <div class="post__body">
    //                             <div class="post__meta"><span class="date">${new Date(data.date).toDateString()}</span><span class="author"><a>by ${data.name}</a></span></div>
    //                             <h2 class="post__title">${data.subject}</h2>
    //                             <p class="post__text">${data.message}</p>
    //                         </div>
    //                     </div>`
    //     if(wrap.children().length % 3 == 0) wrap.children().last().remove()
    //     wrap.prepend(htmlString)
    //     guestbook.unshift(data)
    //     form[0].value = ''
    //     form[1].value = ''
    //     form[2].value = ''
    //     form[3].value = ''
    //     $(document).scrollTop(0)

    // })
    
})

$('#guestbook-load').click(function(){
    let currshow = $('.post').length
    let i = currshow
    let end = i + 3 < guestbook.length ? i + 3 : guestbook.length
    for(i; i < end; i++){
        var wrap = $('.guestbook')
        var htmlString = `<div class="post">
                            <div class="post__media"><img src="${guestbook[i].imgurl}" alt=""/></div>
                            <div class="post__body">
                                <div class="post__meta"><span class="date">${new Date(guestbook[i].date).toDateString()}</span><span class="author"><a>by ${guestbook[i].name}</a></span></div>
                                <h2 class="post__title">${guestbook[i].subject}</h2>
                                <p class="post__text">${guestbook[i].message}</p>
                            </div>
                        </div>`
        wrap.append(htmlString)
    }
})
