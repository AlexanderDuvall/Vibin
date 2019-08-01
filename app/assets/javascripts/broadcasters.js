function decrement(id) {
    Rails.ajax({
        url: "/decrement?id=" + id,
        type: "POST",
        processData: false,
        error: function (error) {
            console.log(error)
        }
    })
}

function increment(id) {
    Rails.ajax({
        url: "/increment?id=" + id,
        type: "POST",
        processData: false,
        error: function (error) {
            console.log(error)
        }
    })
}

