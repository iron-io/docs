choose = function(extension, command) {
    $(".language.extension").text(extension);
    $(".language.command").text(command);
    for(i in languages) {
      $("code."+languages[i]["command"]).parent().parent().hide();
      $("div."+languages[i]["command"]).hide();
      $("a.language-switcher."+languages[i]["command"]).removeClass("selected");
    }
    $("code."+command).parent().parent().show();
    $("div."+command).show();
    $("a.language-switcher."+command).addClass("selected");
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
  var lang = {"extension":languages[0]["extension"], "command":languages[0]["command"]};
  var param = getParameterByName("lang");
  if(param != "") {
    for(i in languages) {
      if(languages[i]["extension"] == param) {
        lang = languages[i];
      }
    }
  }
  choose(lang["extension"], lang["command"]);
  $(".language-switcher").click(function(e) {
    e.preventDefault();
    ext = $(this).attr("data-extension");
    cmd = $(this).attr("data-command");
    choose(ext, cmd);
  });
});
