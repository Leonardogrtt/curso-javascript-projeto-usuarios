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

            let toggleButton = this.formEl.querySelector("[type=submit]")

            toggleButton.disabled = true;

            let values = this.getValues();

            if(!values) {
                return false;
            }

            this.getPhoto().then(
                (content)=>{

                    values.photo = content;
                    this.addUserToTable(values);

                    //limpar formulário
                    this.formEl.reset();

                    toggleButton.disabled = false;

                },
                (e)=>{

                    console.error(e);

                }
            );

        });

    }

    //carrega foto
    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = ()=>{

                resolve(fileReader.result);

            };

            fileReader.onerror = (e)=>{
                reject(e);
            }

            if(file) {

                fileReader.readAsDataURL(file);

            } else {
                resolve('dist/img/boxed-bg.jpg');
            }

        });

    }

    //retorna objeto 'User' preenchido com os dados do formulário html 
    getValues(){

        let user = {};

        let isValid = true;

        //para cada campo do formulário, adiciona o seu valor a um atributo do objeto 'user'
        [...this.formEl.elements].forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');

                isValid = false;

            }

            //no caso de 'radio', devemos guardar apenas o valor do campo que está 'checked'
            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {

                user[field.name] = field.checked;

            } else {

                user[field.name] = field.value;
            }
        })

        if(!isValid) {
            return false;
        }

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

    //adiciona <tr> de usuário na tabela de usuários html
    addUserToTable(newUserData){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(newUserData);

        tr.innerHTML = `
            <td><img src="${newUserData.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${newUserData.name}</td>
            <td>${newUserData.email}</td>
            <td>${(newUserData.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(newUserData.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach( tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) {
                //admin
                numberAdmin++;
            }

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

}