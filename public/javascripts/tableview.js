// This javascript handles the requests to the Node.js server in order to render the table view
var main = require('main.js');
var myTable;
var myRows;

function getTableInfo(Table) {
  var requestURI = "Type=TableInfo&Table=" + Table
  main.get(requestURI, function (res) {
    // Here we need to add the header to the top of the page, and save the table json for later use
    myTable = res.Table;
  });
}

function requestRows(Table, Rows, startingID) {
  var requestURI = "Type=Rows&Table=" + Table + "&Rows=" + Rows + "startID=" + startingID
  main.get(requestURI, function (res) {
    // Here we need to add the rows to the 'maintable' item on the page
    // The rows need to be added after any existing rows
    myRows.add(res.Rows);
  });
}

function requestRow(Table, previousID) {
  var requestURI = "Type=Row&Table=" + Table + "&startID=" + previousID
  main.get(requestURI, function (res) {
    // Here we need to add the row to the 'maintable' item on the page
    // The row need to be added after any existing rows
    myRows.add(res.Row);
  });
}

function showSingleRecordView(id, isEdit) {
  // This will just render the single record modal
  var theRow = myRows.find(); // TODO - this needs to find the passed in ID
  // TODO - here we generate the modal for this row
  if (isEdit) {
    // if isEdit = 1, then this will be the single record edit page
  } else {

  }
}

function editColumn(columnid) {
  // this will change that entire column to editable fields

}

function saveRows(rows) {
  // this will send the row(s) json object to the Node.js server to be saved into Mongo
  main.put("Rows", rows, function (res) {
    // here we will get the 'success' or 'failure' response from the server and update the view accordingly
  });
}

function updateNumRecords() {
  // This will update the 'number of rows shown' count at the bottom of the table
  // if more rows are available, this should also have a 'show x more rows' button, or we could have this trigger on scroll fire
  var requestURI = "Type=NumRecords&TableName=" + myTable.tableName;
  main.get(requestURI, function (res) {

  });
}

function updateColumns() {
  // for when the user changes which columns they would like shown, we need to hide/show the correct columns
  
}