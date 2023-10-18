window.addEventListener("load", function () {
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
});

validacija();
document.getElementById("forma").addEventListener("submit", function (event) {
  function validacija() {
    var validno = true;
    if (document.getElementById("cena").value.length < 3) {
      validno = false;
      document.getElementById("cena").classList.add("error");
      document.getElementById("cena").classList.remove("success");
    } else {
      document.getElementById("cena").classList.add("success");
      document.getElementById("cena").classList.remove("error");
    }
    return validno;
  }
});

document.getElementById("cena").addEventListener("keypress", function () {
  this.classList.remove("success");
  this.classList.remove("error");
});
