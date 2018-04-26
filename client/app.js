

$.ajax({
    type: "GET",
    url: '/api/chirps',
    headers: new Headers({
        'content-type': 'application/json'
    })
}).done((result) => {
    //let keys = Object.keys(result) pulls each key from the result object and saves it as an array.
    let keys = Object.keys(result);
    // below is an example of a "for of" loop (for each iteration of x, do this)
    for (let i of keys) {
        $('#chirpbox').append(`<p id="chirp${i}" href="#modal${i}"><span id="bigx${i}"> X </span>${result[i].chirp}</p>`)
        $(`#bigx${i}`).on('click', function (e) {
            // alert(result[i].chirp);
            $.ajax({
                type: "DELETE",
                url: `/api/chirps/${i}`,
                contentType: "application/json"
            }).done((result) => {
                console.log(result);
                $(`#chirp${i}`).remove();

            }).fail((err) => {
                console.log(err);
            });
        });

        $(`#chirp${i}`).on('click', function (e) {
            let chirp = $('#text').val()
        //    Something to bring up modals for each chirp needs to go here. 

        })

        // $(`#chirps${i}`).on('click', function (e) {
        //     let chirp = $('#text').val()
        //     $.ajax({
        //         type: "PUT",
        //         url: `/api/chirps/${i}`,
        //         data: JSON.stringify({ chirp }),
        //         contentType: "application/json"
        //     }).done((result) => {
        //         console.log(result);
        //        $(`#chirp${i}`).remove();

        //     }).fail((err) => {
        //         console.log(err);
        //     });
        // })
    }
});


$('#form-id').submit(function (e) {
    e.preventDefault();
    let chirp = $('#text').val()

    $.ajax({
        type: "POST",
        url: '/api/chirps/',
        data: JSON.stringify({ chirp }),
        contentType: "application/json"
    }).done((result) => {
        $('#chirpbox').prepend(`<p id="chirp"><span id="bigx"> X </span>${result.chirp}</p>`)
    }).fail((err) => {
        console.log(err);
    });

});

