window.page_loaded = function() {
    window.components.header.menu_hide();
    window.components.triangles.set_animate(true);

    let wrap = document.getElementsByClassName("home-wrapper_content")[0];
    if(wrap){
        var el = wrap.firstChild;
        for( let i = 0 ;; i++ ) {
            if(!el) break;

            console.debug( el );
            el.classList.add("mod_hidden");
            setTimeout( function() {
                this.classList.remove("mod_hidden");
            }.bind(el), 500 + 300 * i );

            el = el.nextSibling;
        }
    }

    else { console.error("No home wrapper"); }
}
