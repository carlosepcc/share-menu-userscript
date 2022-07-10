// ==UserScript==
// @name         SIGA Share Menu Userscript
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Este userscript añade botones para compartir el menú desde SIGA
// @author       carlosepcc,jesusfvb
// @match        https://alimentacion.uci.cu/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uci.cu
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var button = `<button style="
  margin:4px;
  padding:4px 8px;
  border-radius:2px;
  border:1px solid #0003;
  font-weight:700;
  color: #404040;
  width:10em;
  font-family: "Open Sans Semibold";
  font-size: 14px;" name="copy-button"/>Copiar</button>`;
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
    (item, index) => {
      item.insertAdjacentHTML("afterend", button);
    }
  );
  Array.from(document.getElementsByName("copy-button")).forEach((item) => {
    item.addEventListener("click", (event) => {
      let menu = event.target.parentElement.parentElement;
      const menuObj = getMenu(menu);
      let texto = getStringMenu(menuObj);
      texto = prettifyMenu(texto);
      navigator.clipboard.writeText(texto);
      item.insertAdjacentHTML(
        "afterend",
        "<span id='message' style='color:green;font-weight:bold'> Copiado</span>"
      );
      setTimeout(() => {
        document.getElementById("message").remove();
      }, 1000);
      console.log(texto);
    });
  });
})();
