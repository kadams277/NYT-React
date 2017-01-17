// Include React
var React = require("react");

// Here we include all of the sub-components
var Saved = require("./Saved.js");
var Search = require("./Search.js");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the address
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div class="container">

  {<!-- Jumbotron for Title -->}
  <div class="jumbotron" style="background-color: #20315A ; color: white;">
    <h1 class="text-center"><strong><i class="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
  </div>

  {<!-- Row for Searching New York Times -->}
  <div class="row">
    <div class="col-sm-12">
    <br>
      {<!-- First panel is for handling the search parameters -->}
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title"><strong><i class="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
        </div>
        <div class="panel-body">

          {<!-- Here we create an HTML Form for handling the inputs-->}
          <form role="form">

              {<!-- Here we create the text box for capturing the search term-->}
            <div class="form-group">
              <label for="search">Search Term:</label>
              <input type="text" class="form-control" id="searchTerm">
            </div>

            {<!-- Here we capture the number of records that the user wants to retrieve  -->}
            <div class="form-group">
              <label for="pwd">Number of Records to Retrieve:</label>
            <select class="form-control" id="numRecordsSelect">
              <option value=1>1</option>
              {<!-- Setting the option for 5 as default -->}
              <option value=5 selected>5</option>
              <option value=10>10</option>
            </select>       
            </div>

              {<!-- Here we capture the Start Year Parameter-->}
            <div class="form-group">
              <label for="startYear">Start Year (Optional):</label>
              <input type="text" class="form-control" id="startYear">
            </div>

              {<!-- Here we capture the End Year Parameter -->}
            <div class="form-group">
              <label for="endYear">End Year (Optional):</label>
              <input type="text" class="form-control" id="endYear">
            </div>

            {<!-- Here we have our final submit button -->}
            <button type="submit" class="btn btn-default" id="runSearch"><i class="fa fa-search"></i> Search</button>
              <button type="button" class="btn btn-default" id="clearAll"><i class="fa fa-trash"></i> Clear Results</button>

          </form>
        </div>
      </div>
    </div>
  </div>

  {<!-- This row will handle all of the retrieved articles -->}
  <div class="row">
    <div class="col-sm-12">
    <br>

      {<!-- This panel will initially be made up of a panel and wells for each of the articles retrieved -->}
      <div class="panel panel-primary">

        {<!-- Panel Heading for the retrieved articles box -->}
        <div class="panel-heading">
          <h3 class="panel-title"><strong><i class="fa fa-table"></i>   Top Articles</strong></h3>
        </div>

        {<!-- This main panel will hold each of the resulting articles -->}
        <div class="panel-body" id="wellSection">
        </div>
      </div>
    </div>
  </div>

  {<!-- Footer Region -->}
  <div class="row">
    <div class="col-sm-12">
      
      {<!-- Line Break followed by closing -->}
      <hr>
      <h5 class="text-center"><small>Made by Ahmed with lots and lots of <i class="fa fa-heart"></i></small></h5>

    </div>
  </div>

</div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
