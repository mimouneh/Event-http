$(function(){
    $('#form').submit( function(e){
    e.preventDefault();
    var searchword= $('#input').val();
    getrequest(searchword);
    
    });
    
    function getrequest(searchword){
        var url="http://www.omdbapi.com/?";
    var params ={
        apikey:"c93596a2",
        s: searchword,
        r: 'json'
    };
    $.getJSON(url, params, function(data){
    
    showresult(data.Search);    
    });
    
    }
    
        function showresult(data) {
    
            console.log(data);
    
            
    
            $.each(data, function (i, value) {
    $('#result').append(`<div class="col-3">
    <img src="${value.Poster}" alt="Det finns ingen bild">
    </div>
    
    <div class="col-3">
    <h1>${value.Title}</h1>
    <p>${value.Year}</p>
    <p>${value.Type}</p>
    </div>
    `)
    
            });
    
        }
    });