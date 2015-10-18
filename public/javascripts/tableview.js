// This javascript handles the requests to the Node.js server in order to render the table view

$("#tableSearchForm").submit(function (e) {
    e.preventDefault();
    return getTable();
});

var Table;
var rows;

function getTable() {
	var tablename = document.getElementById('tableSearchBox').value.toLowerCase();
	var mainDiv = $('#mainDiv');
	mainDiv.empty();
	
	$.getJSON('/request?Type=getTable&table=' + tablename + '&', function (data) {
		Table = data;
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
		var mainDiv = $('#mainDiv');
		mainDiv.empty();
		mainDiv.append(html);
		getTableRows();
	});
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
				var html = "<tr><td style='padding:0'><i class='material-icons'>remove_red_eye</i></td>";
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
						if (typeof row[column.name] == 'object') {
							html += "<i class='material-icons'>view_list</i>";
						} else {
							html += row[column.name];
						}
						html += "</td>";
					}
					else {
						html += "<td></td>";
					}
				}
				html += "</tr>";
				tableBody.append(html); // print this row to the screen
			}
		});
	}

}