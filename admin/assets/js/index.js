
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})



if(window.location.pathname == "/admin/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url" : `https://moviehub01.herokuapp.com/admin/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}