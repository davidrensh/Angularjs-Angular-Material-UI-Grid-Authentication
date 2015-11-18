(function(){
  'use strict';
  
  angular.module('common.services', []);
  angular.module('myMenuApp.controllers', ['common.directives', 'ngResource', 'ngMaterial','ngMessages', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping']);
  angular.module('common.directives', ['common.services']);
})();  
  