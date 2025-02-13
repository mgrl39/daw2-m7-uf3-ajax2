var xhr;

function buscarComentario() {
	try {
		if (window.XMLHttpRequest)
			xhr = new XMLHttpRequest();
		else
			xhr = new ActiveXObject("Microsoft.XMLHttp");
	} catch (ex) {
		alert("Su navegador no soporta este objeto");
	}
	enviaPeticion();
}

function enviaPeticion() {
	var titulo = document.getElementById("titulo");
	if (titulo.selectedIndex == 0) {
		document.getElementById("comentario").innerHTML = "Sin comentario";
		return;
	}
	var tit = titulo.options[titulo.selectedIndex].value;
	xhr.open("GET", "ComentarioLibro?tit=" + tit, true);
	xhr.onreadystatechange = procesaDatos;
	xhr.send(null);
}

function procesaDatos() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var resp = xhr.responseXML;
		var libro = resp.getElementsByTagName("libro").item(0);

		// Recupera la coleccion de elementos hijo del libro
		var elementos = libro.childNodes;
		var textoHTML = "<table id='tabla' summary='descripcion y precio'>";

		// Genera la fila con los nombres de los elementos
		textoHTML += "<thead><tr>";
		for (var i = 0; i < elementos.length; i++) {
			textoHTML += "<th scope='col'>" + elementos.item(i).nodeName + "</th>";
		}
		textoHTML += "</tr></thead>";

		// Genera la fila con los datos del libro incluidos en el documento
		textoHTML += "<tbody><tr>";
		for (var i = 0; i < elementos.length; i++) {
			textoHTML += "<td>" + elementos.item(i).firstChild.nodeValue + "</td>";
		}
		textoHTML += "</tr></tbody></table>";
		document.getElementById("comentario").innerHTML = textoHTML;
	}
}

