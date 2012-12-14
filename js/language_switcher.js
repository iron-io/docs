function setLanguage(target_language){
    $('.language').hide();
    if (target_language==".Net") {target_language="dotnet";};
    window.current_language = target_language.toLowerCase();
    $('.language.'+window.current_language).show();
    $('.dropdown-toggle').html(target_language+' <b class="caret"></b>')
    $('#dropdown-'+window.current_language).addClass('active');
}

function switchLanguage(target_language){
    cacheLanguage(target_language);
    $('.dropdown-toggle').html(target_language+' <b class="caret"></b>')
    target_language = target_language.toLowerCase();
    if (target_language==".net") {target_language="dotnet";};
    $('.language.'+window.current_language).hide();
    $('.language.'+target_language).show();
    $('#dropdown-'+window.current_language).removeClass('active');
    $('#dropdown-'+target_language).addClass('active');
    window.current_language = target_language;
    cacheLanguage(window.current_language);
}

function cacheLanguage(target_language){
    target_language = $('#dropdown-'+target_language).text();
    if (Modernizr.localstorage) {
        localStorage.setItem("desired_language", target_language);
    }
    Cookies.set("desired_language", target_language);
}