var app = angular.module("prognose-tool", []);
app.controller("prognoseController", function($scope) {
    $scope.prognoseToll = {
        PageTitle: 'Prognose-Tool',
        categoryTitle: 'Kategorie',
        periodTitle: 'Zeitraum',
        categories: {
            bergbahn: {
                name: 'Bergbahn'
            },
            skischule: {
                name: 'Skischule'
            },
            schwimmbad: {
                name: 'Schwimmbad'
            }
        },
        periods: {
            oneWeek: {
                name: '1 W.'
            },
            towWeeks: {
                name: '2 W.'
            }
        }
    }
});

function setActiveClass($selector) {
    $(document).ready(function(){
        $($selector).click(function() {
            $(this).siblings($($selector)).removeClass('active');
            $(this).addClass('active');
        });
    });
}

setActiveClass('.category .list-group-item');
setActiveClass('.btn-circle');
