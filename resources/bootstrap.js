function mediaflowBootstrap() {
    var elems = document.querySelectorAll('.mediaflow-app');
    var l = elems.length, i;
    for (i = 0; i < l; i++) {
        elems[i].classList.remove('mediaflow-app');
        angular.bootstrap(elems[i], ['mediaflow']);
    }
};

(function() { mediaflowBootstrap(); })();
