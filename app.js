window.onload = function(){
  var myList = {}
  var ul = $('ul')[0]

  myList.createNewLi = function(data){
    var li = $('<li />').addClass('list-group-item').attr('contenteditable', 'true')
    .text(data)
    return li
  }

  // myList.addDeleteOption = function(){
  //   var sideOption = $('<span />').addClass('glyphicon glyphicon-remove')
  //   .html($('<input />').attr("type","checkbox"))
  //   return sideOption
  // }
  //Writting cookies
  myList.rememberList = function(){
    var li = $('li')
    $.each(li, function(index, value){
      if ($(value).text() !== ""){
        document.cookie = "item#" + index + "=" + $(value).text() + ";"
      }
    })
  }
  //Reading from cookies
  myList.checkCookies = function(){
    var myCookies = document.cookie.split(";")
    var data = []
    $.each(myCookies, function(index, value){
      data.push(value.split("="))
    })
    for (var value in data){
      if (data[value][1] !== undefined || data[value][0] === /item#*/g){
        $(ul).append(myList.createNewLi(data[value][1]))
        //  alert(data[value][1])
      }
    }
  }

  //Set the expiration time to delete the cookie
  myList.expiration = function(cookieLife){
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000)
    return document.cookie = cooName + "=" + cooValue + "; expires=" + expr.toUTCString()
  }

  myList.checkCookies()

  $('#add').on('click', function(){
    $(ul).append(myList.createNewLi())
  })
  $('#done').on('click', function(){
    myList.rememberList()
    alert("Done!")
  })
  $('#delete').click(function(){
    $('ul li').last().remove()
  })
}
