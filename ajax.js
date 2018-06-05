$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
        var searchTerm = $('#search-input').val();
        getRequest(searchTerm);
    });
    
    // for (let i = 0; i < 15; i++) {
    //     $('#cities').append('<option value="">'+ i+'</option>')
        
    // }

    function getRequest(input) {
        var cities = $('#cities_val').val();
        // var c = $( "form input:radio" ).prop( "checked");
        var url = 'https://api.openweathermap.org/data/2.5/weather?q='+cities+'&units=metric';
        var rules = {
            apiKey: '74b0d3380a8ae5e52234b1fffc5bbf72', 
            s: input,
            r: 'json'
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: rules,
            dataType: 'json'
        })
            .done(function (done) {
                // console.log(done);
                showResults(done);
            })
            .fail(function (fail) {
                // console.log(fail);

            });
    }
    function showResults(data) {
        // console.log(data);

        $('.temp').text(data.main.temp);
        $('.humidity').text(data.main.humidity);
        $('.wind').text(data.wind.speed);
        $('.city').text(data.name);
    
    }

    $(function() {
        $('#btn-1').on('click', function() {
          $('.temp').slideToggle(50);
        });
        $('#btn-1').on('click', function() {
          $('.humidity').slideToggle(50);
        });
        $('#btn-1').on('click', function() {
          $('.wind').slideToggle(50);
        });
        $('#btn-1').on('click', function() {
          $('.city',).slideToggle(50);

        });
    });
});
// Väder slutar här, samtidigt som valutakursen börjar

