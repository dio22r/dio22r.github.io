$(function() {
    const baseInviteUrl = "https://script.google.com/macros/s/AKfycbxBR8b-Hj2AeP2ClfSLPbEMqhRwcsZHU4CCxhGZkk8d59bEVo9Z1OuLOnUsGTXd6Adw/exec";

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
    if (id) {
        $.get(baseInviteUrl, {id: id })
            .then(function(res) {
                $("#invitation-name").html(res.result.name);
                $(".invitation-code").val(res.result.code);
            });
    }
        

    const form = document.getElementById("form-wish");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = new FormData(event.target);

        /**
         * with this you can perform some validation, etc
         **/
        const name = data.get("name");
        const address = data.get("address");
        const wish = data.get("wish");

        console.log(name, address, wish)
        if (!name || !address || !wish) {
            Swal.fire({
                icon: "warning",
                title: "Check your wish!",
                text: "Please check your wish!",
              });

              return false;
        }
        /**
         * send data to web APP URL from
         * script deployment
         *
         * change the url to your URL, don't use this
         **/
        fetch(
            "https://script.google.com/macros/s/AKfycbwlz17i2yagAYilAmV6LAmrtS9UaNS5Cwdx-getN3lR7QPg_oS-YsYoKpiQ6zkjAltqvw/exec",
            {
            redirect: "follow", // don't remove this
            method: "POST",
            body: data,
            }
        )
            .then(res => res.json())
            .then(data => Swal.fire({
                icon: "success",
                title: "Submit RSVP Success!",
              }))
            .catch(err => console.log(err));
    });


    // rsvp

    const formRsvp = document.getElementById("form-rsvp");

    formRsvp.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = new FormData(event.target);

        /**
         * with this you can perform some validation, etc
         **/
        const name = data.get("name");
        const is_present = data.get("is_present");

        if (!is_present) {
            $("#people").val(0);
        }

        if (!name) {
            Swal.fire({
                icon: "warning",
                title: "Check your rsvp!",
                text: "Please check your wish!",
              });

              return false;
        }
        /**
         * send data to web APP URL from
         * script deployment
         *
         * change the url to your URL, don't use this
         **/
        fetch(baseInviteUrl,
            {
            redirect: "follow", // don't remove this
            method: "POST",
            body: data,
            }
        )
            .then(res => res.json())
            .then(data => Swal.fire({
                icon: "success",
                title: "Submit RSVP Success!",
              }))
            .catch(err => console.log(err));
    });

    //////
    $("input[type='radio']").change(function () {
        
        if ($("#is_present-1").is(":checked")) {
            $("#number-of-people").removeClass("d-none");
        } else {
            $("#number-of-people").addClass("d-none")
            $("#people").val(0);
        }
    })

    $("#open-invitation").click(function() {
        $("#open-invitation-wrapper").addClass("d-none");
        $("#slide").removeClass("close-invitation");
        $("#slide").addClass("open-invitation");
        $("#invitation-name").removeClass("d-none");
        $(".invitation-to").removeClass("d-none");

        $("audio").trigger('play');
    })
    
});
