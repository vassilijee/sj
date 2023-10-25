window.addEventListener("load", function () {
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim

  document.getElementById("forma").addEventListener("submit", function (event) {
    var validno = true;
    if (document.getElementById("cena").value.length < 3) {
      validno = false;
      document.getElementById("cena").classList.add("error");
      document.getElementById("cena").classList.remove("success");
    } else {
      document.getElementById("cena").classList.add("success");
      document.getElementById("cena").classList.remove("error");
    }

    var spanovi = document.querySelectorAll("#oprema > span.badge");
    var niz = [];
    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }
    alert(niz);
    var input = document.getElementById("oprema-input");
    input.value = niz;

    return validno;
  });

  document
    .getElementById("dodaj-oprema")
    .addEventListener("click", function () {
      var id = document.getElementById("spisak-opreme").value;
      if (!id) {
        alert("Izaberi opremu");
        return;
      }
      dodajOpremu(id);
    });

  document.getElementById("cena").addEventListener("keypress", function () {
    this.classList.remove("success");
    this.classList.remove("error");
  });
});

function dodajOpremu(id) {
  var naziv = document.querySelector(
    `#spisak-opreme > option[value='${id}']`
  ).innerHTML;

  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  span.innerHTML = naziv;

  var button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-default");
  button.classList.add("btn-sm");
  button.innerHTML = "X";

  span.appendChild(button);

  document.getElementById("oprema").appendChild(span);

  document.getElementById("oprema").appendChild(document.createTextNode(" "));

  document.querySelector(
    `#spisak-opreme > option[value='${id}']`
  ).disabled = true;

  document.getElementById("spisak-opreme").selectedIndex = 0;

  button.addEventListener("click", function () {
    var id = this.parentNode.dataset.id;
    this.parentNode.parentNode.removeChild(this.parentNode);
    document.querySelector(
      `#spisak-opreme > option[value='${id}']`
    ).disabled = false;
  });
}
