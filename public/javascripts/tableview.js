// This javascript handles the requests to the Node.js server in order to render the table view

$("#tableSearchForm").submit(function (e) {
    e.preventDefault();
    return getTable();
});

var Table;
var rows;
var modals = { "modals": [] };

function getTable() {
	var tablename = document.getElementById('tableSearchBox').value.toLowerCase();
	$('#mainDiv').empty();
	$("#tablenameHolder").empty();

	if (typeof Table == 'undefined') {
		getTableSub(tablename);
	} else if (Table == null) {
		getTableSub(tablename);
	} else {
		if (tablename == Table.tablename.toLowerCase()) {
			printHeader();
			getTableRows();
		} else {
			getTableSub(tablename);
		}
	}
}

function getTableSub(tablename) {
	$.getJSON('/request?Type=getTable&table=' + tablename + '&', function (data) {
		Table = data;
		if (typeof Table != 'undefined') {
			if (Table != null) {
				printHeader();
				getTableRows();
			}
		}
	});
}

function printHeader() {
	document.getElementById("tablenameHolder").innerHTML = " - " + Table.tablename;
	var html = "<table class='responsive-table striped'>";
	html += "<thead><tr class='header'><th class='header tooltipped' data-position='below' data-delay='700' data-tooltip='View'> </th>";
	if (checkPermission(Table.permission, "edit")) {
		html += "<th class='header tooltipped' data-position='below' data-delay='700' data-tooltip='Edit'> </th>";
		html += "<th class='header tooltipped' data-position='below' data-delay='700' data-tooltip='Delete'> </th>";
	}
	for (var i = 0; i < Table.columns.length; i++) {
		var column = Table.columns[i];
		if (checkPermission(column.permission, "view")) {
			if (typeof column.tooltip == 'undefined') {
				html += "<th class='header'>" + column.alias + "</th>";
			} else {
				html += "<th class='header tooltipped' data-position='below' data-delay='700' data-tooltip='" + column.tooltip + "'>" + column.alias + "</th>";
			}
		} else {
			Table.columns[i] = null;
			delete Table.columns[i];
		}
	}
	html += "</tr></thead><tbody id='mainTableBody'></tbody></table>";
	$('#mainDiv').empty().append(html);
}

function getTableRows() {
	if (typeof Table != 'undefined') {
		$.getJSON('/request?Type=getRows&table=' + Table.tablename + '&', function (data) {
			rows = data;
			// loop through each of the rows
			var tableBody = $('#mainTableBody');
			tableBody.empty();
			var canEdit = checkPermission(Table.permission, "edit");
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var id = "view" + Table.tablename + row._id;
				var modal = "<div id='" + id + "' class='modal'><div class='modal-content'><div class='row'>";
				var html = "<tr><td style='padding:0'><a href=\"javascript:writeAndOpenModal('" + id + "');\"><i class='material-icons'>remove_red_eye</i></a></td>";
				if (canEdit) {
					html += "<td style='padding:0'><i class='material-icons'>border_color</i></td>";
					html += "<td style='padding:0'><i class='material-icons'>delete</i></td>";
				}
				// find each column and print it
				for (var j = 0; j < Table.columns.length; j++) {
					var column = Table.columns[j];
					if (typeof row[column.name] != 'undefined') {
						// we have found the column, time to print it.
						html += "<td>";
						modal += "<div class='card grey lighten-4 col s6 m4 l3'><div class='card-content'><span class='card-title black-text'><b>" + column.alias + "</b></span>";
						if (typeof row[column.name] == 'object') {
							var subId = "view" + id + "_" + column.name;
							html += "<a href=\"javascript:writeAndOpenModal('" + subId + "');\"><i class='material-icons'>view_list</i></a>";
							modal += "<p><a href=\"javascript:writeAndOpenModal('" + subId + "');\"><i class='material-icons'>view_list</i></a><p>";
							addListModal(row[column.name], subId);
						} else {
							html += row[column.name];
							modal += "<p>" + row[column.name] + "</p>";
						}
						html += "</td>";
						modal += "</div></div>";
					}
					else {
						html += "<td></td>";
						modal += "<div class='card grey lighten-4 col s6 m4 l3'><div class='card-content'><span class='card-title black-text'><b>" + column.alias + "</b></span><p><br></p></div></div>";
					}
				}
				html += "</tr>";
				modal += "</div></div><div class='modal-footer'><a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat' onclick='document.getElementById(\"" + id + "\").remove();'>Back</a></div></div>";
				tableBody.append(html); // print this row to the screen
				modals['modals'].push({ "id": id, "modal": modal });
			}
		});
	}
}

function writeAndOpenModal(id) {
	var modalStorage = $('#modalStorage');
	var myModal;
	for (var i = 0; i < modals['modals'].length; i++) {
		if (modals['modals'][i]['id'] == id) {
			myModal = modals['modals'][i]['modal'];
			break;
		}
	}
	modalStorage.append(myModal);

	// write and append to modal storage

	$('#' + id).openModal();
}

function addListModal(obj, id) {
	var modal = "<div id='" + id + "' class='modal'><div class='modal-content'><div class='row'>";
	for (var key in obj) {
		modal += "<div class='card grey lighten-4 col s12 m12 l12'><div class='card-content'><span class='card-title black-text'><b>" + key + "</b></span>";
		modal += "<p>" + obj[key] + "</p></div></div>";
	}
	modal += "</div></div><div class='modal-footer'><a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat' onclick='document.getElementById(\"" + id + "\").remove();'>Back</a></div></div>";

	modals['modals'].push({ "id": id, "modal": modal });
}

function getTableSuggestions() {
	var search = document.getElementById('tableSearchBox').value.toLowerCase();

	$.getJSON('/request?Type=getAutoCompleteTables&search=' + search + '&', function (data) {
		$("#tableSearchBox").autocomplete({source:data});
	});
}