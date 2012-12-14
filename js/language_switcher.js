function switchLanguage(target_language){
    if(!validLanguage(target_language)) {
        console.log('"'+target_language+'" not found in languages.');
        return;
    }
    cache = true;
    if(arguments.length == 2) {
        cache = arguments[1];
    }
    $('.dropdown-toggle').html(languages[target_language]+' <b class="caret"></b>')
    $('.language').hide();
    $('.language.'+target_language).show();
    $('#menu3 > .active').removeClass('active');
    $('#dropdown-'+target_language).addClass('active');
    if(cache) {
        cacheLanguage(target_language);
    }
}

function cacheLanguage(target_language){
    if (Modernizr.localstorage) {
        localStorage.setItem("desired_language", target_language);
    }
    Cookies.set("desired_language", target_language);
}

function validLanguage(target_language) {
    return target_language in languages;
}
