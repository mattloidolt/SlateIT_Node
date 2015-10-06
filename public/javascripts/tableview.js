// This javascript handles the requests to the Node.js server in order to render the table view
var request = require("request");
var url = "localhost";

function getTableInfo(Table) {
  var requestURL = url + "/request?Type=TableInfo&Table=" + Table
  request(requestURL, function (table, req, res) {
    // addHeaderIfNotExist(rows(0));
    // Here we need to add the rows to the 'maintable' item on the page
    // The rows need to be added after any existing rows
  });
}

function requestRows(Table, Rows, startingID) {
  var requestURL = url + "/request?Table=" + Table + "&Rows=" + Rows + "startID=" + startingID
  request(requestURL, function (rows, req, res) {
    // addHeaderIfNotExist(rows(0));
    // Here we need to add the rows to the 'maintable' item on the page
    // The rows need to be added after any existing rows
  });
}

function requestRow(Table, previousID) {
  var requestURL = url + "/request?Table=" + Table + "&startID=" + previousID
  request(requestURL, function (row, req, res) {
    addHeaderIfNotExist(row);
    // Here we need to add the rows to the 'maintable' item on the page
    // The rows need to be added after any existing rows
  });
}

function addHeaderIfNotExist(row) {
  //if (document.getElementById('tablehead') = "") {
    // Here we need to add the table header to the 'maintable'
  //}
}

function showSingleRecordView(row, isEdit) {
  // This will just render the single record modal
  // if isEdit = 1, then this will be the single record edit page as well
}

function editColumn(column) {
  // this will change that entire column to editable fields
}

function saveRows(req, res, rows) {
    // this will send the row(s) json object to the Node.js server to be saved into Mongo
}

function updateNumRecords() {
  // This will update the 'number of rows shown' count at the bottom of the table
  // if more rows are available, this should also have a 'show x more rows' button, or we could have this trigger on scroll fire
}

function updateColumns() {
  // for when the user changes which columns they would like shown, we need to hide/show the correct columns
}