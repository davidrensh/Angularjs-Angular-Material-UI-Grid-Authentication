(function(){

'use strict';

  angular.module('common.services')
  .factory('menu', [
      '$location',
      '$rootScope',
      function ($location) {

          var sections = [{
              name: 'Forman Work',
              type: 'toggle',
              pages: [{
                  name: 'Scorecard',
                  type: 'link',
                  state: 'home.main.scorecard',
                  icon: 'fa fa-group'
              }, {
                  name: 'ImportMC2',
                  state: 'home.main.porters',
                  type: 'link',
                  icon: 'fa fa-map-marker'
              },
                {
                    name: 'WeeklyProgress',
                    state: 'home.main.wheat',
                    type: 'link',
                    icon: 'fa fa-plus'
                }
                ,
                {
                    name: 'OutOfScope',
                    state: 'home.main.outofscope',
                    type: 'link',
                    icon: 'fa fa-plus'
                }
              ]
          }];

        sections.push({
          name: 'Management',
          type: 'toggle',
          pages: [{
              name: 'Project Setting',
            type: 'link',
            state: 'munchies.cheetos',
            icon: 'fa fa-group'
          }, {
              name: 'General Setting',
            state: 'munchies.bananachips',
            type: 'link',
            icon: 'fa fa-map-marker'
          },
            {
                name: 'Tools',
              state: 'munchies.donuts',
              type: 'link',
              icon: 'fa fa-map-marker'
            },
            {
                name: 'Reports',
                state: 'munchies.donuts',
                type: 'link',
                icon: 'fa fa-map-marker'
            },
            {
                name: 'History',
                state: 'munchies.donuts',
                type: 'link',
                icon: 'fa fa-map-marker'
            }
          ]
        });

        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function (section) {
            return self.openedSection === section;
          },

          selectPage: function (section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
          }
        };

        function sortByHumanName(a, b) {
          return (a.humanName < b.humanName) ? -1 :
            (a.humanName > b.humanName) ? 1 : 0;
        }

      }]);
      
})();