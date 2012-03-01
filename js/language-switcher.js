choose = function(extension, command, name) {
    $(".language.extension").text(extension);
    $(".language.command").text(command);
    for(i in languages) {
      $("div."+languages[i]["name"]).hide();
      $("a.language-switcher."+languages[i]["name"]).removeClass("selected");
    }
    $("div."+name).show();
    $("a.language-switcher."+name).addClass("selected");
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

$(function() {
  var lang = {"extension":languages[0]["extension"], "command":languages[0]["command"], "name": languages[0]["name"]};
  var param = getParameterByName("lang");
  if(param != "") {
    for(i in languages) {
      if(languages[i]["name"] == param) {
        lang = languages[i];
      }
    }
  }
  choose(lang["extension"], lang["command"], lang["name"]);
  $(".language-switcher").click(function(e) {
    e.preventDefault();
    var ext = $(this).attr("data-extension");
    var cmd = $(this).attr("data-command");
    var name = $(this).attr("data-name");
    var offset_before = $(this).offset().top;
    var scroll_top = $(window).scrollTop();
    choose(ext, cmd, name);
    var offset_after = $(this).offset().top;
    $(window).scrollTop(scroll_top - offset_before + offset_after);
  });

  // Hide all lang links inside hostile blocks
  var lang_list = $.map(languages, function (e) {return "div."+e.name; }).join(',');
  $(lang_list).find('a.language-switcher').each(function(index, domEle){
    var lang = $(domEle).data('name');
    if ($(domEle).parents('.'+lang).size()== 0){
      $(domEle).hide();
    }
  });

});
