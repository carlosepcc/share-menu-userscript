// ==UserScript==
// @name         SIGA Share Menu Userscript
// @namespace    http://tampermonkey.net/
// @version      1.9
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
    const userStyle = document.createElement("style")

    const notificationHidePosition = '-180px'
    const notificationShowPosition = '20px'
    userStyle.innerText = `
    .panel-flat{transition:0.5s}
    .panel-flat.panel-default-flat{cursor:pointer;}
    .panel-flat:hover{box-shadow:-2px 2px 8px 0 #0002;transform:translate(1px, 1px)}
    .notification-text{
      color:#000a;font:700 1.2em;
    }
    .panel-heading-flat>.actions{padding:4px}
    #notification{transition:0.5s;position:fixed;left:2px;bottom:${notificationHidePosition};
    z-index:1000;
    border:1px solid #0001;background:#fffa;backdrop-filter:blur(16px);
    box-shadow:-2px 2px 8px 0 #0005;min-width:20em;}
    #notification pre {
    resize:both;
    margin-top:12px;
    max-height:80px;
    overflow:auto;
    background:none;
    }
    .panel-flat{max-width:320px;} /*Para que no se solapen cuando el ancho del viewport es pequeño*/
    .actions{
    display:flex;
    flex-direction:column;
    }
    .share-container>*{flex-grow:1}
    .share-container:last-child{flex-grow: 2}
    .actions>.share-container{
      display:flex;
      justify-content: space-between;
  }
  .actions .btn {border:1px solid #fff2 }

    .notification-text::before{content:'✔ ';color:green;}
    details{color:#000c;}
    summary{font-weight:bold;width:100%}
    `
    document.head.appendChild(userStyle)
    var actionsContainer = `<div class=actions>
    <div class=share-container>
    <button class="btn btn-large btn-default btn-share" data-shareurl="https://api.whatsapp.com/send?text={text}" title="Compartir con WhatsApp"/>
    <svg width="24" height="100%">
    <path style="fill:#fff" d="m 12.000005,3.9999714 c -0.1926,0 -0.383065,0.010178 -0.572265,0.023437 -0.0237,0.00175 -0.04651,0.00194 -0.07031,0.00391 -2.8577999,0.22552 -5.2791533,1.9428 -6.5019534,4.375 -0.079116,0.1574499 -0.1596861,0.3152656 -0.2285162,0.4785156 -0.37451,0.8457003 -0.5782944,1.74204 -0.6152344,2.68164 -0.00162,0.03035 -0.00262,0.06135 -0.00391,0.0918 -0.00247,0.08976 -0.00646,0.179012 -0.00586,0.269532 -2.321e-4,0.02539 -0.00195,0.05073 -0.00195,0.07617 0,0.93022 0.1657181,1.819337 0.4550781,2.648438 0.11645,0.371679 0.2502294,0.746683 0.4121094,1.126953 0.40323,0.94731 0.454075,1.204793 0.390625,1.996093 -0.044209,0.55135 -0.1940394,1.114741 -0.3808594,1.431641 -0.16938,0.28738 -0.3046875,0.584666 -0.3046875,0.660156 0,0.23342 1.3473157,0.151313 2.5410151,-0.154297 1.3984,-0.35802 1.521369,-0.357817 2.667969,0.002 0.5245303,0.1646 1.1215753,0.252873 1.7968753,0.277343 0.02825,0.0014 0.05761,0.0028 0.08594,0.0039 0.0924,0.003 0.181844,0.0078 0.277344,0.0078 0.0078,0 0.01373,5.7e-5 0.02148,0 0.01231,5.5e-5 0.02478,0 0.03711,0 0.22339,0 0.443449,-0.01152 0.662109,-0.0293 1.9778,-0.14065 3.566394,-0.871468 4.996094,-2.298828 1.178,-1.176 1.908766,-2.627284 2.197266,-4.146485 0.02658,-0.13883 0.04706,-0.280545 0.06641,-0.421875 0.0117,-0.08676 0.02438,-0.172725 0.0332,-0.259765 0.01939,-0.18667 0.03067,-0.376057 0.03711,-0.566407 0.0014,-0.04797 0.0034,-0.09459 0.0039,-0.142578 6.94e-4,-0.04469 0.0039,-0.08994 0.0039,-0.134789 0,-4.3580002 -3.450397,-7.8778408 -7.779297,-7.9941408 -0.0336,-0.0015 -0.06786,-0.00142 -0.101562,-0.00195 -0.04,-5.828e-4 -0.07904,-0.00391 -0.119141,-0.00391 z m -2.4999999,4 c 0.8284269,0 1.4999999,0.6715729 1.4999999,1.4999999 0,0.5 0,1.4999997 -1,1.4999997 0,1 2.031563,2.945724 3,3 0,-1 1,-1 1.5,-1 0.828427,0 1.5,0.671573 1.5,1.5 0,0.828427 -0.671573,1.5 -1.5,1.5 l -0.560547,0 C 13.643144,15.993479 13.297749,15.884022 12.812505,15.707002 11.189558,15.114942 10.062848,14.164505 8.908208,12.414034 8.2356131,11.394351 8.003605,10.780696 8.000005,10.017549 l 0,-0.5175777 c 0,-0.828427 0.671573,-1.4999999 1.5000001,-1.4999999 z"/>
    </svg>
    </button>
    <button class="btn btn-large btn-default btn-share" data-shareurl="https://t.me/share/url?url= &text={text}" title="Compartir con Telegram"/>
    <svg width="100%" height="100%" viewBox="0 0 1000 1000">
      <path d="M226.328419,494.722069 C372.088573,431.216685 469.284839,389.350049 517.917216,369.122161 C656.772535,311.36743 685.625481,301.334815 704.431427,301.003532 C708.567621,300.93067 717.815839,301.955743 723.806446,306.816707 C728.864797,310.92121 730.256552,316.46581 730.922551,320.357329 C731.588551,324.248848 732.417879,333.113828 731.758626,340.040666 C724.234007,419.102486 691.675104,610.964674 675.110982,699.515267 C668.10208,736.984342 654.301336,749.547532 640.940618,750.777006 C611.904684,753.448938 589.856115,731.588035 561.733393,713.153237 C517.726886,684.306416 492.866009,666.349181 450.150074,638.200013 C400.78442,605.66878 432.786119,587.789048 460.919462,558.568563 C468.282091,550.921423 596.21508,434.556479 598.691227,424.000355 C599.00091,422.680135 599.288312,417.758981 596.36474,415.160431 C593.441168,412.561881 589.126229,413.450484 586.012448,414.157198 C581.598758,415.158943 511.297793,461.625274 375.109553,553.556189 C355.154858,567.258623 337.080515,573.934908 320.886524,573.585046 C303.033948,573.199351 268.692754,563.490928 243.163606,555.192408 C211.851067,545.013936 186.964484,539.632504 189.131547,522.346309 C190.260287,513.342589 202.659244,504.134509 226.328419,494.722069 Z" id="Path-3" fill="#FFFFFF"></path>
      </svg>
    </button>
    <button class="btn btn-large btn-default" name="copy-button" title="Copiar el texto modificado"/>Copiar</button>
</div>
<details open><summary class=btn>Texto modificado ◢</summary><pre class=menu-preview>Realice una acción para ver el texto modificado..</pre></details>

    </div>`;
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
        (item, index) => item.insertAdjacentHTML("afterend", actionsContainer)
    )
    function start (menuNode) {
        menuObj = getMenu(menuNode);
        texto = getStringMenu(menuObj);
        texto = prettifyMenu(texto);
        document.querySelectorAll('.menu-preview').forEach(element => element.innerText = texto)
    }
    var notificationElement = `<dialog open id=notification>
    <div>Acción realizada con éxito</div>
    <button onclick=parentNode.style.bottom='${notificationHidePosition}' style=float:right class="btn btn-large btn-default">OK</button>
    </dialog>`
    document.body.insertAdjacentHTML("beforeend",notificationElement)

    var notificationNode = document.getElementById("notification")

    function notificate(message = "Acción realizada con éxito"){
        notificationNode.firstElementChild.innerHTML = `<p class="notification-text">${message}</p>
       <pre>${texto ?? 'El texto está vacío'}</pre>`
        notificationNode.style.bottom = notificationShowPosition
        notificationNode.open = true;

        setTimeout(() => {
            notificationNode.style.bottom = notificationHidePosition
        }, 3000); //Ocultar la notificación automáticamente
    }
    function copyText(){
        navigator.clipboard.writeText(texto); //Copiar al portapapeles
        notificate('Copiado correctamente') //Notificar
        console.log(texto);
    }

    function shareText(urlTemplate){
        window.open(urlTemplate.replace('{text}',encodeURI(texto)))
    }


    document.body.addEventListener("click", e => notificationNode.style.bottom = notificationHidePosition)
    Array.from(document.getElementsByName("copy-button")).forEach(item => {
        item.addEventListener("click", event => {
            event.stopPropagation()
            start(event.target.parentElement.parentElement.parentElement.parentElement)
            copyText()
        });
    });
    Array.from(document.querySelectorAll(".btn-share")).forEach(item => {
        item.addEventListener("click", event => {
            event.stopPropagation()
            start(event.target.parentElement.parentElement.parentElement)
            shareText(item.dataset.shareurl)
        });
    });
    Array.from(document.querySelectorAll(".panel-flat")).forEach(item => {
        item.addEventListener("auxclick", event => {
            if (event.button == 1) {
                event.stopPropagation()
                start(item)
                copyText()
            }
        })
        item.title = "Haga click medio del ratón para copiar el texto modificado."

    });
})();
