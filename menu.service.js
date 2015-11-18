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
              open: true,
              pages: [{
                  name: 'Scorecard',
                  type: 'link',
                  state: 'home.main.scorecard',
                  icon: 'fa fa-pencil-square-o'
              }, {
                  name: 'ImportMC2',
                  state: 'home.main.porters',
                  type: 'link',
                  icon: 'fa fa-plus'
              },
                {
                    name: 'WeeklyProgress',
                    state: 'home.main.wheat',
                    type: 'link',
                    icon: 'fa fa-calendar'
                }
                ,
                {
                    name: 'OutOfScope',
                    state: 'home.main.outofscope',
                    type: 'link',
                    icon: 'fa fa-undo'
                }
              ]
          }];

        sections.push({
          name: 'Management',
          type: 'toggle',
          open: true,
          pages: [{
              name: 'Project Setting',
            type: 'link',
            state: 'munchies.cheetos',
            icon: 'fa fa-cog'
          }, {
              name: 'General Setting',
            state: 'munchies.bananachips',
            type: 'link',
            icon: 'fa fa-cogs'
          },
            {
                name: 'Tools',
              state: 'munchies.donuts',
              type: 'link',
              icon: 'fa fa-wrench'
            },
            {
                name: 'Reports',
                state: 'munchies.donuts',
                type: 'link',
                icon: 'fa fa-newspaper-o'
            },
            {
                name: 'History',
                state: 'munchies.donuts',
                type: 'link',
                icon: 'fa fa-history'
            }
          ]
        });

        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
              section.open = !section.open;
              self.openedSection = (self.openedSection === section ? null : section);
              
          },

          toggleSection: function (section) {
              if (section.open == null) section.open = true;
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