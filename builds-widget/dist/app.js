(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],2:[function(require,module,exports){
module.exports = require('cssify');
},{"cssify":1}],3:[function(require,module,exports){
module.exports = Immutable.fromJS({
  status: {
    pending: {
      text: 'Pending',
      iconsPalette: ['ellipsis-h', 'ellipsis-h', 'ellipsis-h'],
    },
    running: {
      text: 'Running',
      iconsPalette: ['refresh', 'refresh', 'refresh'],
    },
    success: {
      text: 'Running',
      iconsPalette: ['check-circle-o', 'check', 'check-square'],
    },
    error: {
      text: 'Failed',
      iconsPalette: ['times-circle-o', 'exclamation', 'times-circle'],
    }
  },
  states: [{
    type: 'build',
    text: 'Build',
  }, {
    type: 'unit',
    text: 'Unit Test',
  }, {
    type: 'functional',
    text: 'Functional Test',
  }]
});

},{}],4:[function(require,module,exports){
module.exports = function() {
  angular.module('app')
    .constant('buildValues', require('./builds-values'));
};
},{"./builds-values":3}],5:[function(require,module,exports){
module.exports = "<table class=\"table directive-builds-list\">\n    <thead>\n        <tr>\n            <th>Changelist</th>\n            <th>Owner</th>\n            <th>Time Started</th>\n            <th ng-repeat=\"possibleState in possibleStates.toArray()\">{{possibleState.get('text')}}</th>\n            <th>Status</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr ng-click=\"expandOrCollapse(build)\" ng-repeat-start=\"build in parsedBuilds.toArray()\" class=\"status-{{build.get('status')}} build-{{build.get('isExpanded') ? 'expanded' : 'collapsed'}}\">\n            <td class=\"colored\">{{build.get('changelist')}}</td>\n            <td class=\"colored\">{{build.get('owner')}}</td>\n            <td class=\"colored\">{{build.get('started_on_date')}}\n                <clock-time timestamp=\"build.get('started_on')\"></clock-time>\n            </td>\n            <td ng-repeat=\"possibleState in possibleStates.toArray()\" class=\"colored progress-cell\">\n                <state-display cell-state=\"possibleState\" build=\"build\"></state-display>\n            </td>\n            <td rowspan=\"{{build.get('isExpanded') ? 2 : 1}}\" class=\"status-text\">\n                <i class=\"fa fa-{{build.get('status_icon')}}\"></i> {{build.get('status_text')}}\n            </td>\n        </tr>\n        <tr ng-click=\"expandOrCollapse(build)\" ng-if=\"build.get('isExpanded')\" ng-repeat-end>\n            <td colspan=\"{{3 + possibleStates.toArray().length}}\">\n                <expanded-build build=\"build\"></expanded-build>\n            </td>\n        </tr>\n    </tbody>\n</table>\n";

},{}],6:[function(require,module,exports){
require('./builds-list.scss');

module.exports = /*@ngInject*/ ["Build", "buildValues", function(Build, buildValues) {
  return {
    restrict: 'E',
    scope: {
      builds: '='
    },
    template: require('./builds-list.html'),
    controller: function($scope) {
      $scope.parsedBuilds = [];

      $scope.possibleStates = buildValues.get('states');

      $scope.expandOrCollapse = expandOrCollapse;

      $scope.$watch('builds', buildWatch);

      function buildWatch() {
        if ($scope.builds) {
          $scope.parsedBuilds = $scope.builds.map(function(build) {
            var startedOn = moment.unix(build.get('started_on'));
            var status = buildValues.getIn(['status', build.get('status')]);
            return build.merge({
              'started_on_date': startedOn.format('M/D/YYYY'),
              'status_text': status.get('text'),
              'status_icon': status.get('iconsPalette').get(0),
              'isExpanded': false
            });
          });
        }
      }

      function expandOrCollapse(build) {
        var buildIndex = $scope.parsedBuilds.indexOf(build);
        var newBuild = build.set('isExpanded', !build.get('isExpanded'));

        if (newBuild.get('isExpanded')) {
          Build.get(newBuild.get('changelist')).then(function(build) {
            newBuild = newBuild.set('expandedData', build);
            $scope.parsedBuilds = $scope.parsedBuilds.set(buildIndex, newBuild);
            $scope.$applyAsync();
          });
        } else {
          $scope.parsedBuilds = $scope.parsedBuilds.set(buildIndex, newBuild);
        }
      }
    }
  };
}];

},{"./builds-list.html":5,"./builds-list.scss":7}],7:[function(require,module,exports){
module.exports = require('sassify')('.directive-builds-list {   border: solid 1px #ddd;   transition: linear .3s all; }   .directive-builds-list td,   .directive-builds-list th {     background-color: #fff;     text-align: center; }   .directive-builds-list tbody td {     cursor: pointer;     padding: 10px 0 !important;     vertical-align: middle !important; }   .directive-builds-list:hover {     box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1); }   .directive-builds-list th {     height: 80px;     vertical-align: middle !important; }   .directive-builds-list td.progress-cell {     height: 80px;     overflow: hidden; }   .directive-builds-list tr {     border-left-color: #ccc;     border-left-style: solid;     border-left-width: 5px; }     .directive-builds-list tr.build-expanded.status-success td.colored {       box-shadow: inset 0 7px 0px -2px #1ab394; }     .directive-builds-list tr.build-collapsed.status-success {       border-left-color: #1ab394; }     .directive-builds-list tr.status-success td.status-text {       color: #1ab394; }     .directive-builds-list tr.build-expanded.status-running td.colored {       box-shadow: inset 0 7px 0px -2px #2087c6; }     .directive-builds-list tr.build-collapsed.status-running {       border-left-color: #2087c6; }     .directive-builds-list tr.status-running td.status-text {       color: #2087c6; }     .directive-builds-list tr.build-expanded.status-pending td.colored {       box-shadow: inset 0 7px 0px -2px #f7ab57; }     .directive-builds-list tr.build-collapsed.status-pending {       border-left-color: #f7ab57; }     .directive-builds-list tr.status-pending td.status-text {       color: #f7ab57; }     .directive-builds-list tr.build-expanded.status-error td.colored {       box-shadow: inset 0 7px 0px -2px #eb3e50; }     .directive-builds-list tr.build-collapsed.status-error {       border-left-color: #eb3e50; }     .directive-builds-list tr.status-error td.status-text {       color: #eb3e50; }     .directive-builds-list tr.build-expanded td.status-text {       background-color: #f7f7f7;       border-left: solid 1px #ccc; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvYnVpbGRzLWxpc3QvYnVpbGRzLWxpc3Quc2NzcyIsCgkic291cmNlcyI6IFsKCQkic3JjL2RpcmVjdGl2ZXMvYnVpbGRzLWxpc3QvYnVpbGRzLWxpc3Quc2NzcyIsCgkJInNyYy9jb25zdGFudHMvY29sb3JzLnNjc3MiCgldLAoJInNvdXJjZXNDb250ZW50IjogWwoJCSJAaW1wb3J0ICdjb25zdGFudHMvY29sb3JzJztcblxuLmRpcmVjdGl2ZS1idWlsZHMtbGlzdCB7XG4gIGJvcmRlcjogc29saWQgMXB4ICNkZGQ7XG4gIHRyYW5zaXRpb246IGxpbmVhciAuM3MgYWxsO1xuICB0ZCxcbiAgdGgge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIHRib2R5IHRkIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZzogMTBweCAwICFpbXBvcnRhbnQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xuICB9XG4gICY6aG92ZXIge1xuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xKTtcbiAgfVxuICB0aCB7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcbiAgfVxuICB0ZC5wcm9ncmVzcy1jZWxsIHtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuICBAbWl4aW4gY29sb3JlZCgkc3RhdHVzLCAkY29sb3IpIHtcbiAgICAmLmJ1aWxkLWV4cGFuZGVkIHtcbiAgICAgICYuc3RhdHVzLSN7JHN0YXR1c30gdGQuY29sb3JlZCB7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgN3B4IDBweCAtMnB4ICRjb2xvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgJi5idWlsZC1jb2xsYXBzZWQge1xuICAgICAgJi5zdGF0dXMtI3skc3RhdHVzfSB7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAkY29sb3I7XG4gICAgICB9XG4gICAgfVxuICAgICYuc3RhdHVzLSN7JHN0YXR1c30ge1xuICAgICAgdGQuc3RhdHVzLXRleHQge1xuICAgICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0ciB7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICNjY2M7XG4gICAgYm9yZGVyLWxlZnQtc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1sZWZ0LXdpZHRoOiA1cHg7XG4gICAgQGVhY2ggJHN0YXRlLWNvbG9ycy1wYWlyIGluICRzdGF0ZS1jb2xvcnMtcGFpcnMge1xuICAgICAgQGluY2x1ZGUgY29sb3JlZChudGgoJHN0YXRlLWNvbG9ycy1wYWlyLCAxKSwgbnRoKCRzdGF0ZS1jb2xvcnMtcGFpciwgMikpO1xuICAgIH1cbiAgICAmLmJ1aWxkLWV4cGFuZGVkIHtcbiAgICAgIHRkLnN0YXR1cy10ZXh0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGxpZ2h0LWdyZXk7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggI2NjYztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsCgkJIiR3YXJuaW5nLWNvbG9yOiAjZjdhYjU3O1xuJHN1Y2Nlc3MtY29sb3I6ICMxYWIzOTQ7XG4kZXJyb3ItY29sb3I6ICNlYjNlNTA7XG4kcnVubmluZy1jb2xvcjogIzIwODdjNjtcbiRsaWdodC1ncmV5OiAjZjdmN2Y3O1xuJHN0YXRlLWNvbG9ycy1wYWlyczogKFxuICAoJ3N1Y2Nlc3MnLCAkc3VjY2Vzcy1jb2xvciksXG4gICgncnVubmluZycsICRydW5uaW5nLWNvbG9yKSxcbiAgKCdwZW5kaW5nJywgJHdhcm5pbmctY29sb3IpLFxuICAoJ2Vycm9yJywgJGVycm9yLWNvbG9yKVxuKTtcbiIKCV0sCgkibWFwcGluZ3MiOiAiQUFFQSxzQkFBc0IsQ0FBQztFQUNyQixNQUFNLEVBQUUsY0FBZTtFQUN2QixVQUFVLEVBQUUsY0FBZSxHQXFENUI7RUF2REQsc0JBQXNCLENBR3BCLEVBQUU7RUFISixzQkFBc0IsQ0FJcEIsRUFBRSxDQUFDO0lBQ0QsZ0JBQWdCLEVBQUUsSUFBSztJQUN2QixVQUFVLEVBQUUsTUFBTyxHQUNwQjtFQVBILHNCQUFzQixDQVFwQixLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ1AsTUFBTSxFQUFFLE9BQVE7SUFDaEIsT0FBTyxFQUFFLGlCQUFrQjtJQUMzQixjQUFjLEVBQUUsaUJBQWtCLEdBQ25DO0VBWkgsc0JBQXNCLEFBYW5CLE1BQU0sQ0FBQztJQUNOLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQUksR0FDOUI7RUFmSCxzQkFBc0IsQ0FnQnBCLEVBQUUsQ0FBQztJQUNELE1BQU0sRUFBRSxJQUFLO0lBQ2IsY0FBYyxFQUFFLGlCQUFrQixHQUNuQztFQW5CSCxzQkFBc0IsQ0FvQnBCLEVBQUUsQUFBQSxjQUFjLENBQUM7SUFDZixNQUFNLEVBQUUsSUFBSztJQUNiLFFBQVEsRUFBRSxNQUFPLEdBQ2xCO0VBdkJILHNCQUFzQixDQXlDcEIsRUFBRSxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsSUFBSztJQUN4QixpQkFBaUIsRUFBRSxLQUFNO0lBQ3pCLGlCQUFpQixFQUFFLEdBQUksR0FVeEI7SUF0REgsc0JBQXNCLENBeUNwQixFQUFFLEFBaEJDLGVBQWUsQUFDYixlQUFlLENBQUMsRUFBRSxBQUFBLFFBQVEsQ0FBM0I7TUFDRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUcsQ0M1QnhCLE9BQU8sR0Q2QmhCO0lBNUJQLHNCQUFzQixDQXlDcEIsRUFBRSxBQVhDLGdCQUFnQixBQUNkLGVBQWUsQ0FBaEI7TUFDRSxpQkFBaUIsRUNqQ1QsT0FBTyxHRGtDaEI7SUFqQ1Asc0JBQXNCLENBeUNwQixFQUFFLEFBTkMsZUFBZSxDQUNkLEVBQUUsQUFBQSxZQUFZLENBQUM7TUFDYixLQUFLLEVDdENHLE9BQU8sR0R1Q2hCO0lBdENQLHNCQUFzQixDQXlDcEIsRUFBRSxBQWhCQyxlQUFlLEFBQ2IsZUFBZSxDQUFDLEVBQUUsQUFBQSxRQUFRLENBQTNCO01BQ0UsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFHLENDMUJ4QixPQUFPLEdEMkJoQjtJQTVCUCxzQkFBc0IsQ0F5Q3BCLEVBQUUsQUFYQyxnQkFBZ0IsQUFDZCxlQUFlLENBQWhCO01BQ0UsaUJBQWlCLEVDL0JULE9BQU8sR0RnQ2hCO0lBakNQLHNCQUFzQixDQXlDcEIsRUFBRSxBQU5DLGVBQWUsQ0FDZCxFQUFFLEFBQUEsWUFBWSxDQUFDO01BQ2IsS0FBSyxFQ3BDRyxPQUFPLEdEcUNoQjtJQXRDUCxzQkFBc0IsQ0F5Q3BCLEVBQUUsQUFoQkMsZUFBZSxBQUNiLGVBQWUsQ0FBQyxFQUFFLEFBQUEsUUFBUSxDQUEzQjtNQUNFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUUsSUFBRyxDQzdCeEIsT0FBTyxHRDhCaEI7SUE1QlAsc0JBQXNCLENBeUNwQixFQUFFLEFBWEMsZ0JBQWdCLEFBQ2QsZUFBZSxDQUFoQjtNQUNFLGlCQUFpQixFQ2xDVCxPQUFPLEdEbUNoQjtJQWpDUCxzQkFBc0IsQ0F5Q3BCLEVBQUUsQUFOQyxlQUFlLENBQ2QsRUFBRSxBQUFBLFlBQVksQ0FBQztNQUNiLEtBQUssRUN2Q0csT0FBTyxHRHdDaEI7SUF0Q1Asc0JBQXNCLENBeUNwQixFQUFFLEFBaEJDLGVBQWUsQUFDYixhQUFhLENBQUMsRUFBRSxBQUFBLFFBQVEsQ0FBekI7TUFDRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUcsQ0MzQjFCLE9BQU8sR0Q0QmQ7SUE1QlAsc0JBQXNCLENBeUNwQixFQUFFLEFBWEMsZ0JBQWdCLEFBQ2QsYUFBYSxDQUFkO01BQ0UsaUJBQWlCLEVDaENYLE9BQU8sR0RpQ2Q7SUFqQ1Asc0JBQXNCLENBeUNwQixFQUFFLEFBTkMsYUFBYSxDQUNaLEVBQUUsQUFBQSxZQUFZLENBQUM7TUFDYixLQUFLLEVDckNDLE9BQU8sR0RzQ2Q7SUF0Q1Asc0JBQXNCLENBeUNwQixFQUFFLEFBT0MsZUFBZSxDQUNkLEVBQUUsQUFBQSxZQUFZLENBQUM7TUFDYixnQkFBZ0IsRUNoRFgsT0FBTztNRGlEWixXQUFXLEVBQUUsY0FBZSxHQUM3QiIsCgkibmFtZXMiOiBbXQp9 */');;
},{"sassify":2}],8:[function(require,module,exports){
module.exports = "<span class=\"directive-chronometer-time\">\n    <i class=\"fa fa-spinner\"></i> {{chronometerTime}} s\n</span>\n";

},{}],9:[function(require,module,exports){
require('./chronometer-time.scss');

/**
 * displays the miliseconds passed
 */
module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      miliseconds: '=',
    },
    template: require('./chronometer-time.html'),
    controller: function($scope) {
      $scope.chronometerTime = ($scope.miliseconds / 1000).toFixed(2);
    }
  };
};

},{"./chronometer-time.html":8,"./chronometer-time.scss":10}],10:[function(require,module,exports){
module.exports = require('sassify')('.directive-chronometer-time {   color: #aaa;   font-size: 14px; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvY2hyb25vbWV0ZXItdGltZS9jaHJvbm9tZXRlci10aW1lLnNjc3MiLAoJInNvdXJjZXMiOiBbCgkJInNyYy9kaXJlY3RpdmVzL2Nocm9ub21ldGVyLXRpbWUvY2hyb25vbWV0ZXItdGltZS5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkiLmRpcmVjdGl2ZS1jaHJvbm9tZXRlci10aW1lIHtcbiAgY29sb3I6ICNhYWE7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cbiIKCV0sCgkibWFwcGluZ3MiOiAiQUFBQSwyQkFBMkIsQ0FBQztFQUMxQixLQUFLLEVBQUUsSUFBSztFQUNaLFNBQVMsRUFBRSxJQUFLLEdBQ2pCIiwKCSJuYW1lcyI6IFtdCn0= */');;
},{"sassify":2}],11:[function(require,module,exports){
module.exports = "<span class=\"directive-clock-time\">\n    <i class=\"fa fa-clock-o\"></i> {{clockTime}}\n</span>";

},{}],12:[function(require,module,exports){
require('./clock-time.scss');

/**
 * displays the time (e.g. 1:42 pm)
 */
module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      timestamp: '=',
    },
    template: require('./clock-time.html'),
    controller: function($scope) {
      $scope.clockTime = moment.unix($scope.timestamp).format('h:mm a');
    }
  };
};
},{"./clock-time.html":11,"./clock-time.scss":13}],13:[function(require,module,exports){
module.exports = require('sassify')('.directive-clock-time {   color: #aaa;   font-size: 14px; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvY2xvY2stdGltZS9jbG9jay10aW1lLnNjc3MiLAoJInNvdXJjZXMiOiBbCgkJInNyYy9kaXJlY3RpdmVzL2Nsb2NrLXRpbWUvY2xvY2stdGltZS5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkiLmRpcmVjdGl2ZS1jbG9jay10aW1lIHtcbiAgY29sb3I6ICNhYWE7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cbiIKCV0sCgkibWFwcGluZ3MiOiAiQUFBQSxxQkFBcUIsQ0FBQztFQUNwQixLQUFLLEVBQUUsSUFBSztFQUNaLFNBQVMsRUFBRSxJQUFLLEdBQ2pCIiwKCSJuYW1lcyI6IFtdCn0= */');;
},{"sassify":2}],14:[function(require,module,exports){
module.exports = "<div class=\"directive-expanded-build row\">\n    <div class=\"build-state col-lg-3 build-status-{{buildIconStatus}}\">\n        <div class=\"row\">\n            <div class=\"col-lg-4 col-lg-offset-2\">\n                <p>Build <span class=\"title-icon\"><i class=\"fa fa-{{buildIcon}}\"></i></span></p>\n                <p ng-if=\"buildClockTime\">\n                    <clock-time timestamp=\"buildClockTime\"></clock-time>\n                </p>\n            </div>\n            <div ng-if=\"build.getIn(['expandedData', 'build', 'debug'])\" class=\"col-lg-2\">\n                <p><i class=\"fa fa-folder-o\"></i></p>\n                <p><a href=\"{{build.getIn(['expandedData', 'build', 'debug'])}}\">debug</a></p>\n            </div>\n            <div ng-if=\"build.getIn(['expandedData', 'build', 'release'])\" class=\"col-lg-2\">\n                <p><i class=\"fa fa-folder-o\"></i></p>\n                <p><a href=\"{{build.getIn(['expandedData', 'build', 'release'])}}\">release</a></p>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-lg-4 test-status-{{test.status}}\" ng-repeat=\"test in tests.toArray() track by $index\">\n        <div class=\"arrow-separator\"><i class=\"fa fa-angle-right\"></i></div>\n        <div class=\"row\">\n            <div class=\"col-lg-5\">\n                <p>{{test.text}} <span class=\"title-icon\"><i class=\"fa fa-{{test.icon}}\"></i></span></p>\n                <p ng-if=\"test.percentage || test.percentage === 0\">{{test.percentage}}%</p>\n                <div ng-if=\"test.status === 'waiting' || test.status === 'forbidden'\">\n                    <p class=\"status-message\">Status: <span class=\"status-keyword {{test.status}}-keyword\"><strong>{{test.status === 'waiting' ? 'Waiting' : \"Can't run\"}}</strong></span></p>\n                </div>\n                <div ng-if=\"test.status === 'pending'\">\n                    <p><strong>Pending</strong></p>\n                </div>\n            </div>\n            <div ng-if=\"test.values\" class=\"col-lg-4\">\n                <pie-chart values=\"test.values\"></pie-chart>\n            </div>\n            <div ng-if=\"test.values\" class=\"col-lg-3\">\n                <chronometer-time miliseconds=\"build.getIn(['expandedData', test.type, 'miliseconds'])\"></chronometer-time>\n            </div>\n        </div>\n    </div>\n</div>\n";

},{}],15:[function(require,module,exports){
require('./expanded-build.scss');

module.exports = /*@ngInject*/ ["buildValues", function(buildValues) {
  return {
    restrict: 'E',
    scope: {
      build: '=',
    },
    template: require('./expanded-build.html'),
    controller: function($scope) {
      var testStates = ['unit', 'functional'];
      var status = buildValues.get('status');
      var buildStatus = $scope.build.get('status');
      var buildState = $scope.build.get('state');
      var buildSectionStatus = (buildState === 'build') ? buildStatus : 'success';

      $scope.parsedBuild = $scope.build.mergeIn(['expandedData'], {});

      $scope.buildClockTime = $scope.build.getIn(['expandedData', 'build', 'completed']);
      $scope.buildIcon = status.getIn([buildSectionStatus, 'iconsPalette', 2]);
      $scope.buildIconStatus = buildSectionStatus;

      $scope.tests = Immutable.List(testStates).map(function(testState) {
        var test = $scope.build.getIn(['expandedData', testState]);
        var testStatus, testIcon, testPercentage, testValues;

        if (test) {
          testStatus = (buildState === testState) ? $scope.build.get('status') : 'success';
          testIcon = status.getIn([testStatus, 'iconsPalette', 2]);
          testPercentage = test.get('success') ? Math.floor(100 * test.get('success') / (test.get('warning') + test.get('success'))) : 0;
          testValues = test.get('success') ? Immutable.List([test.get('warning'), test.get('success')]) : null;
        } else {
          if (buildStatus !== 'error') {
            testStatus = 'waiting';
            testIcon = null;
            testValues = null;
          } else {
            testStatus = 'forbidden';
            testIcon = 'minus-circle';
            testValues = null;
          }
        }
        return {
          type: testState,
          status: testStatus,
          icon: testIcon,
          text: buildValues.get('states').find(function(possibleStatus) {
            return possibleStatus.get('type') === testState;
          }).get('text'),
          percentage: testPercentage,
          values: testValues,
        };
      });
    }
  };
}];

},{"./expanded-build.html":14,"./expanded-build.scss":16}],16:[function(require,module,exports){
module.exports = require('sassify')('.directive-expanded-build {   min-height: 90px; }   .directive-expanded-build .build-status-success .title-icon i,   .directive-expanded-build .test-status-success .title-icon i {     color: #1ab394; }   .directive-expanded-build .build-status-running .title-icon i,   .directive-expanded-build .test-status-running .title-icon i {     color: #2087c6; }   .directive-expanded-build .build-status-pending .title-icon i,   .directive-expanded-build .test-status-pending .title-icon i {     color: #f7ab57; }   .directive-expanded-build .build-status-error .title-icon i,   .directive-expanded-build .test-status-error .title-icon i {     color: #eb3e50; }   .directive-expanded-build .build-status-forbidden .title-icon i,   .directive-expanded-build .test-status-forbidden .title-icon i {     color: #eb3e50; }   .directive-expanded-build .build-icon {     margin-left: 4px; }   .directive-expanded-build .build-state {     position: relative; }   .directive-expanded-build .arrow-separator {     color: #f7f7f7;     font-size: 90px;     left: -20px;     position: absolute;     top: 0; }   .directive-expanded-build .status-message .status-keyword.waiting-keyword {     color: #aa74ad; }   .directive-expanded-build .status-message .status-keyword.forbidden-keyword {     color: #eb3e50; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvZXhwYW5kZWQtYnVpbGQvZXhwYW5kZWQtYnVpbGQuc2NzcyIsCgkic291cmNlcyI6IFsKCQkic3JjL2RpcmVjdGl2ZXMvZXhwYW5kZWQtYnVpbGQvZXhwYW5kZWQtYnVpbGQuc2NzcyIsCgkJInNyYy9jb25zdGFudHMvY29sb3JzLnNjc3MiCgldLAoJInNvdXJjZXNDb250ZW50IjogWwoJCSJAaW1wb3J0ICdjb25zdGFudHMvY29sb3JzJztcblxuLmRpcmVjdGl2ZS1leHBhbmRlZC1idWlsZCB7XG4gIG1pbi1oZWlnaHQ6IDkwcHg7XG4gIEBtaXhpbiBzdGF0dXNDb2xvcnMoJHN0YXR1cywgJGNvbG9yKSB7XG4gICAgLmJ1aWxkLXN0YXR1cy0jeyRzdGF0dXN9LFxuICAgIC50ZXN0LXN0YXR1cy0jeyRzdGF0dXN9IHtcbiAgICAgIC50aXRsZS1pY29uIGkge1xuICAgICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBAZWFjaCAkc3RhdGUtY29sb3JzLXBhaXIgaW4gJHN0YXRlLWNvbG9ycy1wYWlycyB7XG4gICAgQGluY2x1ZGUgc3RhdHVzQ29sb3JzKG50aCgkc3RhdGUtY29sb3JzLXBhaXIsIDEpLCBudGgoJHN0YXRlLWNvbG9ycy1wYWlyLCAyKSk7XG4gIH1cbiAgQGluY2x1ZGUgc3RhdHVzQ29sb3JzKCdmb3JiaWRkZW4nLCAkZXJyb3ItY29sb3IpO1xuICAuYnVpbGQtaWNvbiB7XG4gICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgfVxuICAuYnVpbGQtc3RhdGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAuYXJyb3ctc2VwYXJhdG9yIHtcbiAgICBjb2xvcjogJGxpZ2h0LWdyZXk7XG4gICAgZm9udC1zaXplOiA5MHB4O1xuICAgIGxlZnQ6IC0yMHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gIH1cbiAgLnN0YXR1cy1tZXNzYWdlIC5zdGF0dXMta2V5d29yZCB7XG4gICAgJi53YWl0aW5nLWtleXdvcmQge1xuICAgICAgY29sb3I6ICNhYTc0YWQ7XG4gICAgfVxuICAgICYuZm9yYmlkZGVuLWtleXdvcmQge1xuICAgICAgY29sb3I6ICRlcnJvci1jb2xvcjtcbiAgICB9XG4gIH1cbn1cbiIsCgkJIiR3YXJuaW5nLWNvbG9yOiAjZjdhYjU3O1xuJHN1Y2Nlc3MtY29sb3I6ICMxYWIzOTQ7XG4kZXJyb3ItY29sb3I6ICNlYjNlNTA7XG4kcnVubmluZy1jb2xvcjogIzIwODdjNjtcbiRsaWdodC1ncmV5OiAjZjdmN2Y3O1xuJHN0YXRlLWNvbG9ycy1wYWlyczogKFxuICAoJ3N1Y2Nlc3MnLCAkc3VjY2Vzcy1jb2xvciksXG4gICgncnVubmluZycsICRydW5uaW5nLWNvbG9yKSxcbiAgKCdwZW5kaW5nJywgJHdhcm5pbmctY29sb3IpLFxuICAoJ2Vycm9yJywgJGVycm9yLWNvbG9yKVxuKTtcbiIKCV0sCgkibWFwcGluZ3MiOiAiQUFFQSx5QkFBeUIsQ0FBQztFQUN4QixVQUFVLEVBQUUsSUFBSyxHQWlDbEI7RUFsQ0QseUJBQXlCLENBR3JCLHFCQUFxQixDQUNuQixXQUFXLENBQUMsQ0FBQztFQUpuQix5QkFBeUIsQ0FJckIsb0JBQW9CLENBQWxCLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDWixLQUFLLEVDTkcsT0FBTyxHRE9oQjtFQU5QLHlCQUF5QixDQUdyQixxQkFBcUIsQ0FDbkIsV0FBVyxDQUFDLENBQUM7RUFKbkIseUJBQXlCLENBSXJCLG9CQUFvQixDQUFsQixXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ1osS0FBSyxFQ0pHLE9BQU8sR0RLaEI7RUFOUCx5QkFBeUIsQ0FHckIscUJBQXFCLENBQ25CLFdBQVcsQ0FBQyxDQUFDO0VBSm5CLHlCQUF5QixDQUlyQixvQkFBb0IsQ0FBbEIsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNaLEtBQUssRUNQRyxPQUFPLEdEUWhCO0VBTlAseUJBQXlCLENBR3JCLG1CQUFtQixDQUNqQixXQUFXLENBQUMsQ0FBQztFQUpuQix5QkFBeUIsQ0FJckIsa0JBQWtCLENBQWhCLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDWixLQUFLLEVDTEMsT0FBTyxHRE1kO0VBTlAseUJBQXlCLENBR3JCLHVCQUF1QixDQUNyQixXQUFXLENBQUMsQ0FBQztFQUpuQix5QkFBeUIsQ0FJckIsc0JBQXNCLENBQXBCLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDWixLQUFLLEVDTEMsT0FBTyxHRE1kO0VBTlAseUJBQXlCLENBYXZCLFdBQVcsQ0FBQztJQUNWLFdBQVcsRUFBRSxHQUFJLEdBQ2xCO0VBZkgseUJBQXlCLENBZ0J2QixZQUFZLENBQUM7SUFDWCxRQUFRLEVBQUUsUUFBUyxHQUNwQjtFQWxCSCx5QkFBeUIsQ0FtQnZCLGdCQUFnQixDQUFDO0lBQ2YsS0FBSyxFQ2xCSSxPQUFPO0lEbUJoQixTQUFTLEVBQUUsSUFBSztJQUNoQixJQUFJLEVBQUUsS0FBTTtJQUNaLFFBQVEsRUFBRSxRQUFTO0lBQ25CLEdBQUcsRUFBRSxDQUFFLEdBQ1I7RUF6QkgseUJBQXlCLENBMEJ2QixlQUFlLENBQUMsZUFBZSxBQUM1QixnQkFBZ0IsQ0FBQztJQUNoQixLQUFLLEVBQUUsT0FBUSxHQUNoQjtFQTdCTCx5QkFBeUIsQ0EwQnZCLGVBQWUsQ0FBQyxlQUFlLEFBSTVCLGtCQUFrQixDQUFDO0lBQ2xCLEtBQUssRUMvQkcsT0FBTyxHRGdDaEIiLAoJIm5hbWVzIjogW10KfQ== */');;
},{"sassify":2}],17:[function(require,module,exports){
module.exports = function() {
  angular.module('app')
    .directive('buildsList', require('./builds-list/builds-list'))
    .directive('chronometerTime', require('./chronometer-time/chronometer-time'))
    .directive('clockTime', require('./clock-time/clock-time'))
    .directive('expandedBuild', require('./expanded-build/expanded-build'))
    .directive('pieChart', require('./pie-chart/pie-chart'))
    .directive('stateDisplay', require('./progress-cell/progress-cell'));
};
},{"./builds-list/builds-list":6,"./chronometer-time/chronometer-time":9,"./clock-time/clock-time":12,"./expanded-build/expanded-build":15,"./pie-chart/pie-chart":19,"./progress-cell/progress-cell":22}],18:[function(require,module,exports){
module.exports = "<div class=\"directive-pie-chart\"></div>";

},{}],19:[function(require,module,exports){
require('./pie-chart.scss');

/**
 * renders the SVG pie chart
 * @param  {Immutable.List} values the pie chart raw values (e.g. 2, 19)
 * @param  {Object} elem angular's elem object
 */
function renderChart(values, elem) {
  var height = 100;
  var width = 100;
  var radius = 50;

  var segments = values.map(function(value, index) {
    return {
      value: value,
      index: index
    };
  }).toJS();

  var domElem = angular.element(elem);
  var d3Elem = d3.select(domElem[0].childNodes[0]);
  d3Elem.text('');

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

  var svg = d3Elem.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
    .data(pie(segments))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .attr("class", function(d) {
      return 'arc-' + d.data.index;
    });

  g.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.age;
    });
}

module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      values: '=',
    },
    template: require('./pie-chart.html'),
    link: function(scope, elem) {
      renderChart(scope.values, elem);
    }
  };
};

},{"./pie-chart.html":18,"./pie-chart.scss":20}],20:[function(require,module,exports){
module.exports = require('sassify')('.directive-pie-chart .arc-0 {   fill: #f7ab57; }  .directive-pie-chart .arc-1 {   fill: #1ab394; }  .directive-pie-chart .arc {   stroke: #ddd;   stroke-width: 2px; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvcGllLWNoYXJ0L3BpZS1jaGFydC5zY3NzIiwKCSJzb3VyY2VzIjogWwoJCSJzcmMvZGlyZWN0aXZlcy9waWUtY2hhcnQvcGllLWNoYXJ0LnNjc3MiLAoJCSJzcmMvY29uc3RhbnRzL2NvbG9ycy5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkiQGltcG9ydCAnY29uc3RhbnRzL2NvbG9ycyc7XG5cbi5kaXJlY3RpdmUtcGllLWNoYXJ0IHtcbiAgLmFyYy0wIHtcbiAgICBmaWxsOiAkd2FybmluZy1jb2xvcjtcbiAgfVxuICAuYXJjLTEge1xuICAgIGZpbGw6ICRzdWNjZXNzLWNvbG9yO1xuICB9XG4gIC5hcmMge1xuICAgIHN0cm9rZTogI2RkZDtcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcbiAgfVxufVxuIiwKCQkiJHdhcm5pbmctY29sb3I6ICNmN2FiNTc7XG4kc3VjY2Vzcy1jb2xvcjogIzFhYjM5NDtcbiRlcnJvci1jb2xvcjogI2ViM2U1MDtcbiRydW5uaW5nLWNvbG9yOiAjMjA4N2M2O1xuJGxpZ2h0LWdyZXk6ICNmN2Y3Zjc7XG4kc3RhdGUtY29sb3JzLXBhaXJzOiAoXG4gICgnc3VjY2VzcycsICRzdWNjZXNzLWNvbG9yKSxcbiAgKCdydW5uaW5nJywgJHJ1bm5pbmctY29sb3IpLFxuICAoJ3BlbmRpbmcnLCAkd2FybmluZy1jb2xvciksXG4gICgnZXJyb3InLCAkZXJyb3ItY29sb3IpXG4pO1xuIgoJXSwKCSJtYXBwaW5ncyI6ICJBQUVBLG9CQUFvQixDQUNsQixNQUFNLENBQUM7RUFDTCxJQUFJLEVDSlEsT0FBTyxHREtwQjs7QUFISCxvQkFBb0IsQ0FJbEIsTUFBTSxDQUFDO0VBQ0wsSUFBSSxFQ05RLE9BQU8sR0RPcEI7O0FBTkgsb0JBQW9CLENBT2xCLElBQUksQ0FBQztFQUNILE1BQU0sRUFBRSxJQUFLO0VBQ2IsWUFBWSxFQUFFLEdBQUksR0FDbkIiLAoJIm5hbWVzIjogW10KfQ== */');;
},{"sassify":2}],21:[function(require,module,exports){
module.exports = "<div class=\"directive-progress-cell status-{{build.get('status')}}\">\n    <div class=\"centered\">\n        <div ng-if=\"isLineLeftDisplayed\" class=\"line line-left\"></div>\n        <div ng-if=\"isLineInnerLeftDisplayed\" class=\"line-inner line-inner-left\"></div>\n        <div class=\"circle\"></div>\n        <div ng-if=\"isInnerCircleDisplayed\" class=\"circle-inner\"></div>\n        <div ng-if=\"isIconDisplayed\" class=\"icon\">\n            <i class=\"fa fa-{{iconDisplayed}}\"></i>\n        </div>\n        <div ng-if=\"isLineRightDisplayed\" class=\"line line-right\"></div>\n        <div ng-if=\"isLineInnerRightDisplayed\" class=\"line-inner line-inner-right\"></div>\n    </div>\n</div>\n";

},{}],22:[function(require,module,exports){
require('./progress-cell.scss');

module.exports = /*@ngInject*/ ["buildValues", function(buildValues) {
  return {
    restrict: 'E',
    scope: {
      build: '=',
      cellState: '='
    },
    template: require('./progress-cell.html'),
    controller: function($scope) {
      var states = buildValues.get('states');
      var buildStateItem = states.find(function(state) {
        return state.get('type') === $scope.build.get('state');
      });
      var isNotFirstCell = states.indexOf($scope.cellState) !== 0;
      var cellIsBeforeBuildState = states.indexOf($scope.cellState) < states.indexOf(buildStateItem);
      var buildStateIsAfterCell = states.indexOf(buildStateItem) > states.indexOf($scope.cellState);
      var cellIsEqualBuildState = states.indexOf(buildStateItem) === states.indexOf($scope.cellState);
      var isNotLastCell = states.indexOf($scope.cellState) < (states.count() - 1);

      $scope.isLineLeftDisplayed = isNotFirstCell;
      $scope.isLineInnerLeftDisplayed = $scope.isLineLeftDisplayed && (cellIsBeforeBuildState || cellIsEqualBuildState);
      $scope.isLineRightDisplayed = isNotLastCell;
      $scope.isLineInnerRightDisplayed = $scope.isLineRightDisplayed && buildStateIsAfterCell;

      $scope.isInnerCircleDisplayed = states.indexOf(buildStateItem) >= states.indexOf($scope.cellState);
      $scope.isIconDisplayed = states.indexOf(buildStateItem) >= states.indexOf($scope.cellState);
      if ($scope.isIconDisplayed) {
        var iconStatus = (states.indexOf(buildStateItem) > states.indexOf($scope.cellState)) ?
          'success' : $scope.build.get('status');

        $scope.iconDisplayed = buildValues.getIn(['status', iconStatus, 'iconsPalette', 1]);
      }
    }
  };
}];

},{"./progress-cell.html":21,"./progress-cell.scss":23}],23:[function(require,module,exports){
module.exports = require('sassify')('.directive-progress-cell.status-success .circle-inner {   background-color: #1ab394; }  .directive-progress-cell.status-success .line-inner {   background-color: #1ab394; }  .directive-progress-cell.status-running .circle-inner {   background-color: #2087c6; }  .directive-progress-cell.status-running .line-inner {   background-color: #2087c6; }  .directive-progress-cell.status-pending .circle-inner {   background-color: #f7ab57; }  .directive-progress-cell.status-pending .line-inner {   background-color: #f7ab57; }  .directive-progress-cell.status-error .circle-inner {   background-color: #eb3e50; }  .directive-progress-cell.status-error .line-inner {   background-color: #eb3e50; }  .directive-progress-cell .centered {   display: inline-block;   height: 1px;   position: relative;   width: 1px; }  .directive-progress-cell .circle {   background-color: #ddd;   border-radius: 50px;   display: inline-block;   height: 40px;   left: -20px;   position: absolute;   top: -20px;   width: 40px;   z-index: 5; }  .directive-progress-cell .circle-inner {   border-radius: 50px;   display: inline-block;   height: 30px;   left: -15px;   position: absolute;   top: -15px;   width: 30px;   z-index: 10; }  .directive-progress-cell .line {   background-color: #ddd;   display: inline-block;   height: 10px;   position: absolute;   top: -5px;   width: 1000px;   z-index: 0; }  .directive-progress-cell .line-inner {   display: inline-block;   height: 4px;   position: absolute;   top: -2px;   width: 1000px;   z-index: 10; }  .directive-progress-cell .line-left, .directive-progress-cell .line-inner-left {   right: 0; }  .directive-progress-cell .line-right, .directive-progress-cell .line-inner-right {   left: 0; }  .directive-progress-cell .icon i {   color: white;   left: -7px;   position: absolute;   text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);   top: -8px;   z-index: 20; }   .directive-progress-cell .icon i.fa-exclamation {     left: -3; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL2RpcmVjdGl2ZXMvcHJvZ3Jlc3MtY2VsbC9wcm9ncmVzcy1jZWxsLnNjc3MiLAoJInNvdXJjZXMiOiBbCgkJInNyYy9kaXJlY3RpdmVzL3Byb2dyZXNzLWNlbGwvcHJvZ3Jlc3MtY2VsbC5zY3NzIiwKCQkic3JjL2NvbnN0YW50cy9jb2xvcnMuc2NzcyIKCV0sCgkic291cmNlc0NvbnRlbnQiOiBbCgkJIkBpbXBvcnQgJ2NvbnN0YW50cy9jb2xvcnMnO1xuXG5AbWl4aW4gc3RhdHVzLWNvbG9ycygkc3RhdHVzLCAkY29sb3IpIHtcbiAgJi5zdGF0dXMtI3skc3RhdHVzfSB7XG4gICAgLmNpcmNsZS1pbm5lciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG4gICAgfVxuICAgIC5saW5lLWlubmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbiAgICB9XG4gIH1cbn1cblxuLmRpcmVjdGl2ZS1wcm9ncmVzcy1jZWxsIHtcbiAgJGNpcmNsZS1yYWRpdXM6IDIwcHg7XG4gICRjaXJjbGUtaW5uZXItcmFkaXVzOiAxNXB4O1xuICAkbGluZS13aWR0aDogMTAwMHB4O1xuICAkbGluZS1oZWlnaHQ6IDEwcHg7XG4gICRsaW5lLWlubmVyLWhlaWdodDogNHB4O1xuICBAZWFjaCAkc3RhdGUtY29sb3JzLXBhaXIgaW4gJHN0YXRlLWNvbG9ycy1wYWlycyB7XG4gICAgQGluY2x1ZGUgc3RhdHVzLWNvbG9ycyhudGgoJHN0YXRlLWNvbG9ycy1wYWlyLCAxKSwgbnRoKCRzdGF0ZS1jb2xvcnMtcGFpciwgMikpO1xuICB9XG4gIC5jZW50ZXJlZCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogMXB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMXB4O1xuICB9XG4gIC5jaXJjbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAkY2lyY2xlLXJhZGl1cyAqIDI7XG4gICAgbGVmdDogLSRjaXJjbGUtcmFkaXVzO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0kY2lyY2xlLXJhZGl1cztcbiAgICB3aWR0aDogJGNpcmNsZS1yYWRpdXMgKiAyO1xuICAgIHotaW5kZXg6IDU7XG4gIH1cbiAgLmNpcmNsZS1pbm5lciB7XG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAkY2lyY2xlLWlubmVyLXJhZGl1cyAqIDI7XG4gICAgbGVmdDogLSRjaXJjbGUtaW5uZXItcmFkaXVzO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0kY2lyY2xlLWlubmVyLXJhZGl1cztcbiAgICB3aWR0aDogJGNpcmNsZS1pbm5lci1yYWRpdXMgKiAyO1xuICAgIHotaW5kZXg6IDEwO1xuICB9XG4gIC5saW5lIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6ICRsaW5lLWhlaWdodDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAtJGxpbmUtaGVpZ2h0IC8gMjtcbiAgICB3aWR0aDogJGxpbmUtd2lkdGg7XG4gICAgei1pbmRleDogMDtcbiAgfVxuICAubGluZS1pbm5lciB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogJGxpbmUtaW5uZXItaGVpZ2h0O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0kbGluZS1pbm5lci1oZWlnaHQgLyAyO1xuICAgIHdpZHRoOiAkbGluZS13aWR0aDtcbiAgICB6LWluZGV4OiAxMDtcbiAgfVxuICAubGluZS1sZWZ0LFxuICAubGluZS1pbm5lci1sZWZ0IHtcbiAgICByaWdodDogMDtcbiAgfVxuICAubGluZS1yaWdodCxcbiAgLmxpbmUtaW5uZXItcmlnaHQge1xuICAgIGxlZnQ6IDA7XG4gIH1cbiAgLmljb24gaSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGxlZnQ6IC03cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRleHQtc2hhZG93OiAwIDAgNXB4IHJnYmEoMCwwLDAsLjQpO1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAyMDtcbiAgICAmLmZhLWV4Y2xhbWF0aW9uIHtcbiAgICAgIGxlZnQ6IC0zO1xuICAgIH1cbiAgfVxufVxuIiwKCQkiJHdhcm5pbmctY29sb3I6ICNmN2FiNTc7XG4kc3VjY2Vzcy1jb2xvcjogIzFhYjM5NDtcbiRlcnJvci1jb2xvcjogI2ViM2U1MDtcbiRydW5uaW5nLWNvbG9yOiAjMjA4N2M2O1xuJGxpZ2h0LWdyZXk6ICNmN2Y3Zjc7XG4kc3RhdGUtY29sb3JzLXBhaXJzOiAoXG4gICgnc3VjY2VzcycsICRzdWNjZXNzLWNvbG9yKSxcbiAgKCdydW5uaW5nJywgJHJ1bm5pbmctY29sb3IpLFxuICAoJ3BlbmRpbmcnLCAkd2FybmluZy1jb2xvciksXG4gICgnZXJyb3InLCAkZXJyb3ItY29sb3IpXG4pO1xuIgoJXSwKCSJtYXBwaW5ncyI6ICJBQWFBLHdCQUF3QixBQVZyQixlQUFlLENBQ2QsYUFBYSxDQUFDO0VBQ1osZ0JBQWdCLEVDSk4sT0FBTyxHREtsQjs7QUFPTCx3QkFBd0IsQUFWckIsZUFBZSxDQUlkLFdBQVcsQ0FBQztFQUNWLGdCQUFnQixFQ1BOLE9BQU8sR0RRbEI7O0FBSUwsd0JBQXdCLEFBVnJCLGVBQWUsQ0FDZCxhQUFhLENBQUM7RUFDWixnQkFBZ0IsRUNGTixPQUFPLEdER2xCOztBQU9MLHdCQUF3QixBQVZyQixlQUFlLENBSWQsV0FBVyxDQUFDO0VBQ1YsZ0JBQWdCLEVDTE4sT0FBTyxHRE1sQjs7QUFJTCx3QkFBd0IsQUFWckIsZUFBZSxDQUNkLGFBQWEsQ0FBQztFQUNaLGdCQUFnQixFQ0xOLE9BQU8s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 */');;
},{"sassify":2}],24:[function(require,module,exports){
require('./main.scss');

angular.module('app', ['ui.router']);

require('./constants')();
require('./directives')();
require('./services')();
require('./router')();
},{"./constants":4,"./directives":17,"./main.scss":25,"./router":26,"./services":28}],25:[function(require,module,exports){
module.exports = require('sassify')('#main {   font-family: \'Roboto\', sans-serif;   min-height: 100%;   padding-top: 20px; }  body {   background-color: #f7f7f7; }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL21haW4uc2NzcyIsCgkic291cmNlcyI6IFsKCQkic3JjL21haW4uc2NzcyIsCgkJInNyYy9jb25zdGFudHMvY29sb3JzLnNjc3MiCgldLAoJInNvdXJjZXNDb250ZW50IjogWwoJCSJAaW1wb3J0ICdjb25zdGFudHMvY29sb3JzJztcblxuI21haW4ge1xuICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRsaWdodC1ncmV5O1xufVxuIiwKCQkiJHdhcm5pbmctY29sb3I6ICNmN2FiNTc7XG4kc3VjY2Vzcy1jb2xvcjogIzFhYjM5NDtcbiRlcnJvci1jb2xvcjogI2ViM2U1MDtcbiRydW5uaW5nLWNvbG9yOiAjMjA4N2M2O1xuJGxpZ2h0LWdyZXk6ICNmN2Y3Zjc7XG4kc3RhdGUtY29sb3JzLXBhaXJzOiAoXG4gICgnc3VjY2VzcycsICRzdWNjZXNzLWNvbG9yKSxcbiAgKCdydW5uaW5nJywgJHJ1bm5pbmctY29sb3IpLFxuICAoJ3BlbmRpbmcnLCAkd2FybmluZy1jb2xvciksXG4gICgnZXJyb3InLCAkZXJyb3ItY29sb3IpXG4pO1xuIgoJXSwKCSJtYXBwaW5ncyI6ICJBQUVBLEtBQUssQ0FBQztFQUNKLFdBQVcsRUFBRSxvQkFBcUI7RUFDbEMsVUFBVSxFQUFFLElBQUs7RUFDakIsV0FBVyxFQUFFLElBQUssR0FDbkI7O0FBQ0QsSUFBSSxDQUFDO0VBQ0gsZ0JBQWdCLEVDSkwsT0FBTyxHREtuQiIsCgkibmFtZXMiOiBbXQp9 */');;
},{"sassify":2}],26:[function(require,module,exports){
module.exports = function() {
  angular.module('app')
    .config(/*@ngInject*/ ["$stateProvider", function($stateProvider) {
      $stateProvider
        .state('index', require('states/landing/landing'));
    }]);
};

},{"states/landing/landing":31}],27:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$http", function($http) {
  return {
    get: get,
    list: list,
  };

  function get(changelist) {
    return $http.get('data/build-' + changelist + '.json').then(function(res) {
      return Immutable.fromJS(res.data);
    });
  }

  function list() {
    return $http.get('data/builds-list.json').then(function(res) {
      return Immutable.fromJS(res.data);
    });
  }
}];

},{}],28:[function(require,module,exports){
module.exports = function() {
  angular.module('app')
    .factory('Build', require('./build'));
};
},{"./build":27}],29:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$scope", "Build", function($scope, Build) {
  (function activate() {
    Build.list().then(function(builds) {
      $scope.builds = builds;
    });
  })();
}];
},{}],30:[function(require,module,exports){
module.exports = "<builds-list builds=\"builds\"></builds-list>";

},{}],31:[function(require,module,exports){
module.exports = {
  url: "",
  template: require("./landing.html"),
  controller: require('./landing.controller'),
};
},{"./landing.controller":29,"./landing.html":30}]},{},[24])


//# sourceMappingURL=app.js.map
