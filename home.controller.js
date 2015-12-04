(function(){
    'use strict';
  
    angular.module('myMenuApp.controllers')

  .controller('HomeCtrl', [
        '$rootScope','$scope','$http','$q',
        '$log',
        '$state',
        '$timeout', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$location',
        'menu', '$interval', 'uiGridConstants', 'uiGridGroupingConstants','apiUrl',
        function ($rootScope, $scope, $http, $q, $log, $state, $timeout, $mdBottomSheet, $mdSidenav, $mdDialog, $location, menu, $interval, uiGridConstants, uiGridGroupingConstants, apiUrl) {
            this.userProject = '';
            var vm = this;
            this.userScorecard = '';
            this.projects = ('3215365 3215367 3615377').split(' ').map(function (project) { return { abbrev: project }; });// [];// GetProjects($rootScope.userid, $rootScope);//
            this.scorecards = [];// ('').split(' ').map(function (scorecard) { return { abbrev: scorecard }; });

            angular.element(document).ready(function () {
                $http.post(apiUrl + 'Projects/GetProjectListByUserId', $rootScope.userid, {
                    withCredentials: false
                }).success(function (data) {
                    $scope.vm.projects = data.map(function (project) { return { abbrev: project.ProjectNumber }; });// data;
                }).error(function (error) {
                    $scope.vm.projects = [];
                });
                 console.log('project loading completed');
           });

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
                $http.post(apiUrl + 'ProjectScoreCards/GetScorecardsListByProjectIdAndUserID', { p1: project, userid: $rootScope.userid }, {
                    withCredentials: false
                }).success(function (data) {
                    $scope.vm.scorecards = data.map(function (s) { return { abbrev: s.ScoreCardName }; });// data;
                }).error(function (error) {
                    $scope.vm.scorecards = [];
                });
                console.log('scorecards loading completed');
                //vm.scorecards = ('Piping Concrete Grouting').split(' ').map(function (scorecard) { return { abbrev: scorecard }; });
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
                //vm.projects = GetProjects($rootScope.userid);
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

            function GetProjects(userid) {
                    $http.post(apiUrl + 'Projects/GetProjectListByUserId', userid, {
                        withCredentials: false
                    }).success(function (data) {
                        return data;
                    }).error(function (error) {
                        return null;
                    });
            }
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
            $scope.saveRow = function (rowEntity) {
                var promise = $q.defer();
                $http.put(apiUrl + 'Scopes/PutScope', rowEntity).success(function () {
                    //$interval(function () {
                        promise.resolved();
                    //}, 3000, 1)
                }).error(promise.reject);

                $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

            };
            $scope.gridOptions.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;
                gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
            };

            $scope.gridOptions.rowIdentity = function (row) {
                return row.id;
            };
            $scope.gridOptions.getRowIdentity = function (row) {
                return row.id;
            };

            $scope.gridOptions.columnDefs = [];

            $scope.callsPending = 0;

            var i = 0;
            $scope.refreshData = function () {
                LoadData($scope.userProject, $scope.userScorecard);
            }

            $scope.scorecardChange = function (project, scorecard) {
                LoadData(project, scorecard);
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
            function getColumnDefsByData(data) {
                var ccd = new Array();
                data.forEach(function (row) {
                    if (/[a]\d{1,2}/.test( row['field'])) {
                        ccd.push({
                            field: row['field'],
                            displayName: row['displayName'],
                            enableCellEdit: true,
                            visible: row['visible'],
                            editableCellTemplate: '<div><form name="inputForm"><input type="number" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" min="0" max="100"></form></div>',
                            cellClass: function (grid, row, col, rowIndex, colIndex) {
                                var val = grid.getCellValue(row, col);
                                if (val == 100) {
                                    return 'green';
                                }
                                if (val > 0) {
                                    return 'yellow';
                                }

                                return 'pink';
                            }
                        });
                    }
                    else if (/[d]\d{1,2}/.test(row['field'])) {
                        ccd.push({
                            field: row['field'],
                            displayName: row['displayName'],
                            enableCellEdit: true,
                            editableCellTemplate: '<div><form name="inputForm"><input type="text" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" ng-maxlength="150" ></form></div>',
                            visible: row['visible']
                        });
                    } else {
                        ccd.push({
                            field: row['field'],
                            displayName: row['displayName'],
                            enableCellEdit: false,
                            visible: row['visible']
                        });
                    }
                });
                return ccd;
            };

            function LoadData(project, scorecard) {
                if (typeof project === "undefined" || typeof scorecard === "undefined") return;
                $scope.myData = [];
                var noColumns = true;
                var start = new Date();
                $http.post(apiUrl + 'Scopes/GetScoreCardViewColumnDef', { p1: project, p2: scorecard, userid: $rootScope.userid }, {
                    withCredentials: false
                }).success(function (data) {
                    $scope.gridOptions.columnDefs = getColumnDefsByData(data);

                }).error(function (error) {
                    $scope.gridOptions.columnDefs = [];
                });

                $http.post(apiUrl + 'Scopes/GetScorecardView', { p1: project, p2: scorecard, userid: $rootScope.userid }, {
                    withCredentials: false
                }).success(function (data) {

                    data.forEach(function (rr) {
                        rr.id = i;
                        i++;
                        rr.registered = new Date(rr.registered)
                        $scope.myData.push(rr);
                        $state.go('home.main.scorecard');
                    });
                }).error(function (error) {
                    $scope.myData = [];
                });
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
