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
