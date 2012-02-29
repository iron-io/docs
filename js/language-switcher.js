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
    var offset = $(this).offset().top;
    ext = $(this).attr("data-extension");
    cmd = $(this).attr("data-command");
    name = $(this).attr("data-name");
    choose(ext, cmd, name);
    var offset_diff = $(this).offset().top - offset;
    $(window).scrollTop($(window).scrollTop() + offset_diff);
  });
});
