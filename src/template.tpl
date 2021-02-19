<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{{title}}</title>
    </head>
    <body>
        <table>
            <tr><th>类型</th><th>链接</th></tr>
        {{#each files}}
            
            <tr>
                <td> 
                    <span>{{type}}</span>
                </td>
                <td>
                    <a href="{{../dir}}/{{file}}">{{file}}</a>
                </td>
            </tr>
        {{/each}}
        </table>
    </body>
</html>
