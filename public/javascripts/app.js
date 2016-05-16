var app = angular.module("app", ['chart.js'])

.controller("StockCtrl", function($scope,$http){
    
    $scope.stockcode = "FLWS";
    $scope.labels = ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"];
    $scope.data = [];
    $scope.series = [];
 
    //format data for chart.js
    var formatStockData = function(stock){
        
        var stockData = {}
        
        var name = stock.dataset.name.split("P")[0];
        
        var close = stock.dataset.data.map(function(arr){
            return arr[1];
        });
        
        stockData.name = name.split("Prices")[0];
        stockData.close = close;
        
        return stockData;
    };
    
    $scope.fetch = function (){
     $http.get("https://www.quandl.com/api/v3/datasets/WIKI/" + $scope.stockcode + ".json?start_date=2003-12-31s&exclude_column_names=true&column_index=4&collapse=annual&&transform=cumul&order=asc&api_key=BfbsjCp6F1tzQxAn5e6x")
      .then(function(res){
          $scope.error = "";
          $scope.data.push(formatStockData(res.data).close);
          $scope.series.push(formatStockData(res.data).name);
      }, function(res){
          if(res.status === 404){
              $scope.error = "Incorrect Stock Code";
          } else {
              $scope.error = res.statusText;
          }
      });   
    };
    
})


