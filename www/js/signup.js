var SignupPageController = {
    init : function() {
        $(function() {
            SignupPageController.prepare();
        });
    },

    prepare : function() {
        $('#signup').on('tappable-tap', function() {
            SignupPageController.signup();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });
    },

    signup : function() {
        var userName = $('#user-name').val();
        var password = $('#password').val();
//        NCMB.User.signUpByAccount(userName, password, {
//            success : function(user) {
                // 成功
//                alert("新規作成に成功しました");
//                currentLoginUser = ncmb.User.getCurrentUser();
//                location.href = 'todo.html';
//            },
//            error : function(user, error) {
//                // エラー
//                alert("新規作成に失敗しました");
//                console.log(JSON.stringify(arguments));
//            }
//        });
//        console.log("a");
        var user = new NCMB.User();
        user.set("userName", userName).set("password", password);
        // 任意フィールドに値を追加
        user.signUp()
            .then(function() {
                alert("新規登録に成功");
                location.href = 'todo.html';
            })
            .catch(function(error) {
                alert("新規登録に失敗！次のエラー発生：" + error);
            });
    }
};
