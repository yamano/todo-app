
var TODO = NCMB.Object.extend('TODO');

var currentUser = NCMB.User.current();
if (currentUser) {
    $('#user-name').text(currentUser.get('userName'));
} else {
    alert("ログインしていません");
}

var TODOListController = {

    init : function() {
        $(function() {
            TODOListController.prepare();
        });
    },

    prepare : function() {
        $('#add-todo').on('tappable-tap', function() {
            TODOListController.add();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });

        TODOListController.refresh();
    },

    add : function() {
        var todo = prompt('TODOを追加');

        if (typeof todo === 'string' && todo.length > 0) {
            // TODOを保存
            new TODO().save({
                todo : todo,
                user : currentUser
            }, {
                success : function() {
                    alert("TODO追加できました");
                    TODOListController.refresh();
                }, 
                error : function() {
                    alert("エラーがおきました:");
                }
            });
        }
    },

    refresh : function() {

        showSpinner();

        var query = new NCMB.Query(TODO);
        query.equalTo("user", currentUser);
        query.find({
            success: function(results){
                TODOListController.render(results);
            },
            error: function(error){
                alert("TODOリスト取得に失敗！次のエラー発生：" + error);
            }
        });
    },

    render : function(todoArray) {
        var tableCellTemplate = $('#table-cell-template')[0];
        var fragment = document.createDocumentFragment();

        todoArray.map(function(todo) {
            var tableCell = tableCellTemplate.cloneNode(true);
            console.log(todo);
            $('p', tableCell).text(todo.get('todo'));

            return tableCell;
        }).forEach(function(tableCell) {
            fragment.appendChild(tableCell);
        });

        $('.table-body').empty().append(fragment);

        hideSpinner();
    }
};
