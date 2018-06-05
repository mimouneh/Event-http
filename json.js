$(function () {
    $('#form').submit(function (e) {
        e.preventDefault();
        var amount = $('#get-exchange').val();
        var currencySelectFrom = $('#currency-list-form').val();
        var currencySelectTo = $('#currency-list-to').val();
        getExchangeRate(amount, currencySelectFrom, currencySelectTo);
    });
    function getExchangeRate(input, currencyFrom, currencyTo) {
        var url = 'https://forex.1forge.com/1.0.3/convert?';
        var rules = {
            api_key: 'EiVxIVLcbG9NnUiQ51ysQTQrRg4pSGvQ',
            from: currencyFrom,
            to: currencyTo,
            quantity: input
        };
        console.log(rules);
        
        $.ajax({
            url: url,
            type: 'GET',
            data: rules,
            dataType: 'json'
        })
            .done(function (done) {

                showResults(done);
            })

        .fail(function (fail) {

        });
    }
    function showResults(data) {
        console.log(data);
        $('#search-currency').text(data.text);
    }
}); 
