$(function() {
    const baseInviteUrl = "https://script.google.com/macros/s/AKfycbyqHy1cp-_XHmZuFCL7LaMJLfWEkT5FyxRfwARf2thkd_0t6deePpYBoI0t4yQv-X1Z/exec";
    const baseWishUrl = "https://script.google.com/macros/s/AKfycbx8Qdytj8EzuqWhX4yjr7PuxfUlDJNWowColm7fxcfRgbqloee0Zwuz8jNs_Jrubn3tXQ/exec";

    let isLoadingSubmit = false;

    const arrWish = [];
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
    if (id) {
        $.get(baseInviteUrl, {id: id })
            .then(function(res) {
                $("#invitation-name").html(res.result.name);
                $(".invitation-code").val(res.result.code);
            });
    }

    initWishes();
        

    const form = document.getElementById("form-wish");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("test");
        if (isLoadingSubmit) {
            return;
        }

        isLoadingSubmit = true;
        $("#submit-wish").prop('disabled', true);

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

              isLoadingSubmit = false;
              $("#submit-wish").prop('disabled', false);

              return false;
        }
        /**
         * send data to web APP URL from
         * script deployment
         *
         * change the url to your URL, don't use this
         **/
        fetch(baseWishUrl, {
            redirect: "follow", // don't remove this
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: "success",
                    title: "Submit Wish Success!",
                })
                
                initWishes();
            })
            .catch(err => console.log(err));
    });


    // rsvp

    // // const formRsvp = document.getElementById("form-rsvp");

    // // formRsvp.addEventListener("submit", function (event) {
    // //     event.preventDefault();

    // //     const data = new FormData(event.target);

    // //     /**
    // //      * with this you can perform some validation, etc
    // //      **/
    // //     const name = data.get("name");
    // //     const is_present = data.get("is_present");

    // //     if (!is_present) {
    // //         $("#people").val(0);
    // //     }

    // //     if (!name) {
    // //         Swal.fire({
    // //             icon: "warning",
    // //             title: "Check your rsvp!",
    // //             text: "Please check your wish!",
    // //           });

    // //           return false;
    // //     }
    // //     /**
    // //      * send data to web APP URL from
    // //      * script deployment
    // //      *
    // //      * change the url to your URL, don't use this
    // //      **/
    // //     fetch(baseInviteUrl,
    // //         {
    // //         redirect: "follow", // don't remove this
    // //         method: "POST",
    // //         body: data,
    // //         }
    // //     )
    // //         .then(res => res.json())
    // //         .then(data => Swal.fire({
    // //             icon: "success",
    // //             title: "Submit RSVP Success!",
    // //           }))
    // //         .catch(err => console.log(err));
    // // });

    // //////
    // $("input[type='radio']").change(function () {
        
    //     if ($("#is_present-1").is(":checked")) {
    //         $("#number-of-people").removeClass("d-none");
    //     } else {
    //         $("#number-of-people").addClass("d-none")
    //         $("#people").val(0);
    //     }
    // })

    $("#open-invitation").click(function() {
        $("#open-invitation-wrapper").addClass("d-none");
        $("#slide").removeClass("close-invitation");
        $("#slide").addClass("open-invitation");
        $("#invitation-name").removeClass("d-none");
        $(".invitation-to").removeClass("d-none");

        $("audio").trigger('play');

        
        let audio = document.getElementById("myAudio");
        audio.volume = 0.1;
    })
    

    function initWishes() {
        $.get(baseWishUrl)
        .then(function(res) {
            let counter = 0;
            let html = '';
            for(result of res.result) {
                if (counter == 0) {
                    counter ++;
                    continue;
                }

                html += `
                    <div class="wish-item text-center mb-3">
                        <p class="wish-text">${result[3]}</p>
                        <p class="wish-from">( ${result[1]} - ${result[2]} )</p>
                    </div>
                `;
                counter++;
            }

            $('.wish-wrapper').html(html);
            $('.wish-wrapper-modal').html(html);
        });
    }
});
