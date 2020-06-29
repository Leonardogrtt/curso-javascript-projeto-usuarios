class UserController {

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    //cria escuta para envio do formulário de novo usuário
    onSubmit(){

        this.formEl.addEventListener("submit", event => {

            //função executada ao enviar formulário

            //cancela comportamento do evento, que troca de página
            event.preventDefault();

            let values = this.getValues();

            this.getPhoto((content)=>{

                values.photo = content;

                this.addUserToTable(values);

            });

        });

    }

    getPhoto(callback){

        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item=>{

            if (item.name === 'photo') {
                return item;
            }

        });

        let file = elements[0].files[0];

        fileReader.onload = ()=>{

            callback(fileReader.result);

        };

        fileReader.readAsDataURL(file);

    }

    getValues(){

        let user = {};

        //para cada campo do formulário, adiciona o seu valor a um atributo do objeto 'user'
        [...this.formEl.elements].forEach(function (field, index) {

            //no caso de 'radio', devemos guardar apenas o valor do campo que está 'checked'
            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else {

                user[field.name] = field.value;
            }
        })

        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        )
    }

    //adiciona tr de usuário na tabela de usuários html
    addUserToTable(newUserData){

        this.tableEl.innerHTML = `
        <tr>
            <td><img src="${newUserData.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${newUserData.name}</td>
            <td>${newUserData.email}</td>
            <td>${newUserData.admin}</td>
            <td>${newUserData.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `;

    };

}