function setLanguage(target_language){
    console.log("Going to remove all languages except "+target_language+".");
    var index = languages.indexOf(target_language);
    console.log(target_language+" is at index "+index+".");
    var languages_to_remove = languages.slice(0);
    languages_to_remove.splice(index,1);
    console.log("Going to remove: ");
    console.log(languages_to_remove);
    languages_to_remove.forEach(removeLanguage);
    if (target_language==".Net") {target_language="dotnet";};
    window.current_language = target_language.toLowerCase();
    $('.dropdown-toggle').html(target_language+' <b class="caret"></b>')
    $('#dropdown-'+window.current_language).addClass('active');
}

function removeLanguage(value, index, array){
    value = value.toLowerCase();
    if (value==".net") {value="dotnet";};
    $('.'+value).hide();
    console.log(value);
}

function switchLanguage(target_language){
    cacheLanguage(target_language);
    $('.dropdown-toggle').html(target_language+' <b class="caret"></b>')
    target_language = target_language.toLowerCase();
    if (target_language==".net") {target_language="dotnet";};
    $('.'+window.current_language).hide();
    $('.'+target_language).show();
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