function validLanguage(target_language) {
    return target_language in languages;
}

function switchLanguage(target_language){
    if(!validLanguage(target_language)) {
        console.log('"'+target_language+'" not found in languages.');
        return;
    }
    cache = true;
    if(arguments.length == 2) {
        cache = arguments[1];
    }
    $('.dropdown-toggle').html('Documentation for ' + languages[target_language]+' <b class="caret"></b>')
    $('.language').hide();
    $('.language.'+target_language).show();
    $('#menu3 > .active').removeClass('active');
    $('#dropdown-'+target_language).addClass('active');
    $('.content h1').html("IronMQ " + capitalizeLanguage(target_language) + " Documentation")
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

function capitalizeLanguage(string)
{   if (string == "php"){
    return string.toUpperCase(); }

    else if(string == "dotnet"){
        return ".NET";
    }
    else if(string == "Node.js"){
        return "Node.js";
    }
    else {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
}