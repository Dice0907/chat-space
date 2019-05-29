$(function() { 
  function buildHTML(message) {
    var imagehtml = message.image.url == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
    var html = 
    `<div class="message" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${imagehtml}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error');
    })
  });
  var reloadMessages = function() {
    var message_id = $('.message:last').data('id');
    $.ajax({
      url: "./api/messages",
      type: "get",
      data: {
        message: { id: message_id } 
      },
      dataType: 'json'
    })
    .done(function(messages) {
      var insertHTML = '';
      if(messages.length !== 0){
      messages.forEach(function(message) {
          insertHTML += buildHTML(message);
      })
      $('.messages').append(insertHTML);
     }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // 通信失敗時の処理
      console.log("ajax通信に失敗しました");
      console.log("jqXHR          : " + jqXHR.status); 
      console.log("textStatus     : " + textStatus);    
      console.log("errorThrown    : " + errorThrown.message); 
    })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }
  $(window).on('load',function(){
    　if(document.URL.match(/messages/)) {
   setInterval(reloadMessages, 5000); 
    }
  })
});



