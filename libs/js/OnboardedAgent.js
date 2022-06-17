$('#loader').removeClass('hidden');
fetch(URL.baseUrl + '/OnboardedAgent/1').then(response => response.json())
       .then((completedata) => {
         $('#loader').addClass('hidden');
         $.jqPaginator('#pagination1', {
            totalPages: Math.ceil(completedata.total_rows/10),         
            visiblePages: Math.ceil(completedata.total_rows/10),
            currentPage: 1,
            prev: '<li class="page-item "><span class="page-link"><a href="javascript:;">Previous</a></span></li>',
            next: '<li class="page-item"><span class="page-link"><a href="javascript:;">Next</a></span></li>',
            page: '<li class="page-item" aria-current="page" id="page{{page}}"><span class="page-link"><a href="javascript:;">{{page}}</a></span></li>',
            onPageChange: function (num, type) {
            $("#page"+num).addClass('active');  
            if(type=="change")
            {
               $('#loader').removeClass('hidden');
               fetch(URL.baseUrl + '/OnboardedAgent/'+num).then(response => response.json())
               .then((NewData) => {
                 $('#loader').addClass('hidden');
                  OnboardedAgentData(NewData.data);
               }).catch((err) => {
                  location.href = "/Error";
            });
            }
            else 
            {
               OnboardedAgentData(completedata.data);
            } 
            }
         });
       }).catch((err) => {
         location.href = "/Error";
}).catch((err) => {
   location.href = "/Error";
});
function OnboardedAgentData(data){
   $("#ESData tr").remove();
   $.each(data, function (key, row) {
      $('#ESData').append('<tr data-toggle="collapse" data-target="#' + row.user_id + '" class="accordion-toggle">' +
         '<td>' + row.user_id + '</td>' +
         '<td>' + row.user_name + '</td>' +
         '<td>' + row.onboarding_date + '</td>' +
         '<td>' + row.expiration_date + '</td>' +
         '<td><a data-toggle="collapse" data-target="#' + row.user_id + '"class="accordion-toggle">View  ' +
         '<i class="fa fa-fw fas fa-angle-down"></i></a></td>' +
         '<td>' + row.status + '</td></tr>' +
         '<tr class="p"><td colspan="6" class="hiddenRow">' +
         '<div class="accordian-body collapse p-3" id="' + row.user_id + '">' +
         '<div class="row"><div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 col-lg-6 col-md-6 col-sm-12 col-12">' +
         '<div class="card"><div class="card-header"><h6 class="card-title mb-2">Face Scan</h6>' +
         '<div class="card-body"><img class="img-fluid" src="data:image/png;base64,' + row.facial_img + '" alt="Card image cap">' +
         '</div></div></div></div></div></div></td></tr>');
   });
}
if ($("#logged_in_user_role").val() == "") {
    location.href = "/login.html";
 }
 if ($("#logged_in_user_role").val() == "super admin") {
    $("#ConfigurationsMenu").show();
 } else {
    $("#ConfigurationsMenu").hide();
 }
 
 function LogOut() {
    $("#logged_in_user_role").val("");
    location.href = "/LogOut";
 }
 var OnboardedAgentDataVal={};
 jQuery(function ($) {
    var path = window.location.href;
    $('.nav-link').each(function () {
       if (this.href === path) {
          $(this).addClass('active');
       }
    });
    $('#FormOnboard').on('submit', function (e) {
       $('#loader').removeClass('hidden')
       e.preventDefault();
       var data = {
          fname: $('#fname').val(),
          fstatus: $('#fstatus').val(),
          pageNo:1
       }
       var csrf_token = $("#csrf_token").val();
       $.ajax({
          type: "POST",
          url: URL.baseUrl + '/FilterOnboardedAgent',
          beforeSend: function (request) {
             request.setRequestHeader("X-CSRFToken", csrf_token);
          },
          data: data,
          success: function (data) {
            OnboardedAgentDataVal = JSON.parse(data);
             $('#loader').addClass('hidden');
             if(OnboardedAgentDataVal.length > 0 || OnboardedAgentDataVal.total_rows > 0)
             {
               $.jqPaginator('#pagination1', {
                totalPages: Math.ceil(OnboardedAgentDataVal.total_rows/10),         
                visiblePages: Math.ceil(OnboardedAgentDataVal.total_rows/10),
                currentPage: 1,
                prev: '<li class="page-item "><span class="page-link"><a href="javascript:;">Previous</a></span></li>',
                next: '<li class="page-item"><span class="page-link"><a href="javascript:;">Next</a></span></li>',
                page: '<li class="page-item" aria-current="page" id="page{{page}}"><span class="page-link"><a href="javascript:;">{{page}}</a></span></li>',
                onPageChange: function (num, type) {
                $("#page"+num).addClass('active');  
                if(type=="change")
                {
                    $('#loader').removeClass('hidden');
                    var data = {
                     fname: $('#fname').val(),
                     fstatus: $('#fstatus').val(),
                     pageNo:num
                   }
                   var csrf_token = $("#csrf_token").val();
                   $.ajax({
                      type: "POST",
                      url: URL.baseUrl + '/FilterOnboardedAgent',
                      beforeSend: function (request) {
                         request.setRequestHeader("X-CSRFToken", csrf_token);
                      },
                      data: data,
                      success: function (data) {
                      $('#loader').addClass('hidden');
                      OnboardedAgentDataVal = JSON.parse(data);
                      OnboardedAgentData(OnboardedAgentDataVal.data);
                      }
                   })
                }
                else 
                {
                  OnboardedAgentData(OnboardedAgentDataVal.data)
                } 
                }
             });
             }
             else
             {
                $("#AgentsData tr").remove();
             }
          },
          failure: function () {
            location.href = "/Error";
          }
       });
    });
 
 });
 
 function trcontent() {
 
 }
 
 function navigate1() {
    location.href = "/";
 }
 
 function navigate2() {
    location.href = "/agentdetails_home";
 }
 
 function navigate2() {
    location.href = "";
 }
 
 function navigate4() {
    location.href = "/user_management";
 }
 
 function navigate5() {
    location.href = "/violation_management";
 }
 
 function navigate6() {
    location.href = "/configuration";
 }