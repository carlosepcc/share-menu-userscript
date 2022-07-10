// ==UserScript==
// @name         SIGA Share Menu Userscript
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Este userscript añade botones para compartir el menú desde SIGA
// @author       carlosepcc,jesusfvb
// @match        https://alimentacion.uci.cu/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uci.cu
// @updateURL    https://raw.githubusercontent.com/carlosepcc/share-menu-userscript/main/share-menu-userscript.js
// @downloadURL  https://raw.githubusercontent.com/carlosepcc/share-menu-userscript/main/share-menu-userscript.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var button = `<button class="btn btn-large btn-default" style="
  margin:4px;" name="copy-button"/>
  Copiar
  </button>`;
  function getTableData(table) {
    return Array.from(table.querySelectorAll(".row>div:first-child>label")).map(
      (item) => item.innerText
    );
  }
  function getMenu(menuElement) {
    return {
      fecha: menuElement.querySelector("h2").innerText,
      desayuno: getTableData(menuElement.querySelector("table:nth-child(1)")),
      almuerzo: getTableData(menuElement.querySelector("table:nth-child(2)")),
      comida: getTableData(menuElement.querySelector("table:nth-child(3)")),
    };
  }
  function getStringMenu(menu) {
    return `${menu.fecha}

**Desayuno**
${menu.desayuno.join("\n")}

**Almuerzo**
${menu.almuerzo.join("\n")}

**Cena**
${menu.comida.join("\n")}

t.me/alimentacionuci
`;
  }

    var menuObj
    var texto

  function prettifyMenu(string) {
    const rules = [
      { s: /\./g, r: "" }, //Elimina todos los periods
      { s: /,/g, r: "   " },
      { s: /tme/g, r: "t.me" }, //Elimina todas las comas
      { s: /\s*\(\d.*\)/g, r: "" }, //Elimina todas las cadenas de cantidades del producto Ej:  "(50 g )"
      { s: / 50 g/g, r: "" }, // Elimina " 50 g" - Para la cadena "Pan 50 g"
      { s: /Lunes/g, r: "**LUNES**" },
      { s: /Martes/g, r: "**MARTES**" },
      { s: /Miércoles/g, r: "**MIÉRCOLES**" },
      { s: /Jueves/g, r: "**JUEVES**" },
      { s: /Viernes/g, r: "**VIERNES**" },
      { s: /Sábado/g, r: "**SÁBADO**" },
      { s: /Domingo/g, r: "**DOMINGO**" },

      { s: /\/\d+\n/g, r: "\n" }, //Borrar el año /<dígitos>\n
      { s: /\/07/g, r: " de julio" },
      { s: /\/08/g, r: " de agosto" },
      { s: /\/09/g, r: " de septiembre" },
      { s: /\/10/g, r: " de octubre" },
      { s: /\/11/g, r: " de noviembre" },
      { s: /\/12/g, r: " de diciembre" },
      { s: /\/01/g, r: " de enero" },
      { s: /\/02/g, r: " de febrero" },
      { s: /\/03/g, r: " de marzo" },
      { s: /\/04/g, r: " de abril" },
      { s: /\/05/g, r: " de mayo" },
      { s: /\/06/g, r: " de junio" },

      { s: /Vianda/g, r: "🥔   Vianda" },
      { s: /Arroz/g, r: "🍚   Arroz" },
      { s: /🍚   Arroz congris/g, r: "🍛   Arroz congris" },
      { s: /Huevo/g, r: "🥚   **Huevo**" },
      { s: /\*\*Huevo\*\* hervido/g, r: "**Huevo hervido**" },
      { s: /🥚   \*\*Huevo\*\* frito/g, r: "🍳   **Huevo frito**" },
      { s: /Pan/g, r: "🍔   Pan " },
      { s: /Sopa/g, r: "🥣   Sopa" },
      { s: /Potaje/g, r: "🥣   Potaje" },
      { s: /Caldosa/g, r: "🥘   Caldosa" },
      { s: /Boniat/g, r: "🥔   Boniat" },
      { s: /Picadillo/g, r: "🧆   **Picadillo**" },
      {
        s: /\*\*Picadillo\*\* de masa de chorizo/g,
        r: "**Picadillo de masa de chorizo**",
      },
      { s: /PBorrarollo/g, r: "🍗   **Pollo**" },
      { s: /Aporreado de pollo/g, r: "🍗   **Aporreado de pollo**" },
      { s: /\*\*Pollo\*\* asado/g, r: "**Pollo asado**" },
      { s: /\*\*Pollo\*\* frito/g, r: "**Pollo frito**" },
      { s: /Salchicha/g, r: "🌭   **Salchicha**" },
      { s: /Perr/g, r: "🌭   Perr" },
      { s: /Mermelada/g, r: "🍯   Mermelada" },
      { s: /Refresco/g, r: "🥃   Refresco" },
      { s: /Calabaza/g, r: "🎃   Calabaza" },
      { s: /Chorizo/g, r: "🥩️   **Chorizo**" },
      { s: /Ropa vieja/g, r: "🥩️   **Ropa vieja**" },
      { s: /Mayonesa/g, r: "🧈   Mayonesa" },
      { s: /Pasta/g, r: "🧈   Pasta" },
      { s: /Palitroques/g, r: "🥖   Palitroques" },
      { s: /Plátano/g, r: "🍌   Plátano" },
      { s: /Fufú/g, r: "🍌   Fufú" },
      { s: /Jamonada/g, r: "🥩️   **Jamonada**" },
      { s: /Jamón/g, r: "🥩️   **Jamón**" },
      { s: /Mortadella/g, r: "🥩️   **Mortadella**" },
      { s: /Cerdo/g, r: "🥩️   **Cerdo**" },
      { s: /\*\*Cerdo\*\* guisado/g, r: "**Cerdo guisado**" },
      { s: /Hamburguesa/g, r: "🍘   **Hamburguesa**" },
      { s: /Dulce/g, r: "🥐   Dulce" },
      { s: /Melón/g, r: "🍉️   Melón" },
      { s: /Mango/g, r: "🥭   Mango" },
      { s: /Piña/g, r: "🍍   Piña" },
    ];

    rules.forEach((rule) => {
      string = string.replace(rule.s, rule.r);
    });

    return string;
  }
  Array.from(document.getElementsByClassName("panel-title-flat")).forEach(
          (item, index) => item.insertAdjacentHTML("afterend", button)
      )
  function start (menuNode) {
      menuObj = getMenu(menuNode);
      texto = getStringMenu(menuObj);
      texto = prettifyMenu(texto);
  }
    var notificationElement = `<dialog open id=notification
    style="transition:0.5s;top:-180px;
    z-index:9;position:fixed;
    border:1px solid #0001;background:#fffa;backdrop-filter:blur(16px);
    box-shadow:0 0 300px 0 #000;min-width:20em;
    ">
    <p>Acción realizada con éxito</p>
    <button onclick=parentNode.style.top='-180px' style=float:right class="btn btn-large btn-default">OK</button>
    </dialog>`
    document.body.insertAdjacentHTML("beforeend",notificationElement)

    var notificationNode = document.getElementById("notification")
    function notificate(message = "Acción realizada con éxito"){
notificationNode.firstElementChild.innerHTML = `<p style="
color:#000a;
font:900 1.2em ;
">${message}</p>
<pre style="max-height:80px;overflow:auto;background:none;">${texto ?? 'El texto está vacío'}</pre>`
        notificationNode.style.top = "60px"
        notificationNode.open = true;

      setTimeout(() => {
        notificationNode.style.top = "-180px"
      }, 5000); //Ocultar la notificación automáticamente
    }
    function copyText(){
      navigator.clipboard.writeText(texto); //Copiar al portapapeles
      notificate('Copiado correctamente') //Notificar
      console.log(texto);
    }

  Array.from(document.getElementsByName("copy-button")).forEach(item => {
    item.addEventListener("click", event => {
        event.stopPropagation()
        start(event.target.parentElement.parentElement)
        copyText()
    });
  });
    Array.from(document.querySelectorAll(".panel-flat")).forEach(item => {
    item.addEventListener("click", event => {
        event.stopPropagation()
        start(item)
        copyText()
    });
  });
})();
