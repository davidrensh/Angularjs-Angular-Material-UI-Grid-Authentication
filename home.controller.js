(function(){
    'use strict';
  
    angular.module('myMenuApp.controllers')

  .controller('HomeCtrl', [
        '$rootScope','$scope','$http',
        '$log',
        '$state',
        '$timeout', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$location',
        'menu', '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
        function ($rootScope, $scope,$http, $log, $state, $timeout, $mdBottomSheet, $mdSidenav, $mdDialog, $location, menu, $interval, uiGridConstants, uiGridGroupingConstants) {
            this.userProject = '';
            this.projects = ('3215365 3215367 3615377').split(' ').map(function (project) { return { abbrev: project }; });
            this.userScorecard = '';
            this.scorecards = ('').split(' ').map(function (scorecard) { return { abbrev: scorecard }; });

            var vm = this;
            var aboutMeArr = ['Family', 'Location', 'Lifestyle'];
            var budgetArr = ['Housing', 'LivingExpenses', 'Healthcare', 'Travel'];
            var incomeArr = ['SocialSecurity', 'Savings', 'Pension', 'PartTimeJob'];
            var advancedArr = ['Assumptions', 'BudgetGraph', 'AccountBalanceGraph', 'IncomeBalanceGraph'];

            //functions for menu-link and menu-toggle
            vm.isOpen = isOpen;
            vm.toggleOpen = toggleOpen;
            vm.autoFocusContent = false;
            vm.menu = menu;
            vm.showtop = true;
            //vm.showside = true;
            $scope.showside = true;
            $scope.showSearch = false;
            $scope.showtop = true;
            $scope.username = $rootScope.username;
            $scope.myDateStart = null;
            $scope.myDateEnd = null;

            $scope.startDateChange = function (startdate) {
                var d = new Date();
                $scope.myDateEnd = new Date(d.setDate(startdate.getDate() + 6));
            };

            $scope.projectChange = function (project) {
                vm.scorecards = ('Piping Concrete Grouting').split(' ').map(function (scorecard) { return { abbrev: scorecard }; });
            };

            $scope.logout = function () {
                $rootScope.isAuthenticated = false;
                $location.path('/login');
            };

            $scope.toggleSearch = function (element) {
                $scope.showSearch = !$scope.showSearch;
            };
            
            $scope.init = function () {
                angular.forEach(vm.menu.sections, function (value, key) {
                    toggleSection(value);
                });
                
            };

            $scope.toggle = function () {

                $mdSidenav('left').toggle().then(function(){
                    $scope.showside = true;
                });
            };
            $scope.close = function () {
                $mdSidenav('left').close().then(function(){
                    $scope.showside = false;
                });
            };
            $scope.showListBottomSheet = function ($event) {
                $scope.alert = '';
                $mdBottomSheet.show({
                    template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
                    controller: 'ListBottomSheetCtrl',
                    targetEvent: $event
                }).then(function (clickedItem) {
                    $scope.alert = clickedItem.name + ' clicked!';
                });
            };

            $scope.showAdd = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                    targetEvent: ev,
                })
                .then(function (answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.alert = 'You cancelled the dialog.';
                });
            };

            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            };
            vm.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            function isOpen(section) {
                return section.open;
                //return menu.isSectionSelected(section);
            }
            function isOpenX(section) {
                return section.open;
            }

            function toggleOpen(section) {
                menu.toggleSelectSection(section);
            }

            function toggleSection(section) {
                menu.toggleSection(section);
            }

            $scope.onlyWeekendsSunPredicate = function (date) {
                var day = date.getDay();
                return day === 0;
            };

            $scope.onlyWeekendsSatPredicate = function (date) {
                var day = date.getDay();
                return day === 6;
            };
            //grid start

            $scope.gridOptions = {};
            $scope.gridOptions.data = 'myData';
            $scope.gridOptions.enableColumnResizing = true;
            $scope.gridOptions.enableFiltering = true;
            $scope.gridOptions.enableGridMenu = true;
            $scope.gridOptions.showGridFooter = true;
            $scope.gridOptions.showColumnFooter = true;
            $scope.gridOptions.fastWatch = true;

            $scope.gridOptions.rowIdentity = function (row) {
                return row.id;
            };
            $scope.gridOptions.getRowIdentity = function (row) {
                return row.id;
            };

            $scope.gridOptions.columnDefs = //[];
                [
              { name: 'id', width: 50 },
              { name: 'name', width: 100 },
              { name: 'age', width: 100, enableCellEdit: true, aggregationType: uiGridConstants.aggregationTypes.avg, treeAggregationType: uiGridGroupingConstants.aggregation.AVG },
              { name: 'address.street', width: 150, enableCellEdit: true },
              { name: 'address.city', width: 150, enableCellEdit: true },
              { name: 'address.state', width: 50, enableCellEdit: true },
              { name: 'address.zip', width: 50, enableCellEdit: true },
              { name: 'company', width: 100, enableCellEdit: true },
              { name: 'email', width: 100, enableCellEdit: true },
              { name: 'phone', width: 200, enableCellEdit: true },
              { name: 'about', width: 300, enableCellEdit: true },
              { name: 'friends[0].name', displayName: '1st friend', width: 150, enableCellEdit: true },
              { name: 'friends[1].name', displayName: '2nd friend', width: 150, enableCellEdit: true },
              { name: 'friends[2].name', displayName: '3rd friend', width: 150, enableCellEdit: true },
              { name: 'agetemplate', field: 'age', width: 150, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' },
              { name: 'Is Active', field: 'isActive', width: 150, type: 'boolean' },
              { name: 'Join Date', field: 'registered', cellFilter: 'date', width: 150, type: 'date', enableFiltering: false },
              { name: 'Month Joined', field: 'registered', cellFilter: 'date:"MMMM"', filterCellFiltered: true, sortCellFiltered: true, width: 150, type: 'date' }
            ];

            $scope.callsPending = 0;

            var i = 0;
            $scope.refreshData = function () {
                $scope.myData = [];

                var start = new Date();
                var sec = $interval(function () {
                    $scope.callsPending++;

                    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
                      .success(function (data) {
                          $scope.callsPending--;

                          data.forEach(function (row) {
                              row.id = i;
                              i++;
                              row.registered = new Date(row.registered)
                              $scope.myData.push(row);
                          });
                      })
                      .error(function () {
                          $scope.callsPending--
                      });
                }, 200, 20);


                var timeout = $timeout(function () {
                    $interval.cancel(sec);
                    $scope.left = '';
                }, 2000);

                $scope.$on('$destroy', function () {
                    $timeout.cancel(timeout);
                    $interval.cancel(sec);
                });

            };
            $scope.scorecardChange = function (project, scorecard) {
                //$location.path('/scorecard');
                $scope.myData = [];
                var noColumns = true;
                var start = new Date();
                var sec = $interval(function () {
                    $scope.callsPending++;

                    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
                      .success(function (data) {
                          if (noColumns || $scope.gridOptions.columnDefs.count < 1) {
                              $scope.gridOptions.columnDefs = getColumnDefs(data[0]);
                              if (!$state.is('home.main.scorecard'))
                                  $state.go('home.main.scorecard');
                              noColumns = false;
                          }
                          $scope.callsPending--;

                          data.forEach(function (row) {
                              row.id = i;
                              i++;
                              row.registered = new Date(row.registered)
                              $scope.myData.push(row);
                          });
                      })
                      .error(function () {
                          $scope.callsPending--
                      });
                }, 200, 20);

                var timeout = $timeout(function () {
                    $interval.cancel(sec);
                    $scope.left = '';
                }, 2000);

                $scope.$on('$destroy', function () {
                    $timeout.cancel(timeout);
                    $interval.cancel(sec);
                });



            };
            //grid end
            function getColumnDefs(row) {
                var columnDefs = new Array();
                angular.forEach(row, function (value, key) {
                    columnDefs.push({
                        field: key,
                        displayName: key
                    });
                });
                return columnDefs;
            };
        }]);
})();
angular.module('myMenuApp.controllers').controller('SearchCtrl', SearchCtrlFn)
    .run(function ($rootScope, $state) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !$rootScope.isAuthenticated) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });

angular.module('myMenuApp.controllers').controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Share', icon: 'social:ic_share_24px' },
      { name: 'Upload', icon: 'file:ic_cloud_upload_24px' },
      { name: 'Copy', icon: 'content:ic_content_copy_24px' },
      { name: 'Print this page', icon: 'action:ic_print_24px' },
    ];

    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});
function SearchCtrlFn($timeout, $q) {
    var self = this;
    // list of `state` value/display objects
    self.states = loadAll();
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
              Sandra Adams, Brian Holt, \
              Trevor Hansen';
        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
};
