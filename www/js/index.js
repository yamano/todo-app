
var IndexPageController = {
    init : function() {
        $(function() {
            IndexPageController.prepare();
        });
    },

    prepare : function() {
        $('#login-page').on('tappable-tap', function() {
            location.href = 'login.html';
        });
        $('#signup-page').on('tappable-tap', function() {
            location.href = 'signup.html';
        });
    }
};

