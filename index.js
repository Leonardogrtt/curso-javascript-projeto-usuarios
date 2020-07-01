let userController = new UserController("form-user-create", "form-user-update", "table-users");

/*autoTest:

for(let i = 1; i <= 2; i++) {


    let campoNome = document.querySelector("#exampleInputName");
    campoNome.value = i + 'auser';
    
    let campoEmail = document.querySelector("#exampleInputEmail");
    campoEmail.value = i + 'auser@mail.com';
    
    let campoSenha = document.querySelector("#exampleInputPassword");
    campoSenha.value = '1234'
    
    console.log(campoNome.value, campoEmail.value, campoSenha.value);
    
    let values = new User();

    values = userController.getValues(userController.formEl);
    
    values.photo = 'dist/img/boxed-bg.jpg';
    
    if(i == 1) {
        values._admin = true;
    } else {
        values._admin = false;
    }

    values.save();

    userController.addUserToTable(values);
    
    userController.formEl.reset();
    

}

//fim autoTest.*/