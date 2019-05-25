$(document).on('turbolinks:load', function(){

  var results = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
  </div>`
  results.append(html);
  }

  function addUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='${ id } '>
    <p class='chat-group-user__name'>${ name }</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
    return html
  }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();

  $.ajax({
    type: 'GET',
    url: '/users',
    data:  'keyword: input',
    dataType: 'json'
  })

    .done(function(users) {
      $('#user-search-result').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        })
        }
    })
    .fail(function(){
    appendNoUser('一致るするユーザーはありません');
    })
  })
  $(document).on("click", (".user-search-add"), function () {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().hide();
    var html = addUser(id, name);
    $('#chat-group-users').append(html);
　 })
  
  $(document).on("click", (".user-search-remove"), function () {
  $(this).parent().hide();
　 })
});