

$.ajax({
    type: "GET",
    url: '/api/chirps/',
    headers: new Headers({
        'content-type': 'application/json'
    })
}).done((result) => {
    
    let keys = Object.keys(result);

    for (let i of keys) {
        
        if (i != 'nextid') {
        
            $('#chirpbox').append(`
        <div id="outerDiv${i}"> 
            <p id="chirp${i}" href="#modal${i}"><span id="bigx${i}"> X </span><a id="linkkey${i}"class="waves-effect #616161 grey darken-2 btn modal-trigger" href="#modal${i}">${result[i].chirp}</a></p>
            
            <div id="modal${i}" class="modal">
                <div class="modal-content">
                    <h4>Update Your Chirp Below</h4>
                    <input id="modaltext${i}" type="text" class="validate" name="chirp" data-length="140">
                </div>
                <div class="modal-footer">
                    <a href="#!" id="modalsubmit${i}" class="modal-action modal-close waves-effect waves-green btn-flat">Submit</a>
                </div>
            </div>
        </div>`)

            $(`#bigx${i}`).on('click', function (e) {
                $.ajax({
                    type: "DELETE",
                    url: `/api/chirps/${i}`,
                    contentType: "application/json"
                }).done((result) => {
                    console.log(result);
                    $(`#outerDiv${i}`).remove();

                }).fail((err) => {
                    console.log(err);
                });
            });

            $(`#chirp${i}`).on('click', function (e) {
                $('.modal').modal();
            })

            $(`#modalsubmit${i}`).on('click', function (e) {
                let modalchirp = $(`#modaltext${i}`).val();
                console.log(modalchirp);
                $.ajax({
                    type: "PUT",
                    url: `/api/chirps/${i}`,
                    data: JSON.stringify({ chirp: modalchirp }),
                    contentType: "application/json"
                }).done((result) => {
                    console.log(result);
                    $(`#linkkey${i}`).html(modalchirp);
                    window.location.reload(true);

                }).fail((err) => {
                    console.log(err);
                });
            })
        }
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
        console.log(result);
        $('#chirpbox').prepend(` <div id="outerDiv$">
            <p id="chirp${result.id}" href="#modal${result.id}"><span id="bigx${result.id}"> X </span><a class="waves-effect #616161 grey darken-2 btn modal-trigger" href="#modal$">${result.chirp}</a></p>
            
            <div id="modal$" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </div>`)
    }).fail((err) => {
        console.log(err);
    });

});

