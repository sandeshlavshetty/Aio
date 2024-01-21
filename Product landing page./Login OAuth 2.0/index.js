function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
   $("#name").text(profile.ngetName());
   $("#email").text(profile.getEmail());
   $("#image").attr('src',profile.getimageurl());
   $(".data").css("display","block");
   $(".g-signin2").css("display","none");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You Have Been Signed Out Successfully");
      $(".g-signin2").css("display","block");
      $(".data").css("display","none");
    });
  }